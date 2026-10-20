import { StrKey } from "@stellar/stellar-sdk";

import { decodeBase32 } from "../strkey/base32";

/**
 * Computes a 16-bit CRC (CCITT-FALSE) for binary validation.
 * @internal
 */
function crc16(bytes: Uint8Array): number {
  let crc = 0;
  for (const byte of bytes) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xffff;
    }
  }
  return crc;
}

/**
 * Identifies the Stellar address kind from a string input.
 * Supports G (Ed25519), M (Muxed/SEP-23), and C (Contract) addresses.
 * Returns "invalid" if the input does not match a supported format.
 */
export function detect(address: string): "G" | "M" | "C" | "invalid" {
  if (!address) return "invalid";
  const up = address.toUpperCase();

  if (StrKey.isValidEd25519PublicKey(up)) return "G";
  if (StrKey.isValidMed25519PublicKey(up)) return "M";
  if (StrKey.isValidContract(up)) return "C";

  try {
    const prefix = up[0];
    if (prefix === "M") {
      const decoded = decodeBase32(up);
      // M-addresses (SEP-23) payload consists of 1 version byte (0x60),
      // 32-byte pubkey, 8-byte ID, and 2-byte CRC16 checksum.
      if (decoded.length === 43 && decoded[0] === 0x60) {
        const data = decoded.slice(0, decoded.length - 2);
        const checksum =
          decoded[decoded.length - 2] | (decoded[decoded.length - 1] << 8);
        if (crc16(data) === checksum) {
          return "M";
        }
      }
    }
  } catch {
    // Return "invalid" on any decoding failure.
  }

  return "invalid";
}

import { decodeMuxed } from "../muxed/decode";
import { detect } from "./detect";
import { ParseResult } from "./types";
import { AddressParseError } from "../address/errors";

/**
 * Inputs shorter than this cannot contain a version prefix and a checksum,
 * so they are rejected before any prefix or slice is read.
 */
export const MIN_ADDRESS_LENGTH = 4;

/**
 * Parses a Stellar address string and returns a structured result.
 * Supports G (Public Key), C (Contract), and M (Muxed) addresses.
 * 
 * @param address - The Stellar address string to parse.
 * @returns A {@link ParseResult} containing the parsed address components.
 * @throws {AddressParseError} If the address prefix is unknown or checksum/length validation fails.
 *   Non-strings and inputs shorter than {@link MIN_ADDRESS_LENGTH} fail with `INVALID_LENGTH`.
 */
export function parse(address: string): ParseResult {
  // Reject non-strings and inputs too short to hold a version prefix and a
  // checksum before indexing into them, so callers always get a structured
  // AddressParseError rather than a TypeError.
  if (typeof address !== "string") {
    throw new AddressParseError("INVALID_LENGTH", "", "Address must be a string");
  }
  if (address.length < MIN_ADDRESS_LENGTH) {
    throw new AddressParseError(
      "INVALID_LENGTH",
      address,
      `Address is too short (${address.length} characters)`
    );
  }

  const up = address.toUpperCase();
  const kind = detect(up);

  if (kind === "invalid") {
    const first = up[0];
    if (first === "G" || first === "M" || first === "C") {
      throw new AddressParseError(
        "INVALID_CHECKSUM",
        address,
        "Invalid address checksum"
      );
    }

    throw new AddressParseError("UNKNOWN_PREFIX", address, "Invalid address");
  }

  switch (kind) {
    case "G":
      return { kind: "G", address: up, warnings: [] };
    case "C":
      return { kind: "C", address: up, warnings: [] };
    case "M": {
      try {
        const decoded = decodeMuxed(up);
        return {
          kind: "M",
          address: up,
          baseG: decoded.baseG,
          muxedId: decoded.id,
          warnings: [],
        };
      } catch (error) {
        if (error instanceof AddressParseError) {
          throw error;
        }

        throw new AddressParseError(
          "INVALID_CHECKSUM",
          address,
          "Invalid muxed address"
        );
      }
    }
  }
}


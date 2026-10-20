# Security Policy

## Supported Versions
We actively support and provide security updates for:
- **v1.0.x** (Current stable branch)

## Vulnerability Disclosure Policy

BLUEWHALE is committed to maintaining the security and integrity of deposit routing and address parsing across the Stellar ecosystem. If you discover a vulnerability, please report it following our coordinated disclosure guidelines.

### Response SLA & Severity Matrix
- **Critical (Remote Code Execution, Key Exfiltration)**: Initial response within 24 hours, patch target within 72 hours.
- **High (SSRF, Memory Exhaustion, Parsing Logic Bypass)**: Initial response within 48 hours, patch target within 7 business days.
- **Medium (Denial of Service, Non-Standard Address Failure)**: Initial response within 72 hours, patch target within 14 business days.
- **Low (Cosmetic, Warning Suppressions)**: Addressed in next scheduled minor release.

### Reporting Process
1. **Private Reporting**: Do NOT file a public issue or discuss the finding publicly until a CVE or coordinated release is ready.
2. **Encrypted Submission**: Email report details encrypted with the PGP key below to **security@bluewhale.network** and CC **lewechigodsfavour@gmail.com**.
3. **Include**: Detailed reproduction steps, sample inputs/payloads, and affected language runtimes (Dart, Go, TypeScript).

## Security Team PGP Public Key Block

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: BLUEWHALE Security Team <security@bluewhale.network>

mQENBF/EXAMPLEBLUEWHALESECURITYKEYBLOCKwVbQY/4k+Z2uE7aQZ...
=BLUE
-----END PGP PUBLIC KEY BLOCK-----
```


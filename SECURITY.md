# Security Policy

## Supported Versions
We currently support and provide security updates for:
- **v1.0.1** (Latest stable)

## Reporting a Vulnerability
If you discover a security vulnerability, please help us keep the Stellar ecosystem safe:

1. **Private Reporting**: Do NOT open a public issue.
2. **Email**: Send details to **lewechigodsfavour@gmail.com**.
3. **Response**: We will acknowledge your report within 48 hours and coordinate a fix.

## Bug Bounty Eligibility (Stellar Community Fund & Ecosystem Programs)
Valid, previously unreported security vulnerabilities affecting Bluewhale routing, StrKey checksum validation, muxed account (`M`-address) decoding, or Soroban contract (`C`-address) detection are eligible for recognition and bounty consideration through Stellar Community Fund (SCF) security initiatives and Stellar ecosystem bug bounty programs:

- **Critical / High Severity**: Checksum bypass, routing memo spoofing, or cross-implementation divergence leading to misrouted funds.
- **Medium Severity**: Denial-of-service via malformed inputs, terminal escape injection, or unbounded memory allocation during decoding.
- **Eligibility Requirements**:
  - Responsible private disclosure prior to any public discussion.
  - Reproducible proof-of-concept test vector (`spec/vectors.json` or unit test).
  - Adherence to the 48-hour triage window and coordinated disclosure timeline.

Thank you for helping us maintain a secure library.

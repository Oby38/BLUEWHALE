# Security Policy

## Supported Versions
We currently support and provide security updates for:
- **v1.0.1** (Latest stable)

## Official Security Contact & PGP Key
- **Security Contact Email**: `security@bluewhale.stellar.org` (cc: `lewechigodsfavour@gmail.com`)
- **PGP Fingerprint**: `4B9A 8F21 C3E0 71D4 99A2  08E1 55C7 B210 9F4E 6A11`
- **Response SLA**:
  - **Initial Acknowledgment**: Within **48 hours** of receipt.
  - **Triage & Severity Assessment**: Within **5 business days**.
  - **Remediation & Coordinated Disclosure**: Within **14–30 days** depending on severity.

## Reporting a Vulnerability
If you discover a security vulnerability across `@redishfish/bluewhale-core`, `core-go`, `core-dart`, or `@redishfish/bluewhale`:

1. **Private Reporting**: Do **NOT** open a public GitHub issue or discussion.
2. **Encrypted Email**: Send full reproduction steps, affected package versions, and impact analysis to **security@bluewhale.stellar.org** encrypted with the PGP key above.
3. **Response Guarantee**: We will acknowledge your report within **48 hours** and coordinate a patch and advisory timeline.

## Bug Bounty Eligibility & Stellar Ecosystem Programs

We actively reward security researchers who uncover critical and high-severity flaws that impact Stellar address encoding, routing integrity, and deposit safety.

### Stellar Community Fund (SCF) & Ecosystem Grants
Eligible security disclosures qualify for bounty awards supported by the **Stellar Community Fund (SCF)** and ecosystem partner security reward pools. 

### Eligibility Guidelines
To be eligible for bug bounty consideration:
- The finding must be original, previously unreported, and not already tracked in an active advisory.
- You must comply with our responsible disclosure guidelines (no public disclosure before a coordinated patch is released).
- Testing must not disrupt public Stellar network nodes or third-party infrastructure.
- Automated scanner spam or theoretical vulnerabilities without a working Proof of Concept (PoC) are not eligible.

### Severity and Award Scope

| Severity | Scope Examples | Reward Category |
| :--- | :--- | :--- |
| **Critical** | Checksum bypass, address confusion leading to fund misrouting, or remote arbitrary code execution | Top-tier SCF bounty grant & public recognition |
| **High** | Cryptographic parsing flaw, silent deposit truncation, or uncaught panic in production daemon listener | Ecosystem bounty reward |
| **Medium** | ReDoS in URI parser, non-canonical address spoofing, or denial-of-service in decoder | Community grant reward |
| **Low / Informational** | Hardening improvements, documentation ambiguities, or minor test vector coverage gaps | Swag / Contributor attribution in release notes |

### Submission Procedure
Submit bug bounty claims directly to **security@bluewhale.stellar.org** with `[BUG BOUNTY]` in the subject line, including:
1. Detailed reproduction steps and minimal proof-of-concept.
2. Suggested remediation or patch if available.
3. Your Stellar public address (G-address) for bounty distribution upon validation.

Thank you for helping us keep the Stellar ecosystem safe.

# Security Policy

## Supported Versions

We actively support the following versions of svg-toolbox with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.2.x   | :white_check_mark: |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Features

This library includes several security measures to protect against common vulnerabilities:

### Path Traversal Protection

All file operations validate and normalize file paths to prevent directory traversal attacks. The library:
- Validates file paths before reading or writing
- Rejects paths containing `..` sequences
- Supports base directory restrictions for file operations
- Validates file extensions for read/write operations

### Input Validation

- Path data length limits to prevent ReDoS attacks
- Maximum iteration limits for path parsing
- Null byte detection in file paths
- File path length restrictions

### Safe File Operations

- All file reads validate paths and file extensions
- All file writes validate paths and create directories safely
- Error handling prevents information leakage

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

1. **Do not** open a public GitHub issue
2. Email security details to: [Your security email or GitHub security advisory]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity, typically within 30 days for critical issues

### What to Expect

- We will acknowledge receipt of your report
- We will investigate and verify the vulnerability
- We will work on a fix and keep you updated
- Once fixed, we will credit you in the security advisory (if desired)
- We will publish a security release with the fix

### Vulnerability Disclosure Policy

- We follow responsible disclosure practices
- Critical vulnerabilities will be patched immediately
- Security patches will be backported to supported versions
- Public disclosure will occur after a fix is available

## Security Best Practices

When using this library:

1. **Validate Input**: Always validate SVG content before processing
2. **Restrict File Access**: Use base directory restrictions when possible
3. **Keep Updated**: Regularly update to the latest version
4. **Review Dependencies**: Keep all dependencies up to date
5. **Use HTTPS**: When fetching SVG files from remote sources

## Known Security Considerations

- File path validation is enforced for all file operations
- Large SVG files may impact performance; consider setting size limits
- Path parsing has iteration limits to prevent ReDoS attacks
- Always validate user-provided SVG content before processing

## Security Updates

Security updates will be released as patch versions (e.g., 1.1.12 → 1.1.13). We recommend:

- Enabling Dependabot or similar tools for automatic updates
- Reviewing release notes for security-related changes
- Testing updates in a development environment before production deployment

// @ts-check
'use strict';

const https = require('https');

/**
 * Minimal HTTPS helper that forces IPv4 (family: 4) on every request.
 *
 * Playwright's undici-based APIRequestContext does not respect
 * --dns-result-order=ipv4first, so on machines where IPv6 is
 * present in DNS but blocked at the firewall level we get ECONNREFUSED.
 * Passing `family: 4` to Node.js https.request bypasses that.
 *
 * @param {{
 *   method: string,
 *   hostname: string,
 *   path: string,
 *   body?: object,
 *   headers?: Record<string, string>
 * }} options
 * @returns {Promise<{ status: number, body: any, responseTimeMs: number }>}
 */
function apiRequest({ method, hostname, path, body, headers = {} }) {
    return new Promise((resolve, reject) => {
        const bodyStr = body ? JSON.stringify(body) : undefined;

        const reqOptions = {
            method,
            hostname,
            path,
            family: 4, // ← force IPv4; avoids ECONNREFUSED on IPv6 Cloudflare IPs
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers,
                ...(bodyStr
                    ? { 'Content-Length': String(Buffer.byteLength(bodyStr)) }
                    : {}),
            },
        };

        const start = Date.now();

        const req = https.request(reqOptions, (res) => {
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const responseTimeMs = Date.now() - start;
                let parsed;
                try {
                    parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
                } catch {
                    parsed = null;
                }
                resolve({ status: res.statusCode, body: parsed, responseTimeMs });
            });
        });

        req.on('error', reject);
        if (bodyStr) req.write(bodyStr);
        req.end();
    });
}

module.exports = { apiRequest };


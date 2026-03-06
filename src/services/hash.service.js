const crypto = require('crypto');

/**
 * Service to handle MD5 hashing.
 */
class HashService {
    /**
     * Hashes a string using MD5
     * @param {string} text The string to hash
     * @returns {string} The MD5 hash of the string
     */
    static md5(text) {
        return crypto.createHash('md5').update(text).digest('hex');
    }

    /**
     * Compares a plaintext string against an MD5 hash
     * @param {string} text The plaintext string
     * @param {string} hash The MD5 hash to compare against
     * @returns {boolean} True if they match, false otherwise
     */
    static compareMd5(text, hash) {
        return this.md5(text) === hash;
    }
}

module.exports = HashService;

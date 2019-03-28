const https = require("https");

/**
 * A basic HTTP client without need to pull additional node modules.
 */
class HTTPUtil {
    /**
     * Sends a HTTP request. For now HTTPS support only.
     * 
     * @param options basic self-explaining options are: hostname, port, path, method and headers
     * @param data encoded POST data if needed, usually an already-encoded encoded JSON string
     * @returns server response
    */
    static async http(options, data) {
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                if (res.statusCode != 200) return reject("status code " + res.statusCode);

                let buf = '';
                res.on('data', d => buf += d);
                res.on('end', () => {
                    resolve(buf);
                });
            });
            req.on('error', err => reject(err));
            if (data) {
                req.write(data);
            }
            req.end();
        });
    }
}

module.exports = HTTPUtil;
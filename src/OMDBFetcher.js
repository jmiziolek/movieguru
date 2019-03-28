const HTTPUtil = require("./HTTPUtil");
const httpHost = "omdbapi.com";

class OMDBFetcher {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async queryByTitle(title) {
        // Looks like this full text search won't return more than 1 result, so you need to be quite exact in what you want to fetch.
        let path = "/?apikey=" + this.apiKey + "&t=" + escape(title);
        let options = {
            hostname: httpHost,
            port: 443,
            path: path
        };
        let result = JSON.parse(await HTTPUtil.http(options));
        if (result.Error) {
            return null; // {"Response":"False","Error":"Movie not found!"}
        }
        delete result.Response;
        
       // console.log('DEBUG: OMDB query title=' + title + ' result=', result);

        // Returning a single object, not array.
        return result;
    }
}

module.exports = OMDBFetcher;
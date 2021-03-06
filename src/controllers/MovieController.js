const MOVIES_COLLECTION = 'movies';

class MovieController {
    static async getAllMovies(req, res) {
        try {
            let data = await res.app.db.collection(MOVIES_COLLECTION).find({}).toArray();
            data.map(d => delete d._id);
            res.send(data);                
        } catch (e) {
            return res.status(500).send({err: 'Something went wrong'});
        }
    }

    static async getMovie(req, res) {
        try {
            // Full text search but results are limited to one movie, so be specific in what you want to find.
            let title = req.body.title || req.query.title;
            let apiResults = await res.app.omdb.queryByTitle(title);

            if (!apiResults) {
                // Movie not found, send empty object.
                return res.send({});
            }

            res.send(apiResults);

            // Save it to DB asynchronously, response sent already.
            let movie = apiResults;
            await res.app.db.collection(MOVIES_COLLECTION).updateMany({'imdbID': movie.imdbID}, {$set: movie}, {upsert: true});
        
        } catch (e) {
            return res.status(500).send({err: 'Something went wrong'});
        }
    }
}

module.exports = MovieController;
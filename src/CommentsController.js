const COMMENTS_COLLECTION = 'comments';
const MOVIES_COLLECTION = 'movies';

class CommentsController {
    static async getAllComments(req, res) {
        let comments = await res.app.db.collection(COMMENTS_COLLECTION).find({}).toArray();
        comments.map(d => delete d._id);
        res.send(comments);
    }

    static async addComment(req, res) {
        let movie = req.body.movie;
        let comment = ("" + req.body.comment).trim();

        let movies = await res.app.db.collection(MOVIES_COLLECTION).find({}).toArray();
        movies = movies.filter(m => m.title == movie);

        if (!movies.length) {
            return res.send({err: 'Movie not found in db'})
        }

        if (!comment) {
            return res.send({err: 'Empty comment'});
        }

        res.app.db.collection(COMMENTS_COLLECTION).insert
    }
}

module.exports = CommentsController;
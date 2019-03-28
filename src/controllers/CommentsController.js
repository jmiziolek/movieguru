const COMMENTS_COLLECTION = 'comments';
const MOVIES_COLLECTION = 'movies';

class CommentsController {
    static async getAllComments(req, res) {
        try {
            let comments = await res.app.db.collection(COMMENTS_COLLECTION).find({}).toArray();
            comments.map(d => delete d._id);
            res.send(comments);    
        } catch (e) {
            return res.send({err: 'Something went wrong'});
        }
    }

    static async addComment(req, res) {
        try {
            let movie = "" + req.body.movie;
            let comment = ("" + req.body.comment).trim();
    
            let movieObj = await res.app.db.collection(MOVIES_COLLECTION).findOne({Title: movie});
            if (!movieObj) {
                return res.send({err: 'Movie not found in db'})
            }
    
            if (!comment) {
                return res.send({err: 'Empty comment'});
            }
    
            await res.app.db.collection(COMMENTS_COLLECTION).insert({comment, movie});
            return res.send({status: 'ok'});    
        } catch (e) {
            return res.send({err: 'Something went wrong'});
        }
    }
}

module.exports = CommentsController;
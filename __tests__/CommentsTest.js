const axios = require('axios');

process.env.PORT = 555;
let url = 'http://localhost:555';
axios.defaults.baseURL = url;

let startServer = require('../src/server');
let app;

beforeAll(() => startServer().then(a => {
    app = a;
}));

afterAll(() => app.close());

beforeAll(async () => {
    // Download movie with test data
    await axios.post('/movies', {
        title: 'test'
    });
});

describe('CommentsController', () => {
    it('Adds a comment', async () => {
        let data = (await axios.post('/comments', {
            movie: 'Test',
            comment: 'Hello world'
        })).data;
        expect(data).toEqual({
            status: 'ok'
        });
    });

    it('Will not a comment for invalid movie', async () => {
        let data = (await axios.post('/comments', {movie: 'xxxxx', comment: 'Hello world'})).data;
        expect(data).toEqual({
            err: 'Movie not found in db'
        });
    });

    it('Will not an empty comment', async () => {
        let data = (await axios.post('/comments', {movie: 'Test', comment: '    '})).data;
        expect(data).toEqual({
            err: 'Empty comment'
        });
    });

    it('Fetches all comments correctly', async () => {
        let data = (await axios.get('/comments')).data;
        expect(data).toEqual(expect.arrayContaining([{
            'comment': 'Hello world',
            'movie': 'Test'
        }]));
    });
})
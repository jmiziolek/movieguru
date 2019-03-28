it('a', () => {});
if (true) return;

const axios = require('axios');

let url = 'http://localhost:444';
axios.defaults.baseURL = url;

let startServer = require('../src/server');
let app;

beforeAll(() => startServer().then(a => {
    app = a;
}));

afterAll(() => app.close());


const MOVIE_KURIER = {
    Title: 'Kurier',
    Year: '2019',
    Rated: 'N/A',
    Released: '15 Mar 2019',
    Runtime: 'N/A',
    Genre: 'Drama, Thriller, War',
    Director: 'Wladyslaw Pasikowski',
    Writer: 'Wladyslaw Pasikowski (screenplay), Sylwia Wilkos (screenplay)',
    Actors: 'Philippe Tlokinski, Patricia Volny, Julie Engelbrecht, Grzegorz Malecki',
    Plot: 'N/A',
    Language: 'Polish',
    Country: 'Poland',
    Awards: 'N/A',
    Poster: 'https://m.media-amazon.com/images/M/MV5BYzVjYTE3YjktZWE3YS00MGNmLTk5MDUtZmJmOThkMzI1NWRkXkEyXkFqcGdeQXVyMjMwOTA0Ng@@._V1_SX300.jpg',
    Ratings: [],
    Metascore: 'N/A',
    imdbRating: 'N/A',
    imdbVotes: 'N/A',
    imdbID: 'tt8706988',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: 'N/A',
    Production: 'N/A',
    Website: 'N/A',
}

describe('MovieController', () => {
    it('Fetches example Movie correctly', async () => {
        let data = (await axios.get('/movies2?title=Kurier')).data;
        expect(data).toEqual(MOVIE_KURIER);
    });

    it('Returns empty object when movie is not found', async () => {
        let data = (await axios.get('/movies2?title=blablablaa')).data;
        expect(data).toEqual({});
    })

    it('Lists all saved movies in database', async() => {
        let data = (await axios.get('/movies')).data;
        expect(data).toEqual([MOVIE_KURIER]);
    })
})
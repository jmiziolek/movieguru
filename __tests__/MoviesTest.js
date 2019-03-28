const axios = require('axios');

let url = 'http://localhost:444';
axios.defaults.baseURL = url;

let startServer = require('../src/server');
let app;

beforeAll(() => startServer().then(a => {
    app = a;
}));

 afterAll(() => app.close());


const MOVIE_TEST = {
    Title: 'Test',
    Year: '2013',
    Rated: 'TV-MA',
    Released: '04 Apr 2014',
    Runtime: '89 min',
    Genre: 'Drama',
    Director: 'Chris Mason Johnson',
    Writer: 'Chris Mason Johnson (screenplay)',
    Actors: 'Scott Marlowe, Matthew Risch, Evan Boomer, Kevin Clarke',
    Plot: 'In 1985, a gay dance understudy hopes for his on-stage chance while fearing the growing AIDS epidemic.',
    Language: 'English, Portuguese, French',
    Country: 'USA',
    Awards: '3 wins & 3 nominations.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTQwMDU5NDkxNF5BMl5BanBnXkFtZTcwMjk5OTk4OQ@@._V1_SX300.jpg',
    Ratings: [{
            Source: 'Internet Movie Database',
            Value: '6.2/10'
        },
        {
            Source: 'Rotten Tomatoes',
            Value: '84%'
        },
        {
            Source: 'Metacritic',
            Value: '70/100'
        }
    ],
    Metascore: '70',
    imdbRating: '6.2',
    imdbVotes: '1,362',
    imdbID: 'tt2407380',
    Type: 'movie',
    DVD: '17 Jun 2014',
    BoxOffice: 'N/A',
    Production: 'Variance Films',
    Website: 'http://www.testthefilm.com'
}

describe('MovieController', () => {
    it('Fetches example Movie correctly', async () => {
        let data = (await axios.post('/movies', {title: 'Test'})).data;
        // console.log(data);
        expect(data).toEqual(MOVIE_TEST);
    });

    it('Returns empty object when movie is not found', async () => {
        let data = (await axios.post('/movies', {title: 'blablablabla'})).data;
        expect(data).toEqual({});
    })

    it('Lists all saved movies in database', async() => {
        let data = (await axios.get('/movies')).data;
        expect(data).toEqual([MOVIE_TEST]);
    })
})
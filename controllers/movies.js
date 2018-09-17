const app = require('express')();
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('e032cf0d8dbdea70b754f627eb2dcdfb');

module.exports = (app) =>{
  // GET All reviews
  app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then(response => {
      console.log(response.results[0])
   res.render('movies-index', { movies: response.results });
          }).catch(console.error)
  })

// Show route
app.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({ id: req.params.id }).then(movie => {
    if (movie.video) {
      moviedb.movieVideos({ id: req.params.id }).then(videos => {
        movie.trailer_youtube_id = videos.results[0].key
        renderTemplate(movie)
      })
    } else {
      renderTemplate(movie)
    }

    function renderTemplate(movie)  {
      res.render('movies-show', { movie: movie });
    }

  }).catch(console.error)
})

}

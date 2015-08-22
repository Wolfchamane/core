Core.ModelMovies = Core.RequestManager.extend(
    {
        movies: null,
        requestParams: null,
        url: '[[HOST]]backend/getMovies.php',
        method: 'GET',
        _parseMoviesGenre: function()
        {
            var movies = this.movies;
            movies.forEach(
                function(movie)
                {
                    movies[movies.lastIndexOf(movie)].genre = Core.ModelMovieGenre.parse(movie.genre);
                }
            );
        },
        getMovies: function()
        {
            var self = this;
            this._fetch().then(
                function()
                {
                    if (self.movies && self.movies.length)
                    {
                        self._parseMoviesGenre();
                    }
                }
            );
        }
    }
);

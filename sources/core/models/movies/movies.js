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
            return this._fetch();
        },
        _onRequestSuccess: function()
        {
            Core.RequestManager._onRequestSuccess.apply(this, arguments);
            if (this.movies && this.movies.length)
            {
                this._parseMoviesGenre();
            }
        }
    }
);

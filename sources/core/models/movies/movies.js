/**
 * Interface for MOVIES @ BACKEND
 *
 * @namespace   Core
 * @class       Core.ModelMovies
 * @extends     Core.RequestManager
 * @author      Arturo Martínez
 * @since       2015-10-27
 */
(function(){
    Core.ModelMovies = Core.RequestManager.extend(
        {
            /**
             * @inheritDoc
             */
            modelName: 'model-movies',
            /**
             * @inheritDoc
             */
            storeIn: 'movies',
            /**
             * Stores movies list
             * @property    movies
             * @type        {Object[]}
             */
            movies: null,
            /**
             * @inheritDoc
             */
            requestParams: {
                get: {
                    order: 'title'
                }
            },
            /**
             * @inheritDoc
             */
            storageKeys: ['movies'],
            /**
             * @inheritDoc
             */
            url: '[[HOST]]/movies.php',
            //@todo
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
            /**
             * Gets the total of movies in DDBB
             * @method getMovies
             */
            getMovies: function()
            {
                this.doRequest('get').then(function(){
                    this.toStorage();
                }.bind(this));
                return this;
            },
            /*_onRequestSuccess: function()
            {
                Core.RequestManager._onRequestSuccess.apply(this, arguments);
                if (this.movies && this.movies.length)
                {
                    this._parseMoviesGenre();
                }
            }*/
        }
    );
})();
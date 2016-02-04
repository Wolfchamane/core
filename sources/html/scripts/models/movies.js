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
            url: '',
            /**
             * Gets the total of movies in DDBB
             * @method getMovies
             */
            getMovies: function()
            {
                return this.doRequest('get').then(function(){
                    this.toStorage();
                }.bind(this));
            },
            /**
             * @inheritDoc
             * @private
             */
            _onRequestSuccess: function()
            {
                Core.RequestManager._onRequestSuccess.apply(this, arguments);
                if (!isEmpty(this.movies) && isArray(this.movies))
                {
                    this.movies.forEach(function(item, index){
                        var model = new Core.ModelMovie();
                        this.movies[index] = model.parse(item);
                    }.bind(this));
                }
            }
        }
    );
})();
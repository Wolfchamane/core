(function(){
    /**
     *
     * @type {*|Object}
     */
    Core.ModelMovieGenre = Core.extend(
        {
            codeMap: {
                'es_ES':{
                    '00': 'Acción',
                    '01': 'Animación',
                    '02': 'Comedía',
                    '03': 'Drama',
                    '04': 'Documental',
                    '05': 'Fantasía',
                    '06': 'Histórico',
                    '07': 'Ciencia Ficción',
                    '08': 'Terror',
                    '09': 'Suspense',
                    '10': 'Bélico'
                },
                'en_EN':{
                    '00': 'Action',
                    '01': 'Animation',
                    '02': 'Comedy',
                    '03': 'Drama',
                    '04': 'Documentary',
                    '05': 'Fantasy',
                    '06': 'Historic',
                    '07': 'Science Fiction',
                    '08': 'Terror',
                    '09': 'Thriller',
                    '10': 'War'
                }
            },
            parse: function(code)
            {
                var lang = this.ServiceLanguage.getLanguage();
                return this.codeMap[lang][code];
            }
        }
    );
    /**
     * Interface for a movie model
     * @returns {*|Object}
     * @constructor
     */
    Core.ModelMovie = function()
    {
        return Core.extend(
            {
                /**
                 * @inheritDoc
                 */
                modelName: 'movie',
                /**
                 * ID of the movie
                 * @property    _id
                 * @type        {String}
                 */
                _id: '',
                /**
                 * Key name of the movie
                 * @property    key
                 * @type        {String}
                 */
                key: '',
                /**
                 * Title of the movie
                 * @property    title
                 * @type        {String}
                 */
                title: '',
                /**
                 * Year of publication
                 * @property    year
                 * @type        {Number}
                 */
                year: 1900,
                /**
                 * Genre of the movie
                 * @property    genre
                 * @type        {String}
                 */
                genre: '',
                /**
                 * Description of the movie
                 * @property    desc
                 * @type        {String}
                 */
                desc: '',
                /**
                 * Rating of the movie
                 * @property    rating
                 * @type        {Number}
                 */
                rating: 0,
                /**
                 * Total number of votes of this movie
                 * @property    totalVotes
                 * @type        {Number}
                 */
                totalVotes: 0,
                /**
                 * Parses a configuration item into this movie model
                 * @param item {Object} Configuration item
                 * @returns {Core.ModelMovie}
                 */
                parse: function(item)
                {
                    for (var prop in item)
                    {
                        if (item.hasOwnProperty(prop) && this.hasOwnProperty(prop))
                        {
                            this.set(prop, item[prop]);
                        }
                    }
                    this._parseMovieGenre();
                    return this;
                },
                /**
                 * Gets the string name of this movie genre
                 * @private
                 */
                _parseMovieGenre: function()
                {
                    this.genre = Core.ModelMovieGenre.parse(this.genre);
                }
            }
        );
    };
})();

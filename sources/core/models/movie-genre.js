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
            var lang = Core.Language.getLanguage();
            return this.codeMap[lang][code];
        }
    }
);
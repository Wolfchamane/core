Core.ModelMovies = Core.RequestManager.extend(
    {
        movies: null,
        requestParams: null,
        url: '[[HOST]]backend/getMovies.php',
        method: 'GET'
    }
);

Core.ModelMoviesLastUpdate = Core.RequestManager.extend(
    {
        lastUpdate: null,
        requestParams: null,
        url: '[[HOST]]backend/getMoviesLastUpdate.php',
        method: 'GET',
        getLastUpdate: function()
        {
            return this._fetch();
        }
    }
);

Core.ModelMoviesLastUpdate = Core.RequestManager.extend(
    {
        lastUpdate: null,
        requestParams: null,
        url: '',
        method: 'GET',
        getLastUpdate: function()
        {
            return this._fetch();
        }
    }
);

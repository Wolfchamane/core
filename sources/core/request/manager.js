Core.RequestManager = Core.extend(
    {
        allowedUrls: '_ALLOWED_URLS_',
        _evalAllowedUrls: function()
        {
            var currentLocation = window.location.href;
            var pattern = new RegExp(this.allowedUrls);
            return pattern.test(currentLocation);
        },
        _getData    : function()
        {
            var data = {};
            var params = this.requestParams;
            var self = this;

            for(var param in params){
                if (self.hasOwnProperty(params[param]))
                {
                    data[param] = self[params[param]];
                }
                else
                {
                    data[param] = params[param];
                }
            }

            return data;
        },
        _getMethod  : function()
        {
            return this.method;
        },
        _buildUrl   : function()
        {
            return this.url.replace('[[HOST]]', this.protocol + '://' + this.host);
        },
        _getConfig  : function()
        {
            return {
                async		: false,
                crossDomain	: true,
                cache		: false,
                data        : this._getData(),
                dataType	: 'json',
                timeout		: 6000,
                type		: this._getMethod(),
                url			: this._buildUrl(),
                success		: this._onRequestSuccess.bind(this)
            };
        },
        /**
         * Performs AJAX call
         * @method _fetch
         * @private
         */
        _fetch: function()
        {
            return $.ajax(this._getConfig());
        },
        _isOk: function(response)
        {
            return (response && response.code && (response.code === 'ok'));
        },
        /**
         */
        _onRequestBeforeSend: function(jqXhr, config){},
        _onRequestSuccess: function(data, status, jqXhr){
            var storeIn = this.toString('Model', true);

            if (this._isOk(data))
            {
                delete data.result;

                if (this.hasOwnProperty(storeIn))
                {
                    this[storeIn] = data.data;
                }
                else
                {
                    Object.keys(data).forEach(function(key){
                        if (this.hasOwnProperty(key))
                        {
                            this[key] = data[key];
                        }
                    }.bind(this));
                }
            }
        },
        _onRequestFail: function(jqXhr, status, error){},
        _onRequestAlways: function(jqXhr, status){},
        doRequest: function(){
            var result = null;
            if (this._evalAllowedUrls())
            {
                result = this._fetch();
            }
            else
            {
                console.error('Wolfchamane.com CORE is not allowed from your location');
            }
            return result;
        }
    }
);
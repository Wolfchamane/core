/**
 * Request manager interface. This class must be used for any model which requires access to backend.
 *
 * @author      Arturo Martínez 'Wolfchamane'
 * @since       2015-10-24
 * @namespace   Core
 * @class       Core.RequestManager
 * @extends     Core
 */
(function() {
    Core.RequestManager = Core.extend(
        {
            /**
             * Allowed URLs --> prevents scamming
             *
             * @property    allowedUrls
             * @type        {String}
             */
            allowedUrls: '_ALLOWED_URLS_', //@TODO ---> this should be encoded
            /**
             * Method for the AJAX call
             * @property    method
             * @type        {String}
             */
            method: '',
            /**
             * URL to call
             * @property    url
             * @type        {String}
             */
            url: '',
            /**
             * This model name
             * @property    modelName
             * @type        {String|'request-manager'}
             * @readonly
             */
            modelName: 'request-manager',
            /**
             * Default property for data response storage
             * @property    storeIn
             * @type        {String}
             */
            storeIn: '',
            /**
             * AJAX request parameters
             * @property    requestParams
             * @type        {Object}
             */
            requestParams: null,
            /**
             * Evaluates if current window path is allowed or not
             * @method  _evalAllowedUrls
             * @returns {boolean}
             * @private
             */
            _evalAllowedUrls: function () {
                var currentLocation = window.location.href,
                    pattern = new RegExp(this.allowedUrls);
                return pattern.test(currentLocation);
            },
            /**
             * Builds {requestParams}{method} values based on inyected data
             * @method  _parseRequestData
             * @param data {Object}
             * @private
             */
            _parseRequestData: function (data) {
                var self = this;
                if (typeof data !== 'undefined') {
                    Object.keys(data).forEach(function (key) {
                        if (self.requestParams[self.method.toLowerCase()].hasOwnProperty(key)) {
                            self.requestParams[self.method.toLowerCase()][key] = data[key];
                        }
                    });
                }
            },
            /**
             * Obtains required data for the AJAX call
             * @method  _getData
             * @returns {Object}
             * @private
             */
            _getData: function () {
                var data = {},
                    params = this['requestParams'][this.method.toLowerCase()],
                    self = this;
                if (params) {
                    for (var param in params) {
                        if (params.hasOwnProperty(param)) {
                            if (self.hasOwnProperty(params[param])) {
                                data[param] = self[params[param]];
                            }
                            else {
                                data[param] = params[param];
                            }
                        }
                    }
                }
                return data;
            },
            /**
             * Obtains the method for the AJAX call
             * @method  _getMethod
             * @returns {String}
             * @private
             */
            _getMethod: function () {
                return this.method;
            },
            /**
             * Builds AJAX url target
             * @method  _buildUrl
             * @returns {String}
             * @private
             */
            _buildUrl: function () {
                return this.url.replace('[[HOST]]', this.protocol + '://' + this.host);
            },
            /**
             * Builds AJAX configuration object
             * @method  _getConfig
             * @returns {Object}
             * @private
             */
            _getConfig: function () {
                return {
                    async: this.async || false,
                    crossDomain: this.crossDomain || true,
                    cache: this.cache || false,
                    data: this._getData(),
                    dataType: this.dataType || 'json',
                    timeout: this.timeout || 6000,
                    type: this._getMethod(),
                    url: this._buildUrl(),
                    beforeSend: this._onRequestBeforeSend.bind(this),
                    success: this._onRequestSuccess.bind(this),
                    error: this._onRequestFail.bind(this),
                    complete: this._onRequestAlways.bind(this)
                };
            },
            /**
             * Performs AJAX 'GET' call
             * @method _fetch
             * @param data {Object} to send to service
             * @private
             */
            _get: function (data) {
                this.method = 'GET';
                this._parseRequestData(data);
                return $.ajax(this._getConfig());
            },
            /**
             * Performs AJAX 'PUT' call
             * @method _fetch
             * @param data {Object} to send to service
             * @private
             */
            _save: function (data) {
                this.method = 'PUT';
                this._parseRequestData(data);
                return $.ajax(this._getConfig());
            },
            /**
             * Performs AJAX 'DELETE' call
             * @method _fetch
             * @param data {Object} to send to service
             * @private
             */
            _delete: function (data) {
                this.method = 'DELETE';
                this._parseRequestData(data);
                return $.ajax(this._getConfig());
            },
            /**
             * Performs AJAX 'POST' call
             * @method _fetch
             * @param data {Object} to send to service
             * @private
             */
            _update: function (data) {
                this.method = 'POST';
                this._parseRequestData(data);
                return $.ajax(this._getConfig());
            },
            /**
             * Returns whether server response was success
             * @method  _isOk
             * @param response {Object} Obtained from server
             * @returns {Boolean}
             * @private
             */
            _isOk: function (response) {
                return (response && response.result && (response.result.description.toLowerCase() === 'ok'));
            },
            /**
             * Saves response into model
             * @method  _saveResponse
             * @param response {Object} Obtained from server
             * @private
             */
            _saveResponse: function (response) {
                var storeIn = this.storeIn || this.modelName.substr(0, this.modelName.lastIndexOf('s')).replace('model-', '');
                if (this.hasOwnProperty(storeIn)) {
                    this[storeIn] = response.data;
                }
                else {
                    Object.keys(response.data).forEach(function (key) {
                        if (this.hasOwnProperty(key)) {
                            this[key] = response.data[key];
                        }
                    }.bind(this));
                }
                delete response.result;
            },
            /**
             * Default callback for <em>beforeSend</em> method
             * @method  _onRequestBeforeSend
             * @param   jqXhr {Object}
             * @param   config {Object}
             * @private
             */
            _onRequestBeforeSend: function (jqXhr, config) {
            },
            /**
             * Default callback for <em>success</em> method
             * @method  _onRequestSuccess
             * @param response {Object}
             * @param status {Object}
             * @param jqXhr {Object}
             * @private
             */
            _onRequestSuccess: function (response, status, jqXhr) {
                if (this._isOk(response)) {
                    this._saveResponse(response);
                }
            },
            /**
             * Default callback for <em>fail</em> method
             * @method  _onRequestFail
             * @param jqXhr {Object}
             * @param status {Object}
             * @param error {Object}
             * @private
             */
            _onRequestFail: function (jqXhr, status, error) {
            },
            /**
             * Default callback for <em>complete</em> method
             * @method  _onRequestAlways
             * @param jqXhr {Object}
             * @param status {Object}
             * @private
             */
            _onRequestAlways: function (jqXhr, status) {
            },
            /**
             * Executes the AJAX request and returns the XHR object
             * @method  doRequest
             * @param method {String}
             * @param data {Object} To send to server
             * @returns {Object}
             */
            doRequest: function (method, data)
            {
                var result = null;
                if (this._evalAllowedUrls()) {
                    result = this['_' + method.toLowerCase()](data);
                }
                else {
                    alert('Wolfchamane.com CORE is not allowed from your location');
                }
                return result;
            }
        }
    );
})();
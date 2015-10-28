/**
 * ------------------------------------------------------------------------------------------------------------------
 * PROTOTYPES
 * ------------------------------------------------------------------------------------------------------------------
 *
 * Following are js-base-types prototypes functions:
 *      - String.capitalize() => Capitalizes a text, i.e: 'hello' becomes 'Hello'
 *      - String.camelize() => Returns camel case version of a text with '-', i.e: 'whats-app?' becomes 'whatsApp?'
 *
 *
 * @NOTICE: DO NOT MODIFY THIS METHODS!!
 */
String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.camelize = function(){
    var aux = this;
    if (aux.lastIndexOf('-') !== -1)
    {
        aux = aux.split('-');
        for (var i = 1, l = aux.length; i < l; i++)
        {
            aux[i] = aux[i].capitalize();
        }
        aux = aux.join().replace(/\,/g, '');
    }
    return aux;
};

/**
 * Core | Wolfchamane.com main library. Provides classes, methods and models.
 *
 * @namespace   Core
 * @class       Core
 * @author      Arturo Martínez
 * @since       2015-10-24
 * @version     1.0.00
 */
window.Core = (function(){
    return {
        /**
         * Copyright
         * @property    author
         * @type        {String|'com-wolfchamane'}
         * @readonly
         */
        author      : 'com-wolfchamane',
        /**
         * Namespace declaration
         * @property    namespace
         * @type        {String|'Core'}
         * @readonly
         */
        namespace   : 'Core',
        /**
         * Model name
         * @property    modelName
         * @type        {String}
         */
        modelName   : '',
        /**
         * Stores URL of the host, to use in requests
         * @property    host
         * @type        {String}
         * @readonly
         * @TODO: goes here? should not it be codified?
         */
        host        : '_HOST_',
        /**
         * Stores the URL protocol to perform on requests
         * @property    protocol
         * @type        {String}
         * @readonly
         * @TODO: goes here?
         */
        protocol    : '_PROTOCOL_',
        /**
         * Objects keys to save into browser storage
         * @property    storageKeys
         * @type        {Object[]}
         */
        storageKeys : [],
        /**
         * Allows to extend any object
         * @method  extend
         * @param   source {Object} Which is extending
         * @returns {Object}
         */
        extend      : function(source)
        {
            var result = {};
            result['__proto__'] = this;
            Object.keys(source).forEach(function (key) {
                if (result.hasOwnProperty(key)) {
                    if (result[key] !== source[key]) {
                        result[key] = source[key];
                    }
                }
                else {
                    result[key] = source[key];
                }
            });
            return result;
        },
        /**
         * Retrieves current object {@storageKeys}
         * @method  _getStorageKeys
         * @returns {String[]}
         * @private
         */
        _getStorageKeys : function()
        {
            return this['storageKeys'];
        },
        /**
         * Stores current object {@storageKeys} into browser storage
         * @method  toStorage
         * @param   remove {Boolean} If set to <em>false</em>, removes info.
         */
        toStorage   : function(remove)
        {
            var key = [this.author, this.namespace.toLowerCase()];
            if (this['modelName'])
            {
                key.push(this['modelName']);
            }
            key = key.join('-');
            if ((typeof remove === 'undefined') || (remove !== false))
            {
                var keys = this._getStorageKeys(),
                    value = {};
                keys.forEach(function(key){
                    value[key] = this[key];
                }.bind(this));
                value = window.btoa(JSON.stringify(value));
                localStorage.setItem(key, value);
            }
            else
            {
                localStorage.removeItem(key);
            }
        },
        /**
         * Returns this object name
         * @method  toString
         * @returns {String}
         */
        toString    : function()
        {
            var modelName = this.modelName || '';
            if ((typeof modelName === 'string') && !!modelName.length)
            {
                modelName = modelName.camelize().capitalize();
            }
            return [this.namespace.capitalize(), modelName].join('.');
        },
        /**
         * Retrieves this object property value
         * @param property {String}
         */
        get: function(property)
        {
            var value;
            if ((typeof property === 'string') && this.hasOwnProperty(property))
            {
                value = this[property];
            }
            return value;
        },
        /**
         * Sets this object property some value
         * @param property {String} To set
         * @param value {Object}
         * @returns {Boolean}
         */
        set: function(property, value)
        {
            var isSet = false;
            if (this.hasOwnProperty(property))
            {
                this[property] = value;
                isSet = true;
            }
            return isSet;
        }
    };
})();

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
            var properties = null;
            try
            {
                properties = Object.keys(source);
            }
            catch (e) {}
            if (!isEmpty(properties))
            {
                properties.forEach(function (key) {
                    if (result.hasOwnProperty(key)) {
                        if (result[key] !== source[key]) {
                            result[key] = source[key];
                        }
                    }
                    else {
                        result[key] = source[key];
                    }
                });
            }
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
         * @returns value {Object}
         */
        get: function(property)
        {
            var value;
            if ((typeof property === 'string') && this.hasOwnProperty(property))
            {
                value = this[property];
            }
            //@NOTICE: if value is empty, try into this parent object
            if (isEmpty(value) && !!this['__proto__'])
            {
                value = this.get.apply(this['__proto__'], [property]);
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
            if (this.hasOwnProperty(property) || this['__proto__'].hasOwnProperty(property))
            {
                this[property] = value;
                isSet = true;
            }
            return isSet;
        }
    };
})();

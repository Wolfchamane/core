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
 * @NOTICE: DO NOT MODIFY THIS PROTOS!!
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
 * ------------------------------------------------------------------------------------------------------------------
 * COMMON METHODS
 * ------------------------------------------------------------------------------------------------------------------
 * @NOTICE: Do not modify this methods!
 */
/**
 * Evaluates if a value is an array object or not
 * @method isArray
 * @param value {Object}
 * @return {Boolean}
 */
function isArray (value)
{
    return ((typeof value === 'object') && (value !== null) && value.hasOwnProperty('length'));
}
/**
 * Evaluates if a value is empty or not
 * @method isEmpty
 * @param value {Object}
 * @returns {Boolean}
 */
function isEmpty (value)
{
    var result = ((typeof value === 'undefined') || (value === null));
    if (!result && isArray(value) && !value.length)
    {
        result = true;
    }
    return result;
}

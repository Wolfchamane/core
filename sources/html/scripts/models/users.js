/**
 * Interface for USERS @ BACKEND
 *
 * @namespace   Core
 * @class       Core.ModelUsers
 * @extends     Core.RequestManager
 * @author      Arturo Martínez
 * @since       2015-10-24
 */
(function(){
    Core.ModelUsers = Core.RequestManager.extend
    (
        {
            /**
             * Stores current user
             * @property    user
             * @type        {Object}
             */
            user            : null,
            /**
             * Service URL
             * @property    url
             * @type        {String}
             */
            url             : '',
            /**
             * Service request params for each REST method
             */
            requestParams   : {
                get         : {
                    appKey  : '',
                    email   : '',
                    password: ''
                }
            },
            /**
             * Keys to store into browser storage
             * @property    storageKeys
             * @type        {String[]}
             */
            storageKeys     : ['user'],
            /**
             * This model name
             * @property    modelName
             * @type        {String|user}
             * @readOnly
             */
            modelName       : 'model-users',
            /**
             * Tries to retrieve an user
             * @method  getUser
             * @param data {Object} User's login info
             * @returns {Core.ModelUsers}
             */
            getUser         : function(data)
            {
                var request = null;
                if (data && (typeof data['email'] !== 'undefined') && (typeof data['password'] !== 'undefined'))
                {
                    request = this.doRequest('get', data);
                }
                return request;
            }
        }
    );
})();
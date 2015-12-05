(function()
{
    /**
     * page.js interface.
     * @see {@link https://visionmedia.github.io/page.js/|page.js}
     *
     * @author      Arturo Martínez 'Wolfchamane'
     * @since       2015-11-14
     * @namespace   Core
     * @class       Core.Router
     * @extends     Core
     */
    Core.Router = Core.extend
    (
        {
            _styleOnAnimation: 'animation-on',
            _styleOffAnimation: 'animation-off',
            _animationTimeout: 600,
            /**
             * @inheritDoc
             */
            modelName   : 'router',
            /**
             * Available routes
             * @property    _routes
             * @private
             * @type        {Object}
             */
            _routes     : null,
            /**
             * HTML root node
             * @property    _rootNode
             * @private
             * @type        {String}
             */
            _rootNode   : '',
            /**
             * Resolves all paths inscribing into {@_rootNode} the template stored in {@_routes} for the path
             * @param   path {String}
             * @param   context {Object}
             * @private
             */
            _resolve    : function(path, context)
            {
                var self = this;
                if (self._routes.hasOwnProperty(path))
                {
                    var element = document.getElementById(self._rootNode);
                    if (element)
                    {
                        if (element.classList.contains(self.get('_styleOffAnimation')))
                        {
                            element.classList.remove(self.get('_styleOffAnimation'));
                        }
                        element.classList.add(self.get('_styleOnAnimation'));
                        setTimeout(
                            function()
                            {                                
                                setTimeout(
                                    function()
                                    {
                                        var params = context
                                            ? context.state
                                            : null;
                                        if (params.path)
                                        {
                                            delete params.path;
                                        }
                                        element.innerHTML = self._routes[path].apply(self, [params]);
                                        element.classList.remove(self.get('_styleOnAnimation'));
                                        element.classList.add(self.get('_styleOffAnimation'));

                                    },
                                    self.get('_animationTimeout')
                                );
                            },
                            self.get('_animationTimeout')
                        );
                    }
                }
            },
            /**
             * Transforms a path into a valid format
             * @param path {String}
             * @returns {String}
             * @private
             */
            _fixPath    : function(path)
            {
                if (path.lastIndexOf('-') !== -1)
                {
                    path = path.camelize();
                }
                if (path.charAt(0) !== '/')
                {
                    path = '/' + path;
                }
                return path;
            },
            /**
             * Registers a new path
             * @param path {String}
             * @param template {String}
             * @private
             */
            _register   : function(path, template)
            {
                path = this._fixPath(path);
                if (!this._routes.hasOwnProperty(path))
                {
                    this._routes[path] = template;
                    page(path, this._resolve.bind(this, path));
                }
            },
            /**
             * Deletes a path from {@_routes}
             * @param  path {String}
             */
            delPath     : function(path)
            {
                path = this._fixPath(path);
                if (this._routes.hasOwnProperty(path))
                {
                    delete this._routes[path];
                }
            },
            /**
             * Adds a new path to {@_routes}
             * @param   path {String}
             * @param   template {String}
             */
            addPath     : function(path, template)
            {
                if ((typeof path === 'object') && !isEmpty(path['path']) && !isEmpty(path['template']))
                {
                    path = path.path;
                    template = path.template;
                }
                this._register(path, template);
            },
            /**
             * Transits to new path, if exists
             * @param path {String}
             */
            transitTo   : function(path, options)
            {
                var fixedPath = path;
                if (fixedPath.lastIndexOf('-') !== -1)
                {
                    fixedPath = fixedPath.camelize();
                }
                if (fixedPath.charAt(0) !== '/')
                {
                    fixedPath = '/' + fixedPath;
                }
                if (this._routes && this._routes.hasOwnProperty(fixedPath))
                {
                    page(fixedPath, options);
                }
            },
            /**
             * Initializes this router
             * @param config {Object}
             */
            init        : function(config)
            {
                if (!isEmpty(config) && !isEmpty(config.base))
                {
                    if (isEmpty(this._routes))
                    {
                        this._routes = {};
                    }

                    this._rootNode = 'web-content';
                    var root = config.root || config.rootNode;
                    if (!isEmpty(root))
                    {
                        this._rootNode = root;
                    }

                    page.base(config.base);

                    if (!isEmpty(config.paths) && isArray(config.paths))
                    {
                        config.paths.forEach(function(pathConfig){
                            this._register(pathConfig.path, pathConfig.template);
                        }.bind(this));
                    }

                    page({hashbang: true});
                    page();
                }
            }
        }
    );
})();
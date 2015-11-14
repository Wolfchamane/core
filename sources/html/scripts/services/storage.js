Core.ServiceStorage = Core.extend(
    {
        _target : 'local',
        _isValidJSON: function(data, coding)
        {
            var result = true;
            try{
                if (coding)
                {
                    JSON.stringify(data);
                }
                else
                {
                    JSON.parse(data);
                }
            }catch(e){
                result = false;
            }
            return result;
        },
        getValue: function(key, parse, decodify)
        {
            var result = null;

            if (!key)
            {
                console.error('[ERROR] [Core.Storage.getValue()] Params {@key} cannot be empty!');
            }
            else
            {
                if ((typeof key === 'string') && !key.match(/.+\-wolfchamane\-.+/))
                {
                    console.warn('[WARNING] [Core.Storage.getValue()] Accessing non Wolfchamane.com value');
                }
                var value = null;
                if (window[this._target + 'Storage'].hasOwnProperty(key))
                {
                    value = window[this._target + 'Storage'].getItem(key);
                    if (decodify)
                    {
                        value = window.atob(value);
                    }
                    if (parse && this._isValidJSON(value, false))
                    {
                        value = JSON.parse(value);
                    }
                }
                result = value;
            }

            return result;
        },
        setValue: function(key, value, stringify, codify)
        {
            if (!key || !value)
            {
                console.error('[ERROR] [Core.Storage.setValue()] Params {@key} and {@value} cannot be empty!');
            }
            else
            {
                if ((typeof key === 'string') && !key.match(/.+\-wolfchamane\-.+/))
                {
                    console.warn('[WARNING] [Core.Storage.setValue()] Accessing non Wolfchamane.com value');
                }

                if (stringify && this._isValidJSON(value, true))
                {
                    value = JSON.stringify(value);
                }

                if (codify)
                {
                    value = window.btoa(value);
                }

                window[this._target + 'Storage'].setItem(key, value);
            }
        }
    }
);

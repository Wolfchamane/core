Core.Storage = Core.extend(
    {
        _target : 'local',
        _isValidJSON: function(data)
        {
            var result = true;
            try{
                JSON.stringify(data);
            }catch(e){
                result = false;
            }
            return result;
        },
        setValue: function(key, value, stringify, codify)
        {
            if (!key || !value)
            {
                console.error('[ERROR] [Core.Storage] Params {@key} and {@value} cannot be empty!');
            }
            else
            {
                if ((typeof key === 'string') && !key.match(/.+\-wolfchamane\-.+/))
                {
                    console.warn('[WARNING] [Core.Storage] Accessing non Wolfchamane.com value');
                }

                if (stringify && this._isValidJSON(value))
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

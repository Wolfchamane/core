if (!window.core)
{
    window.Core = {};
}
Core =
{
    host        : '_HOST_',
    protocol    : '_PROTOCOL_',
    extend      : function(source)
    {

        var result = {};

        Object.keys(this).forEach(function (key) {
            result[key] = this[key];
        }.bind(this));

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
    toString    : function(replacement, inLowerCase)
    {
        var self = this;
        var name = null;
        var keys = Object.keys(Core);
        for (var i = 0; ((i < keys.length) && (name === null)); i++)
        {
            if (self === Core[keys[i]])
            {
                name = keys[i];
            }
        }

        if (replacement)
        {
            name = name.replace(replacement, '');
        }

        if (inLowerCase)
        {
            name = name.toLowerCase();
        }

        return name;
    }
};
Demo.TEMPLATES = {
    index: function()
    {
        return '<login-form></login-form>';
    },
    home: function(params)
    {
        var tpl = '<h1>Global Position</h1><p>Welcome {{user}}!</p><p><a href="./">Index</a><br/><a href="./about">About</a></p>';
        if (!Object.keys(params).length)
        {
            var user = localStorage.getItem('com-wolfchamane-core-model-users');
            if (user)
            {
                try
                {
                    user = window.atob(user);
                    user = JSON.parse(user);
                    user = user.user;
                }
                catch(e)
                {
                    user = null;
                }
            }

            if (user)
            {
                params = {
                    user: user.name
                };

            }
        }
        if (params)
        {
            Object.keys(params).forEach(function(prop){
                tpl = tpl.replace('{{' + prop + '}}', params[prop]);
            });
        }
        return tpl;
    },
    about: function()
    {
        return '<h1>About</h1><p><a href="./">Index</a><br/><a href="./globalPosition">Global Position</a></p>';
    }
};
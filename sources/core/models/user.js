Core.ModelUser = Core.RequestManager.extend(
    {
        userId      : '',
        email       : '',
        alias       : '',
        name        : '',
        surname     : '',
        dob         : '',
        lastLogin   : '',
        rights      : '',
        requestParams: {
            appName     : '',
            email       : 'email',
            password    : ''
        },
        url: '[[HOST]]/backend/getUser.php',
        method: 'POST'
    }
);

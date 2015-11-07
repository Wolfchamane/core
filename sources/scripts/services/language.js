Core.ServiceLanguage = Core.extend(
    {
        supportedLanguages: ['es_ES', 'en_EN'],
        defaultLanguage: 'es_ES',
        defaultLocale: 'es_ES',
        language: null,
        storageKey: 'com-wolfchamane-lang',
        getLanguage: function()
        {
            return this.language;
        },
        setLanguage: function(newLang)
        {
            if (this.supportedLanguages.lastIndexOf(newLang) !== -1)
            {
                this.language = newLang;
                if (Core.ServiceStorage)
                {
                    Core.ServiceStorage.setValue(this.storageKey, newLang, false, false);
                }
                else
                {
                    localStorage.setItem(this.storageKey, newLang);
                }
            }
        },
        setDefaultLanguage: function()
        {
            var lang = null;
            if (Core.ServiceStorage)
            {
                lang = Core.ServiceStorage.getValue(this.storageKey, false, false);
            }
            else
            {
                lang = localStorage.getItem(this.storageKey);
            }
            if (!lang)
            {
                lang = this.defaultLanguage;
            }
            this.setLanguage(lang);
        }
    }
);

(function(){
    'use strict';
    if (Core.ServiceLanguage)
    {
        Core.ServiceLanguage.setDefaultLanguage();
    }
})();

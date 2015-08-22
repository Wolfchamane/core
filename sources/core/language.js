Core.Language = Core.extend(
    {
        supportedLanguages: ['es_ES', 'en_EN'],
        defaultLanguage: 'es_ES',
        defaultLocale: 'es_ES',
        language: null,
        getLanguage: function()
        {
            return this.language;
        },
        setLanguage: function(newLang)
        {
            if (this.supportedLanguages.lastIndexOf(newLang) !== -1)
            {
                this.language = newLang;
                localStorage.setItem('wolfchamane-com-lang', newLang);
            }
        },
        setDefaultLanguage: function()
        {
            var lang = localStorage.getItem('wolfchamane-com-lang');
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
    if (Core.Language)
    {
        Core.Language.setDefaultLanguage();
    }
})();

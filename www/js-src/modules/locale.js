(function () {
    var app = angular.module('Locale', [
        'ngLocalize',
        'ngLocalize.Config',
        'ngLocalize.InstalledLanguages'
    ]);

    app.value('localeConf', {
        basePath: 'i18n',
        defaultLocale: 'cs-CZ',
        sharedDictionary: 'common',
        fileExtension: '.json',
        persistSelection: false,
        cookieName: 'COOKIE_LOCALE_LANG',
        observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
        delimiter: '::'
    });

    app.value('localeSupported', [
        'cs-CZ',
        'en-GB'
    ]);

    app.value('localeFallbacks', {
        'cs': 'cs-CZ',
        'en': 'en-GB'
    });
})();
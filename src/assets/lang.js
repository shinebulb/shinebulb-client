import languages from './json/languages.json';

export default function lang(settings) {
    if ((settings.language !== 0) || (!settings.language)) {
        if (languages.includes(window.navigator.language.slice(0, 2))) {
            return languages.indexOf(window.navigator.language.slice(0, 2));
        }
        return 0;
    }
    return settings.language;
}
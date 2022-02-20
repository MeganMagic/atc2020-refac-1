import text from '../data/text.json';

const useLangSwitch = (location, content, lang="KO") => {
    if (!location || !content || !lang ) return;
    if (lang === ("KO" || "EN")) { lang = "KO"}

    const search = text.filter(x => x.location === location && x.content === content && x.lang === lang)
    if(search.length === 0) return '-';
    else { return search[0].text }
}

export default useLangSwitch;
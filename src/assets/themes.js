import axios from 'axios';
import custom from './json/custom.json';

const systemTheme = () => {
    window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ?
    darkTheme() : lightTheme();
}

const lightTheme = () => {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
}

const darkTheme = () => {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
}

const customTheme = () => {
    axios.get(
        "https://shinebulb-server-production-7e2b.up.railway.app/users/changeTheme",
        { headers: { accessToken: localStorage.getItem("accessToken") } }
    ).then(response => {

        document.body.classList.remove("dark");
        document.body.classList.remove("light");
        document.body.classList.add('theme-transition');
        setTimeout(() => document.body.classList.remove('theme-transition'), 500);

        const bg = response.data.lastBg;
        const font = response.data.lastFont;
        const customProperties = [bg, font, bg, bg, bg, bg, `${font} 3px solid`, `${font} 1px solid`, bg, font, font, font]
        for (let i = 0; i < customProperties.length; i++) {
            document.documentElement.style.setProperty(custom[i], customProperties[i]);
        }
    });
}

const themes = [
    systemTheme, lightTheme, darkTheme, customTheme, () => {}
]

export default themes
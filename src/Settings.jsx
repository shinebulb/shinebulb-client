import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import axios from 'axios';
import ThemeConstructor from './ThemeConstructor';
import More from './More';
import themes from './assets/themes';
import text from './assets/json/text.json';
import modes from './assets/json/modes.json';
import languages from './assets/json/languages.json';
import {motion} from 'framer-motion';

function Settings({ settings, setSettings }) {

    const { authState } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const constructorRef = useRef(null);
    const moreRef = useRef(null);

    function themeChange(event) {
        const mode = modes.indexOf(event.target.value);
        if (mode < 3) {
            if (!authState.status) {
                document.body.classList.add('theme-transition');
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 500);
                themes[mode]();
                setSettings({...settings, theme: mode});
                localStorage.setItem("theme", mode);
            }
            else {
                axios.put(
                    "http://localhost:3001/users/theme",
                    { theme: mode, id: authState.id },
                    { headers: { accessToken: localStorage.getItem("accessToken") } }
                ).then(response => {
                    document.body.classList.add('theme-transition');
                    setTimeout(() => {
                        document.body.classList.remove('theme-transition');
                    }, 500);
                    themes[mode]();
                    setSettings({...settings, theme: response.data});
                });
            }
        }
        else if (mode === 3) {
            constructorRef.current.showModal();
        }
        else if (mode === 4) {
            moreRef.current.showModal();
        }
    }

    function languageChange(event) {
        const newLang = languages.indexOf(event.target.value);
        if (!authState.status) {
            localStorage.setItem("language", newLang);
            setSettings(
                { ...settings, language: newLang }
            );
        }
        else {
            axios.put(
                "http://localhost:3001/users/language",
                { language: newLang, id: authState.id },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            ).then(response => setSettings(
                { ...settings, language: response.data || newLang }
            ));
        }
    }

    return (
        <motion.div
            className='settings'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>{text[settings.language || 0].headings[1]}</h2>
            <div className="container">
                <label className="settingName">{text[settings.language || 0].settings[0]}</label>
                <select onChange={themeChange} value={modes[settings.theme]}>
                    <option value="system">{text[settings.language || 0].mode[0]}</option>
                    <option value="light">{text[settings.language || 0].mode[1]}</option>
                    <option value="dark">{text[settings.language || 0].mode[2]}</option>
                    {authState.status && <>
                        <option value="custom">{text[settings.language || 0].mode[3]}</option>
                        <option value="more...">{text[settings.language || 0].mode[4]}</option>
                    </>}
                </select>
            </div>
            <ThemeConstructor
                constructor={constructorRef}
                settings={settings}
                setSettings={setSettings}
            />
            <More more={moreRef} settings={settings} />
            <div style={{ height: "3rem" }} />
            <div className="container">
                <label>{text[settings.language || 0].settings[1]}</label>
                <select onChange={languageChange} value={languages[settings.language || 0]}>
                    <option value="en">english</option>
                    <option value="ru">русский</option>
                </select>
            </div>
            <div style={{ height: "5rem" }} />
            <a onClick={() => navigate("/")}>{text[settings.language || 0].back}</a>
        </motion.div>
    );
}

export default Settings;

import React, { useState, useRef, useContext } from 'react';
import { AuthContext } from './assets/AuthContext';
import axios from 'axios';
import text from './assets/json/text.json';
import lang from './assets/lang';
import paths from './assets/json/svg-paths.json';
import custom from './assets/json/custom.json';

function ThemeConstructor({ constructor, settings, setSettings }) {

    const [saveStatus, setSaveStatus] = useState(0);

    function generateTheme() {
        setLocalBg(`#${Math.random().toString(16).substring(2, 8)}`);
        setLocalFont(`#${Math.random().toString(16).substring(2, 8)}`);
    }

    const alertRef = useRef(null);

    const [localBg, setLocalBg] = useState("#2e5a97");
    const [localFont, setLocalFont] = useState("#f1f1f1");

    const { authState } = useContext(AuthContext);

    function applyTheme() {
        axios.put(
            "https://shinebulb-server-production-7e2b.up.railway.app/users/theme",
            { theme: 3, id: authState.id },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(() => {

            setSettings({ ...settings, theme: 3 });
            constructor.current.close();

            return axios.put(
                "https://shinebulb-server-production-7e2b.up.railway.app/users/lastTheme",
                { lastBg: localBg, lastFont: localFont, id: authState.id },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            )
        }).then(response => {

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

    function saveTheme() {
        axios.post(
            "https://shinebulb-server-production-7e2b.up.railway.app/savedthemes",
            { bg: localBg, font: localFont },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(response => {
            setSaveStatus(Number(response.data.status));
            alertRef.current.showModal();
            setTimeout(() => alertRef.current.close(), 1500);
        });
    }

    return (
        <dialog className="theme" ref={constructor}>
            <div className="themeHeader">
                <div>
                    <label>
                        {text[lang(settings)].customTheme[0]}<br />
                        <span>({text[lang(settings)].current}: {localBg})</span>
                    </label>
                    <input type="color" value={localBg} onChange={event => setLocalBg(event.target.value)} />
                </div>
                <div>
                    <label>
                        {text[lang(settings)].customTheme[1]}<br />
                        <span>({text[lang(settings)].current}: {localFont})</span>
                    </label>
                    <input type="color" value={localFont} onChange={event => setLocalFont(event.target.value)} />
                </div>
            </div>
            <hr/>
            <button className="modal-options" onClick={generateTheme}>
                <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d={paths.generate}/></svg>
                {text[lang(settings)].generateRandom}
            </button>
            <hr/>
            <div className="sample" style={{ backgroundColor: localBg, color: localFont }}>
                <p>{text[lang(settings)].sample}</p>
                <button
                    onClick={applyTheme}
                    style={{width: authState.status ? "25%" : "40%", backgroundColor: "transparent", border: `${localFont} 3px solid`}}
                    title={text[lang(settings)].themeControls[0]}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.apply} stroke={localFont} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                    onClick={() => constructor.current.close()}
                    style={{width: authState.status ? "25%" : "40%", backgroundColor: "transparent", border: `${localFont} 3px solid`}}
                    title={text[lang(settings)].themeControls[1]}
                >
                    <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="work-case" fill={localFont} transform="translate(91.520000, 91.520000)"><polygon id="Close" points={paths.cancel} /></g></g></svg>
                </button>
                {authState.status && <button
                    onClick={saveTheme}
                    style={{backgroundColor: "transparent", border: `${localFont} 3px solid`}}
                    title={text[lang(settings)].themeControls[2]}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.save} stroke={localFont} strokeWidth="2" strokeLinejoin="round"/></svg>
                </button>}
            </div>

            <dialog
                className="save-alert"
                ref={alertRef}
                style={{
                    backgroundColor: `var(--light-${saveStatus ? "green" : "red"})`,
                    color: `var(--dark-${saveStatus ? "green" : "red"})`
                }}>
                <div>
                    <p>{text[lang(settings)].savedStatus[saveStatus]}</p>
                    <button onClick={() => alertRef.current.close()}>
                        <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill={`var(--dark-${saveStatus ? "green" : "red"})`} fillRule="evenodd"><g id="work-case" transform="translate(91.520000, 91.520000)"><polygon id="Close" points={paths.cancel} /></g></g></svg>
                    </button>
                </div>
            </dialog>
        </dialog>
    );
}

export default ThemeConstructor;

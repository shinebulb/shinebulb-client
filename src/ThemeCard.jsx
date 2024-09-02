import React, { useRef, useContext } from 'react';
import { AuthContext } from './assets/AuthContext';
import axios from 'axios';
import paths from './assets/json/svg-paths.json';
import text from './assets/json/text.json';
import custom from './assets/json/custom.json';

function ThemeCard({ id, index, bg, font, title, savedList, setSavedList, settings, setSettings }) {

    const { authState } = useContext(AuthContext);

    const renameRef = useRef(null);
    const inputRef = useRef(null);
    const deleteRef = useRef(null);

    function renameTheme() {
        axios.put(
            "https://shinebulb-server-production-7e2b.up.railway.app/savedthemes/title",
            { title: inputRef.current.value, id: id },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(response => {
            setSavedList(savedList.map(theme => 
                theme.id === id ? { ...theme, title: response.data } : theme
            ));
            renameRef.current.close();
        });
    }

    function applyTheme() {
        axios.put(
            "https://shinebulb-server-production-7e2b.up.railway.app/users/theme",
            { theme: 3, id: authState.id },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(() => {

            setSettings({ ...settings, theme: 3 });

            return axios.put(
                "https://shinebulb-server-production-7e2b.up.railway.app/users/lastTheme",
                { lastBg: bg, lastFont: font, id: authState.id },
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

    function deleteTheme() {
        axios.delete(
            `https://shinebulb-server-production-7e2b.up.railway.app/savedthemes/${id}`,
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(response => {
            setSavedList(savedList.filter(theme => theme.id !== Number(response.data)));
            deleteRef.current.close();
        });
    }

    return (
        <div className="theme-card" style={{backgroundColor: bg}}>
            <p style={{color: font}}>{title || `${text[settings.language].themeCard[0]} #${index + 1}`}</p>
            <div className="saved-controls">
                <button
                    title={text[settings.language].themeCard[1]}
                    style={{
                        backgroundColor: bg,
                        border: `${font} 3px solid`
                    }}
                    onClick={() => renameRef.current.showModal()}
                >
                    <svg fill={font} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d={paths.rename[0]}/><path fillRule="evenodd" clipRule="evenodd" d={paths.rename[1]}/></svg>
                </button>
                <button
                    title={text[settings.language].themeCard[2]}
                    style={{
                        backgroundColor: bg,
                        border: `${font} 3px solid`
                    }}
                    onClick={applyTheme}
                >
                    <svg fill={font} version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve"><path className="bentblocks_een" d={paths.paint}/></svg>
                </button>
                <button
                    title={text[settings.language].themeCard[3]}
                    style={{
                        backgroundColor: bg,
                        border: `${font} 3px solid`
                    }}
                    onClick={() => deleteRef.current.showModal()}
                >
                    <svg fill={font} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.428 482.429" xmlSpace="preserve"><g><g><path d={paths.delete[0]}/><path d={paths.delete[1]}/><path d={paths.delete[2]}/><path d={paths.delete[3]}/></g></g></svg>
                </button>
                
                <dialog ref={renameRef} className="confirm">
                    <input type="text" ref={inputRef} placeholder={text[settings.language].savedDialogs[0]}/>
                    <button onClick={renameTheme}>{text[settings.language].themeControls[0]}</button>
                    <button onClick={() => renameRef.current.close()}>{text[settings.language].themeControls[1]}</button>
                </dialog>
                <dialog ref={deleteRef} className="confirm">
                    <p>{text[settings.language].savedDialogs[1]}</p>
                    <button onClick={deleteTheme}>{text[settings.language].confirm[1]}</button>
                    <button onClick={() => deleteRef.current.close()}>{text[settings.language].confirm[2]}</button>
                </dialog>
            </div>
        </div>
    )
}

export default ThemeCard
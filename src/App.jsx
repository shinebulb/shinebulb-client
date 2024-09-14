import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import Home from './Home';
import Play from './Play';
import Settings from './Settings';
import About from './About';
import Support from './Support';
import DevPage from './DevPage';
import SavedThemes from './SavedThemes';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Profile from './Profile';
import NoPage from './NoPage';
import themes from './assets/themes';
import defaultLang from './assets/defaultLang';
import text from './assets/json/text.json';

function App() {

    const [authState, setAuthState] = useState({ username: "", id: 0, status: false });
    const [settings, setSettings] = useState({
        bulbCount: 0,
        bulbStatus: "off",
        language: localStorage.getItem("language") === null ? defaultLang() : localStorage.getItem("language"),
        theme: parseInt(localStorage.getItem("theme")) || 0
    });
    const [savedList, setSavedList] = useState([]);

    const [loadApp, setLoadApp] = useState(true);

    useEffect(() => {
        themes[parseInt(localStorage.getItem("theme")) || 0]();
        let id = 0;
        axios.get(
            "https://shinebulb-server-production-7e2b.up.railway.app/users/auth",
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(response => {
            setAuthState(response.data.error ?
            { ...authState, status: false }
            : {
                username: response.data.username,
                id: response.data.id,
                status: true
            });
            if (!response.data.error) {
                id = response.data.id
            }
            else {
                setLoadApp(false);
            }
            return axios.get(
                `https://shinebulb-server-production-7e2b.up.railway.app/users/settings/${id}`,
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            );
        }).then(response => {
            if (!response.data.error) {
                setSettings({
                    bulbCount: response.data.bulbCount || 0,
                    bulbStatus: response.data.bulbStatus || "off",
                    language: response.data.language === null ? settings.language : response.data.language,
                    theme: response.data.theme === null ? settings.theme : response.data.theme
                });
                setLoadApp(false);
                themes[response.data.theme === null ? settings.theme : response.data.theme]();
                if ((response.data.bulbStatus === "on") && (bulb.current)) bulb.current.classList.add("on");
            }
        });
    }, []);
    
    const bulb = useRef(null);

    function logout() {
        document.body.classList.add('theme-transition');
        setTimeout(() => document.body.classList.remove('theme-transition'), 500);
        themes[parseInt(localStorage.getItem("theme")) || 0]();
        setAuthState({ username: "", id: 0, status: false });
        setSettings({
            bulbCount: 0,
            bulbStatus: "off",
            language: localStorage.getItem("language") === null ? defaultLang() : parseInt(localStorage.getItem("language")),
            theme: parseInt(localStorage.getItem("theme")) || 0
        });
        setSavedList([]);
        localStorage.removeItem("accessToken");
    }

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <BrowserRouter>
                {loadApp ? <span className="app-loader" />
                : <>
                    <div className="navbar">
                    <div className="navbar-links">
                        <Link to="/" style={{ marginLeft: "calc(var(--navbar-margin) * 2)" }}>{text[settings.language || 0 || 0].home}</Link>
                        {authState.status && <Link to={`/user/${authState.username}`} style={{ fontStyle: "italic", fontWeight: "normal" }}>{authState.username}</Link>}
                        <div className="auth-links">{!authState.status ?
                            <>
                                <Link to="/signup" style={{ marginRight: "var(--navbar-margin)" }}>{text[settings.language || 0 || 0].auth[1]}</Link>
                                <Link to="/login" style={{ marginRight: "calc(var(--navbar-margin) * 2)" }}>{text[settings.language || 0 || 0].auth[0]}</Link>
                            </>
                            : <Link to="/" onClick={logout} style={{ marginRight: "calc(var(--navbar-margin) * 2)" }}>{text[settings.language || 0 || 0].auth[2]}</Link>
                        }</div>
                    </div>
                    <hr />
                    </div>
                    <Routes>
                        <Route index element={<Home settings={settings} />} />
                        <Route path="/play" element={<Play bulb={bulb} settings={settings} setSettings={setSettings} />} />
                        <Route path="/settings" element={<Settings settings={settings} setSettings={setSettings} />} />
                        <Route path="/about" element={<About settings={settings} />} />
                        <Route path="/support" element={<Support settings={settings} />} />
                        <Route path="/development" element={<DevPage settings={settings} />} />
                        <Route path="/saved" element={<SavedThemes settings={settings} setSettings={setSettings} savedList={savedList} setSavedList={setSavedList} />} />
                        <Route path="/login" element={<LogIn bulb={bulb} settings={settings} setSettings={setSettings} setSavedList={setSavedList} />} />
                        <Route path="/signup" element={<SignUp settings={settings} />} />
                        <Route path="/user/:username" element={<Profile settings={settings} bulb={bulb} />} />
                        <Route path="*" element={<NoPage settings={settings} />} />
                    </Routes>
                </>}
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App

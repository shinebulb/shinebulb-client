import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import LoadingButton from './LoadingButton';
import axios from 'axios';
import themes from './assets/themes';
import defaultLang from './assets/defaultLang';
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import { motion } from 'framer-motion';

function LogIn({ bulb, settings, setSettings, setSavedList }) {

    const { authState, setAuthState } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = text[settings.language].auth[0];
    }, []);


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [fieldType, setFieldType] = useState("password");

    const [warningDisplay, setWaringDisplay] = useState(localStorage.getItem("warningDisplay") || "flex");

    const [errorText, setErrorText] = useState(0);
    const [loadLogIn, setLoadLogIn] = useState(false);

    const alertRef = useRef(null);

    function hideWarning(permanent) {
        if (permanent) localStorage.setItem("warningDisplay", "none");
        setWaringDisplay("none");
    }

    function login() {
        let id = 0;
        setLoadLogIn(true);
        axios.post("https://shinebulb-server-production-7e2b.up.railway.app/users/login", {
            username: username,
            password: password
        })
        .then(response => {
            if (response.data.error) {
                setLoadLogIn(false);
                setErrorText(Number(response.data.error));
                alertRef.current.showModal();
                setTimeout(() => alertRef.current.close(), 1500);
            }
            else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
                navigate("/");
                id = response.data.id;
                return axios.get(
                    `https://shinebulb-server-production-7e2b.up.railway.app/users/settings/${id}`,
                    { headers: { accessToken: response.data.token } }
                );
            }
        }).then(response => {
            if (!response.data.error) {
                setSettings({
                    bulbCount: response.data.bulbCount || 0,
                    bulbStatus: response.data.bulbStatus || "off",
                    language: response.data.language === null ? settings.language : response.data.language,
                    theme: response.data.theme === null ? settings.theme : response.data.theme
                });
                themes[response.data.theme === null ? settings.theme : response.data.theme]();
                if ((response.data.bulbStatus === "on") && (bulb.current)) bulb.current.classList.add("on");
                return axios.get(`https://shinebulb-server-production-7e2b.up.railway.app/savedthemes/byUser/${response.data.id}`);
            }
            else {
                themes[parseInt(localStorage.getItem("theme")) || 0]();
                setSettings({
                    bulbCount: 0,
                    bulbStatus: "off",
                    language: localStorage.getItem("language") === null ? defaultLang() : parseInt(localStorage.getItem("language")),
                    theme: parseInt(localStorage.getItem("theme")) || 0
                });
            }
        }).then(response => {
            if (response !== undefined) setSavedList(response.data);
        });
    }

    return (
        <motion.div
            className='auth'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            {!authState.status ?
            <>
                <h2 style={{width: "80vw"}}>{text[settings.language].login[0]}</h2>
                <div className="login-warning" style={{display: warningDisplay}}>
                    <p>{text[settings.language].logInWarning[0]}</p>
                    <div>
                        <button onClick={() => hideWarning(false)}>{text[settings.language].logInWarning[1]}</button>
                        <button onClick={() => hideWarning(true)}>{text[settings.language].logInWarning[2]}</button>
                    </div>
                </div>
                <div className="login-form">
                    <label>{text[settings.language].signup[1]}:</label>
                    <input
                        type="text"
                        onChange={event => setUsername(event.target.value)}
                        value={username}
                        placeholder={text[settings.language].login[1]}
                    />
                    <div>
                        <label style={{margin: "0"}}>{text[settings.language].signup[3]}:</label>
                        <svg onClick={() => setFieldType(fieldType === "password" ? "text" : "password")} fill={`var(--intermediate-${fieldType === "password" ? "green" : "red"})`} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d={paths.hide[0]}/><path d={paths.hide[1]}/></svg>
                    </div>
                    <input
                        type={fieldType}
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                        placeholder={text[settings.language].login[2]}
                    />
                    {loadLogIn ? <LoadingButton settings={settings} />
                    : <button type="submit" onClick={login}>{text[settings.language].auth[0]}</button>}
                </div>

                <dialog
                    className="save-alert"
                    ref={alertRef}
                    style={{
                        backgroundColor: "var(--light-red)",
                        color: "var(--dark-red)",
                        marginTop: "5rem"
                    }}
                >
                    <div>
                        <p>{text[settings.language].authNotifications[errorText]}</p>
                        <button onClick={() => alertRef.current.close()}>
                            <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill="var(--dark-red)" fillRule="evenodd"><g id="work-case" transform="translate(91.520000, 91.520000)"><polygon id="Close" points={paths.cancel} /></g></g></svg>
                        </button>
                    </div>
                </dialog>
            </>
            : <>
                <h2>{text[settings.language].authErrors[4]}</h2>
            </>}
        </motion.div>
    )
}

export default LogIn
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import axios from 'axios';
import { motion } from 'framer-motion';

function ChangePassword({ settings }) {

    useEffect(() => {
        document.title = text[settings.language].changePassword[0];
    }, []);

    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);

    const alertRef = useRef(null);
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [oldFieldType, setOldFieldType] = useState("password");
    const [newFieldType, setNewFieldType] = useState("password");

    const [errorText, setErrorText] = useState(0);
    const [loadLogIn, setLoadLogIn] = useState(false);

    function changePassword() {
        setLoadLogIn(true);
        axios.put(
            `${import.meta.env.VITE_API_KEY}/users/changepassword`,
            { oldPassword: oldPassword, newPassword: newPassword },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(response => {
            if (response.data.error) {
                setLoadLogIn(false);
                setErrorText(Number(response.data.error));
                alertRef.current.showModal();
                setTimeout(() => alertRef.current.close(), 1500);
            }
            else {
                navigate(`/user/${authState.username}`);
            }
        })
    }

    return (
        <motion.div
            className='auth'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <div style={{height: "3rem"}}/>
            <h2 style={{width: "80vw"}}>{text[settings.language].changePassword[1]}</h2>
            <div style={{height: "1rem"}}/>
            <div className="login-form">
                <div>
                    <label style={{margin: "0"}}>{text[settings.language].changePassword[2]}:</label>
                    <svg onClick={() => setOldFieldType(oldFieldType === "password" ? "text" : "password")} fill={`var(--intermediate-${oldFieldType === "password" ? "green" : "red"})`} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d={paths.hide[0]}/><path d={paths.hide[1]}/></svg>
                </div>
                <input
                    type={oldFieldType}
                    onChange={event => setOldPassword(event.target.value)}
                    value={oldPassword}
                    placeholder={text[settings.language].changePassword[3]}
                />
                <div>
                    <label style={{margin: "0"}}>{text[settings.language].changePassword[4]}:</label>
                    <svg onClick={() => setNewFieldType(newFieldType === "password" ? "text" : "password")} fill={`var(--intermediate-${newFieldType === "password" ? "green" : "red"})`} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d={paths.hide[0]}/><path d={paths.hide[1]}/></svg>
                </div>
                <input
                    type={newFieldType}
                    onChange={event => setNewPassword(event.target.value)}
                    value={newPassword}
                    placeholder={text[settings.language].changePassword[5]}
                />
                <button
                    type="submit"
                    onClick={changePassword}
                    disabled={loadLogIn}
                    style={{minWidth: "15rem", minHeight: "3rem"}}
                >{
                    loadLogIn ? <span className="loader" style={{ width: "1.6rem", height: "1.6rem" }} />
                    : text[settings.language].changePassword[0]
                }</button>
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
        </motion.div>
    );
}

export default ChangePassword
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import on from './assets/svg/on.svg';
import off from './assets/svg/off.svg';
import { motion } from 'framer-motion';

function Profile({ settings, bulb }) {
    
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    
    const [loadUser, setLoadUser] = useState(false);

    const [bgCopied, setBgCopied] = useState(false);
    const [fontCopied, setFontCopied] = useState(false);

    const copyModal = useRef(null);

    const { username } = useParams();
    
    useEffect(() => {
        setLoadUser(true);
        document.title = username;
        axios.get(`https://shinebulb-server-production-7e2b.up.railway.app/users/userinfo/${username}`)
        .then(response => {
            setUser(response.data);
            setLoadUser(false);
        });
    }, [username]);

    const userTheme = [
        ["transparent", "#f4f0e8", "#171717", user?.lastBg],
        ["var(--font)", "#232323", "#dcdcdc", user?.lastFont]
    ];

    const locales = ["en-us", "ru-ru"];
    
    return (
        <motion.div
            className='profile'
            style={{backgroundColor: (!loadUser && userTheme[0][user?.theme || 0]), border: (!loadUser && `${userTheme[1][user?.theme || 0]} 3px solid`)}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            {loadUser ? <span className="loader" style={{width: "5rem", height: "5rem", borderWidth: "7px", margin: "auto"}} />
            : <>{
                user === null ? navigate("/page-not-found")
                : <>
                    {user?.theme == 3 && <svg onClick={() => copyModal.current.showModal()} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><title>{text[settings.language].copyColors}</title><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d={paths.copy[0]} fill={userTheme[1][user?.theme || 0]}></path><path d={paths.copy[1]} fill={userTheme[1][user?.theme || 0]}></path></g></svg>}
                    <div className="play">
                        <img ref={bulb} className={user.bulbStatus} src={user.bulbStatus == "on" ? on : off} />
                    </div>
                    <div className="user-info">
                        <h1 style={{color: userTheme[1][user?.theme || 0]}}>{username}</h1>
                        <h2 className="joined" style={{color: userTheme[1][user?.theme || 0]}}>{
                            `${text[settings.language].joined} ${
                            new Date(user.createdAt)
                            .toLocaleDateString(locales[settings.language], {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })
                            .toLowerCase()
                        }`}</h2>
                        <h2 id="counter" style={{color: userTheme[1][user?.theme || 0]}}>
                            <span style={{fontWeight: "normal"}}>{text[settings.language].bulbCount}: </span>
                            <span style={{fontStyle: "italic"}}>{user.bulbCount || 0}</span>
                        </h2>
                    </div>
                </>
            }</>}
            <dialog ref={copyModal} className="copy-modal">
                <h2>{text[settings.language].pickCopyColors[0]}</h2>
                <hr />
                <div
                    className="copy-section"
                    style={{color: userTheme[1][user?.theme || 0]}}
                    onClick={() => {
                        navigator.clipboard.writeText(userTheme[0][user?.theme || 0])
                        .then(() => setBgCopied(true));
                    }}
                >
                    <div className="color-display" style={{backgroundColor: userTheme[0][user?.theme || 0]}}>
                        <span>{bgCopied ? "✓" : ""}</span>
                    </div>
                    <div>
                        <p style={{fontWeight: "bold"}}>{userTheme[0][user?.theme || 0]}</p>
                        <p style={{fontStyle: "italic"}}>{text[settings.language].pickCopyColors[1]}</p>
                    </div>
                </div>
                <hr />
                <div
                    className="copy-section"
                    style={{color: userTheme[0][user?.theme || 0]}}
                    onClick={() => {
                        navigator.clipboard.writeText(userTheme[1][user?.theme || 0])
                        .then(() => setFontCopied(true));
                    }}
                >
                    <div className="color-display" style={{backgroundColor: userTheme[1][user?.theme || 0]}}>
                        <span>{fontCopied ? "✓" : ""}</span>
                    </div>
                    <div>
                        <p style={{fontWeight: "bold"}}>{userTheme[1][user?.theme || 0]}</p>
                        <p style={{fontStyle: "italic"}}>{text[settings.language].pickCopyColors[2]}</p>
                    </div>
                </div>
                <hr />
                <div onClick={() => copyModal.current.close()} className="close-copy">{text[settings.language].close}</div>
            </dialog>
        </motion.div>
    )
}

export default Profile
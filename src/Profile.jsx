import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import text from './assets/json/text.json';
import on from './assets/svg/on.svg';
import off from './assets/svg/off.svg';
import { motion } from 'framer-motion';

function Profile({ settings, bulb }) {
    
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    
    const [loadUser, setLoadUser] = useState(false);

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
        ["transparent", "#f4f0e8", "#171717", user.lastBg],
        ["var(--font)", "#232323", "#dcdcdc", user.lastFont]
    ];

    const locales = ["en-us", "ru-ru"];
    
    return (
        <motion.div
            className='profile'
            style={{backgroundColor: (!loadUser && userTheme[0][user.theme || 0]), border: (!loadUser && `${userTheme[1][user.theme || 0]} 3px solid`)}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            {loadUser ? <span className="loader" style={{width: "5rem", height: "5rem", borderWidth: "7px"}} />
            : <>{
                user === null ? navigate("/page-not-found")
                : <>
                    <div className="play">
                        <img ref={bulb} className={user.bulbStatus} src={user.bulbStatus == "on" ? on : off} />
                    </div>
                    <div className="user-info">
                        <h1 style={{color: userTheme[1][user.theme || 0]}}>{username}</h1>
                        <h2 className="joined" style={{color: userTheme[1][user.theme || 0]}}>{
                            `${text[settings.language].joined} ${
                            new Date(user.createdAt)
                            .toLocaleDateString(locales[settings.language], {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })
                            .toLowerCase()
                        }`}</h2>
                        <h2 id="counter" style={{color: userTheme[1][user.theme || 0]}}>
                            <span style={{fontWeight: "normal"}}>bulb count: </span>
                            <span style={{fontStyle: "italic"}}>{user.bulbCount || 0}</span>
                        </h2>
                    </div>
                </>
            }</>}
        </motion.div>
    )
}

export default Profile
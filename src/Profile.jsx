import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function Profile({ settings }) {
    
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    
    const [loadUser, setLoadUser] = useState(false);

    useEffect(() => {
        setLoadUser(true);
        document.title = username;
        axios.get(`https://shinebulb-server-production-7e2b.up.railway.app/users/userinfo/${username}`)
        .then(response => {
            setUser(response.data);
            setLoadUser(false);
        });
    }, []);

    const { username } = useParams();

    const locales = ["en-us", "ru-ru"];
    
    return (
        <motion.div
            className='profile'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            {loadUser ? <span className="loader" style={{width: "5rem", height: "5rem", borderWidth: "7px"}} />
            : <>{
                user === null ? navigate("/page-not-found")
                : <>
                    <h2>{username}</h2>
                    <h2>{
                        `${text[settings.language].joined} ${
                        new Date(user.createdAt)
                        .toLocaleDateString(locales[settings.language], {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })
                        .toLowerCase()
                    }`}</h2>
                </>
            }</>}
        </motion.div>
    )
}

export default Profile
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function Profile({ settings }) {
    
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/users/userinfo/${username}`)
        .then(response => setUser(response.data));
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
            <h2>{username}</h2>
            <h2>{
                user === null ? navigate("/page-not-found")
                : `${text[settings.language || 0].joined} ${
                new Date(user.createdAt)
                .toLocaleDateString(locales[settings.language || 0], {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })
                .toLowerCase()
            }`}</h2>
        </motion.div>
    )
}

export default Profile
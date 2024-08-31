import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function Home({ settings }) {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "shinebulb"
    }, []);

    return (
        <motion.div
            className='home'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <div className="header">
                <p className="p2">shineb</p><img src="img/logo2.png"/><p className="p2">lb</p>
            </div>
            <div className="links">
                <a onClick={() => navigate("/play")}>{text[settings.language || 0].links[0]}</a>
                <a onClick={() => navigate("/settings")}>{text[settings.language || 0].links[1]}</a>
                <a onClick={() => navigate("/about")}>{text[settings.language || 0].links[2]}</a>
                <a onClick={() => navigate("/support")}>{text[settings.language || 0].links[3]}</a>
            </div>
            <a href="https://github.com/nurgalinchik/shinebulb" target="_blank" id="source">{text[settings.language || 0 || 0].source}</a>
        </motion.div>
    )
}

export default Home
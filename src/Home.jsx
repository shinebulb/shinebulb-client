import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultLang from './assets/defaultLang';
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
            <div className="server-down" style={{fontSize: "1.5rem", width: "90%", margin: "auto", color: "rgb(220, 220, 220)"}}>
            <img src="img/off.svg" style={{
                transform: "rotate(-5deg)",
                width: "256px"
            }} alt="the lightbulb" />
                <p>{text[localStorage.getItem("language") === null ? defaultLang() : parseInt(localStorage.getItem("language"))].serverDown}</p>
            </div>
            {/*<div className="header">
                <p className="p2">shineb</p><img src="img/u-bulb.png"/><p className="p2">lb</p>
            </div>
            <div className="links">
                <a onClick={() => navigate("/play")}>{text[settings.language].links[0]}</a>
                <a onClick={() => navigate("/settings")}>{text[settings.language].links[1]}</a>
                <a onClick={() => navigate("/about")}>{text[settings.language].links[2]}</a>
                <a onClick={() => navigate("/support")}>{text[settings.language].links[3]}</a>
            </div>
            <a onClick={() => navigate("/development")} id="source">{text[settings.language].links[8]}</a>*/}
        </motion.div>
    )
}

export default Home
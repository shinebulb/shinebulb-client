import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import text from './assets/json/text.json';
import lang from './assets/lang';
import { motion } from 'framer-motion';

function Support({ settings }) {

    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = text[lang(settings)].links[3];
    }, []);

    return (
        <motion.div
            className='support'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <a className="donate-button" href="https://nowpayments.io/donation?api_key=YT62CT1-1NG4AQ3-HARDAGH-5VMQT4A" target="_blank" rel="noreferrer noopener">
                <span>{text[lang(settings)].donate}</span>
                <img src="img/donate.svg"/>
            </a>
            <div style={{height: "1rem"}}/>
            <a onClick={() => navigate("/")}>{text[lang(settings)].back}</a>
        </motion.div>
    )
}

export default Support
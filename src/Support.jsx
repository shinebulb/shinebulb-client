import React from 'react';
import { useNavigate } from 'react-router-dom';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function Support({ settings }) {

    const navigate = useNavigate();

    return (
        <motion.div
            className='support'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <a className="donate-button" href="https://nowpayments.io/donation?api_key=YT62CT1-1NG4AQ3-HARDAGH-5VMQT4A" target="_blank" rel="noreferrer noopener">
                <span>{text[settings.language || 0].donate}</span>
                <img src="img/donate.svg"/>
            </a>
            <div style={{height: "1rem"}}/>
            <a onClick={() => navigate("/")}>{text[settings.language || 0].back}</a>
        </motion.div>
    )
}

export default Support
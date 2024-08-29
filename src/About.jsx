import React from 'react';
import { useNavigate } from 'react-router-dom';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function About({ settings }) {
    
    const navigate = useNavigate();

    return (
        <motion.div
            className='about'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>{text[settings.language || 0].headings[2]}</h2>
            <p className="p1">{text[settings.language || 0].about[0]}</p>
            <div style={{height: "1rem"}} />
            <div className="about-content">
                <p className="p1">{text[settings.language || 0].about[1]}</p>
                <p className="p1">{text[settings.language || 0].about[2]}</p>
                <p className="p1">{text[settings.language || 0].about[3]}</p>
                <p className="p1">{text[settings.language || 0].about[4]}</p>
                <p className="p1">{text[settings.language || 0].about[5]}</p>
                <p className="p1">{text[settings.language || 0].about[6]}</p>
            </div>
            <div style={{height: "1rem"}} />
            <div className="links">
                <a href = "mailto:shinebulby@gmail.com?subject=contact">{text[settings.language || 0].contact}</a>
                <a onClick={() => navigate("/")}>{text[settings.language || 0].back}</a>
            </div>
        </motion.div>
    )
}

export default About
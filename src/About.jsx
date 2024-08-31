import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import text from './assets/json/text.json';
import lang from './assets/lang';
import { motion } from 'framer-motion';

function About({ settings }) {
    
    const navigate = useNavigate();

    useEffect(() => {
        document.title = text[lang(settings)].links[2];
    }, []);

    return (
        <motion.div
            className='about'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>{text[lang(settings)].headings[2]}</h2>
            <p className="p1">{text[lang(settings)].about[0]}</p>
            <div style={{height: "1rem"}} />
            <div className="about-content">
                <p className="p1">{text[lang(settings)].about[1]}</p>
                <p className="p1">{text[lang(settings)].about[2]}</p>
                <p className="p1">{text[lang(settings)].about[3]}</p>
                <p className="p1">{text[lang(settings)].about[4]}</p>
                <p className="p1">{text[lang(settings)].about[5]}</p>
                <p className="p1">{text[lang(settings)].about[6]}</p>
            </div>
            <div style={{height: "1rem"}} />
            <div className="links">
                <a href = "mailto:shinebulby@gmail.com?subject=contact">{text[lang(settings)].contact}</a>
                <a onClick={() => navigate("/")}>{text[lang(settings)].back}</a>
            </div>
        </motion.div>
    )
}

export default About
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import text from './assets/json/text.json';
import version from './assets/json/version.json';
import { motion } from 'framer-motion';

function DevPage({ settings }) {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = text[settings.language].links[8];
    }, []);

    return (
        <motion.div
            className='devpage'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <p className="p3" style={{fontSize: "1.3rem"}}>{text[settings.language].version}: {version}</p>
            <p className="p3" style={{margin: "1rem 0", fontWeight: "bold"}}>{text[settings.language].devSides[0]}</p>
            <a target="_blank" href="https://github.com/shinebulb/shinebulb">
                shinebulb-2 {text[settings.language].devSides[1]}
            </a>
            <a target="_blank" href="https://github.com/shinebulb/shinebulb-client">
                shinebulb-3 {text[settings.language].devSides[2]}
            </a>
            <a target="_blank" href="https://github.com/shinebulb/shinebulb-server">
                shinebulb-3 {text[settings.language].devSides[3]}
            </a>
            <div style={{height: "2rem"}}/>
            <a onClick={() => navigate("/")} style={{fontWeight: "bold", textDecoration: "none"}}>{text[settings.language].back}</a>
        </motion.div>
    )
}

export default DevPage
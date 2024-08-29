import React from 'react';
import { useNavigate } from 'react-router-dom';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function NoPage({ settings }) {

    const navigate = useNavigate();
    
    return (
        <motion.div
            className='no-page'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <div className="no-page-text">
                <div>
                    <p style={{fontWeight: "bold"}}>
                        {text[settings.language || 0].pageNotFound[0]}
                    </p>
                    <p style={{fontSize: "1.1rem", fontStyle: "italic", margin: "0.5rem 0"}}>
                        {text[settings.language || 0].pageNotFound[1]}
                    </p>
                    <div className="no-page-links">
                        <a onClick={() => navigate("/")}>{text[settings.language || 0].home}</a>
                        <a onClick={() => navigate("/play")}>{text[settings.language || 0].links[0].toLowerCase()}</a>
                        <a onClick={() => navigate("/settings")}>{text[settings.language || 0].links[1]}</a>
                        <a onClick={() => navigate("/about")}>{text[settings.language || 0].links[2]}</a>
                        <a onClick={() => navigate("/support")}>{text[settings.language || 0].links[3]}</a>
                    </div>
                </div>
                <img title="sauron" src="https://i.pinimg.com/originals/20/bc/ac/20bcacc9571e85a27bef9cbfad961b4a.png" />
            </div>
        </motion.div>
    )
}

export default NoPage
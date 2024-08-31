import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import text from './assets/json/text.json';
import lang from './assets/lang';
import { motion } from 'framer-motion';
import NoThemes from './NoThemes';
import ThemeCard from './ThemeCard';
import LogInToView from './LogInToView';

function SavedThemes({ settings, setSettings, savedList, setSavedList }) {

    const { authState } = useContext(AuthContext);

    useEffect(() => {
        document.title = text[lang(settings.language)].links[5];
    }, []);


    const navigate = useNavigate();
    
    return (
        <motion.div
            className='saved'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >{!authState.status ? <LogInToView settings={settings} />
            : <>
                
                <h2 style={{fontSize: "1.7rem", marginTop: "6rem"}}>{text[lang(settings.language)].savedThemes[0]}</h2>
                <h3 style={{color: "var(--font)", fontStyle: "italic"}}>
                    {savedList.length} {text[lang(settings.language)].savedThemes[1]}
                </h3>
                <div style={{height: "0.1rem"}}/>
                {savedList.length > 0
                ? <div className="saved-display">{
                    savedList.map((theme, index) => 
                        <ThemeCard
                            key={index}
                            id={theme.id}
                            index={index}
                            bg={theme.bg}
                            font={theme.font}
                            title={theme.title}
                            savedList={savedList}
                            setSavedList={setSavedList}
                            settings={settings}
                            setSettings={setSettings}
                        />
                    )
                }</div>
                : <NoThemes settings={settings} />}
                <div style={{height: "1rem"}}/>
                <a onClick={() => navigate("/settings")}>{text[lang(settings.language)].back}</a>
                <div style={{height: "2rem"}} />
            </>
        }</motion.div>
    )
}

export default SavedThemes
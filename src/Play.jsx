import React, { useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import axios from 'axios';
import text from './assets/json/text.json';
import lang from './assets/lang';
import { motion } from 'framer-motion';

function Play({ bulb, settings, setSettings }) {

    const { authState } = useContext(AuthContext);

    useEffect(() => {
        document.title = text[lang(settings.language)].links[0].toLowerCase();
        if (bulb.current) bulb.current.classList.toggle("on");
    }, []);

    const bulbStates = ["off", "on"];

    const navigate = useNavigate();

    const modal = useRef(null);

    function updateCount() {
        if (authState.status) {
            axios.all([
                axios.put(
                    "https://shinebulb-server-production-7e2b.up.railway.app/users/count",
                    { count: settings.bulbCount + Number(!bulbStates.indexOf(settings.bulbStatus)), id: authState.id },
                    { headers: { accessToken: localStorage.getItem("accessToken") } }
                ),
                axios.put(
                    "https://shinebulb-server-production-7e2b.up.railway.app/users/bulb",
                    { status: Number(!bulbStates.indexOf(settings.bulbStatus)) ? "on" : "off", id: authState.id },
                    { headers: { accessToken: localStorage.getItem("accessToken") } }
                )
            ]).then(axios.spread((count, status) => {
                setSettings({
                    ...settings,
                    bulbCount: count.data,
                    bulbStatus: status.data
                });
                new Audio(`audio/${status.data}.mp3`).play();
                bulb.current.classList.toggle("on");
            }));
        }
        else {
            setSettings({
                ...settings,
                bulbCount: settings.bulbStatus === "off" ? settings.bulbCount + 1 : settings.bulbCount,
                bulbStatus: settings.bulbStatus === "off" ? "on" : "off"
            });
            new Audio(`audio/${settings.bulbStatus === "off" ? "on" : "off"}.mp3`).play();
            bulb.current.classList.toggle("on");
        }
    }

    function resetCount() {
        if (authState.status) {
            axios.all([
                axios.put(
                    "https://shinebulb-server-production-7e2b.up.railway.app/users/count",
                    { count: 0, id: authState.id },
                    { headers: { accessToken: localStorage.getItem("accessToken") } }
                ),
                axios.put(
                    "https://shinebulb-server-production-7e2b.up.railway.app/users/bulb",
                    { status: "off", id: authState.id },
                    { headers: { accessToken: localStorage.getItem("accessToken") } }
                )
            ]).then(axios.spread((count, status) => {
                setSettings({
                    ...settings,
                    bulbCount: count.data,
                    bulbStatus: status.data
                });
                new Audio("audio/off.mp3").play();
                bulb.current.classList.remove("on");
                modal.current.close();
            }));
        }
        else {
            setSettings({
                ...settings,
                bulbCount: 0,
                bulbStatus: "off"
            });
            new Audio(`audio/off.mp3`).play();
            bulb.current.classList.remove("on");
            modal.current.close();
        }
    }

    return (
        <motion.div 
            className="play"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>{text[lang(settings.language)].headings[0]}</h2>
            <p className="p1" id="text">{text[lang(settings.language)].text[bulbStates.indexOf(settings.bulbStatus)]}</p>
            <label htmlFor="switch">
                <img ref={bulb} src={`img/${settings.bulbStatus}.svg`} alt="the lightbulb" />
            </label>
            <div className="controls">
                <button onClick={updateCount} id="switch">{text[lang(settings.language)].controls[0]}</button>
                <button onClick={() => modal.current.showModal()}>{text[lang(settings.language)].controls[1]}</button>
            </div>
            <dialog ref={modal} className="confirm">
                <p>{text[lang(settings.language)].confirm[0]}</p>
                <button onClick={resetCount}>{text[lang(settings.language)].confirm[1]}</button>
                <button onClick={() => modal.current.close()}>{text[lang(settings.language)].confirm[2]}</button>
            </dialog>
            <h2 id="counter">{settings.bulbCount || 0}</h2>
            <a onClick={() => navigate("/")}>{text[lang(settings.language)].back}</a>
        </motion.div>
    )
}

export default Play

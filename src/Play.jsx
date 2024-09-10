import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import axios from 'axios';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function Play({ bulb, settings, setSettings }) {

    const { authState } = useContext(AuthContext);

    const [loadSwitch, setLoadSwitch] = useState(false);
    const [loadReset, setLoadReset] = useState(false);

    useEffect(() => {
        document.title = text[settings.language].links[0].toLowerCase();
        if ((settings.bulbStatus === "on") && (bulb.current)) bulb.current.classList.add("on");
    }, []);

    const bulbStates = ["off", "on"];

    const navigate = useNavigate();

    const modal = useRef(null);

    function updateCount() {
        if (authState.status) {
            setLoadSwitch(true);
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
                setLoadSwitch(false);
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
            setLoadReset(true);
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
                setLoadReset(false);
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
            <h2>{text[settings.language].headings[0]}</h2>
            <p className="p1" id="text">{text[settings.language].text[bulbStates.indexOf(settings.bulbStatus)]}</p>
            <label htmlFor="switch">
                <img ref={bulb} src={`img/${settings.bulbStatus}.svg`} alt="the lightbulb" />
            </label>
            <div className="controls">
                <button onClick={updateCount} disabled={loadSwitch} id="switch">{
                    loadSwitch ? <span className="loader" style={{ width: "1rem", height: "1rem" }} />
                    : text[settings.language].controls[0]
                }</button>
                <button onClick={() => modal.current.showModal()}>{text[settings.language].controls[1]}</button>
            </div>
            <dialog ref={modal} className="confirm">
                <p>{text[settings.language].confirm[0]}</p>
                <button onClick={resetCount} disabled={loadReset}>{
                    loadReset ? <span className="loader" style={{ width: "1rem", height: "1rem" }} />
                    : text[settings.language].confirm[1]
                }</button>
                <button onClick={() => modal.current.close()}>{text[settings.language].confirm[2]}</button>
            </dialog>
            <h2 id="counter">{settings.bulbCount || 0}</h2>
            <a onClick={() => navigate("/")}>{text[settings.language].back}</a>
        </motion.div>
    )
}

export default Play

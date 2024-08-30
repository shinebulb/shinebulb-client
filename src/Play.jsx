import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import axios from 'axios';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function Play({ bulb, settings, setSettings }) {

    const { authState } = useContext(AuthContext);

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
            <h2>{text[settings.language || 0].headings[0]}</h2>
            <p className="p1" id="text">{text[settings.language || 0].text[bulbStates.indexOf(settings.bulbStatus)]}</p>
            <label htmlFor="switch">
                <img ref={bulb} src={`img/${settings.bulbStatus}.svg`} alt="the lightbulb" />
            </label>
            <div className="controls">
                <button onClick={updateCount} id="switch">{text[settings.language || 0].controls[0]}</button>
                <button onClick={() => modal.current.showModal()}>{text[settings.language || 0].controls[1]}</button>
            </div>
            <dialog ref={modal} className="confirm">
                <p>{text[settings.language || 0].confirm[0]}</p>
                <button onClick={resetCount}>{text[settings.language || 0].confirm[1]}</button>
                <button onClick={() => modal.current.close()}>{text[settings.language || 0].confirm[2]}</button>
            </dialog>
            <h2 id="counter">{settings.bulbCount || 0}</h2>
            <a onClick={() => navigate("/")}>{text[settings.language || 0].back}</a>
        </motion.div>
    )
}

export default Play

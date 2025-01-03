import React, { useState } from 'react';
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import { motion } from 'framer-motion';

function ChangePassword({ settings }) {

    // add multi-lingo
    // add document.title
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [oldFieldType, setOldFieldType] = useState("password");
    const [newFieldType, setNewFieldType] = useState("password");

    const [loadLogIn, setLoadLogIn] = useState(false);

    return (
        <motion.div
            className='auth'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <div style={{height: "3rem"}}/>
            <h2 style={{width: "80vw"}}>change your password!</h2>
            <div className="login-form">
                <div>
                    <label style={{margin: "0"}}>old password:</label>
                    <svg onClick={() => setOldFieldType(oldFieldType === "password" ? "text" : "password")} fill={`var(--intermediate-${oldFieldType === "password" ? "green" : "red"})`} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d={paths.hide[0]}/><path d={paths.hide[1]}/></svg>
                </div>
                <input
                    type={oldFieldType}
                    onChange={event => setOldPassword(event.target.value)}
                    value={oldPassword}
                    placeholder="enter old password..."
                />
                <div>
                    <label style={{margin: "0"}}>new password:</label>
                    <svg onClick={() => setNewFieldType(newFieldType === "password" ? "text" : "password")} fill={`var(--intermediate-${newFieldType === "password" ? "green" : "red"})`} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d={paths.hide[0]}/><path d={paths.hide[1]}/></svg>
                </div>
                <input
                    type={newFieldType}
                    onChange={event => setNewPassword(event.target.value)}
                    value={newPassword}
                    placeholder="enter new password..."
                />
                <button type="submit" disabled={loadLogIn}>{
                    loadLogIn ? <span className="loader" style={{ width: "1.6rem", height: "1.6rem" }} />
                    : "change password"
                }</button>
            </div>
        </motion.div>
    );
}

export default ChangePassword
import React from 'react';
import { useNavigate } from 'react-router-dom';
import text from './assets/json/text.json';

function LogInToView({ settings }) {

    const navigate = useNavigate();

    return (
        <div className="log-in-to-view">
            <p>{text[settings.language].logInToView}</p>
            <button onClick={() => navigate("/login")}>{text[settings.language].auth[0]}</button>
            <button onClick={() => navigate("/signup")}>{text[settings.language].auth[1]}</button>
        </div>
    )
}

export default LogInToView
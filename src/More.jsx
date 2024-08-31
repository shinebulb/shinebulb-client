import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import axios from 'axios';
import paths from './assets/json/svg-paths.json';
import text from './assets/json/text.json';
import lang from './assets/lang';

function More({ more, settings }) {

    const { authState } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <dialog className="more" ref={more}>
            <div className="options">
                <div onClick={() => {
                    more.current.close();
                    navigate("/saved");
                }}>
                    <p>
                        <svg id="saved-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.save} strokeWidth="2" strokeLinejoin="round"/></svg>
                        {text[lang(settings)].saved}
                    </p>
                    <span>{text[lang(settings)].optionDescriptions[0]}</span>
                </div>
                <hr />
                <button onClick={() => more.current.close()}>{text[lang(settings)].back}</button>
            </div>
        </dialog>
    )
}

export default More
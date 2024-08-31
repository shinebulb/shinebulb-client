import React from 'react';
import text from './assets/json/text.json';
import lang from './assets/lang';

function NoThemes({ settings }) {

    const images = ["desert", "waterfall", "cave", "hills", "city"];

    return (
        <div className="no-themes">
            <img src={
                Math.floor(Math.random() * 100) === 52
                ? "img/no themes/waltuh.png"
                : `img/no themes/${images[Math.floor(Math.random() * images.length)]}.svg`
            }
            />
            <p>{text[lang(settings)].noThemes}</p>
        </div>
    )
}

export default NoThemes
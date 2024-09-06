import React from 'react';
import text from './assets/json/text.json'

function LoadingButton({ settings }) {
  return (
    <div className="loading-button">
        <span class="loader"></span>
        <p>{text[settings.language].loggingIn}</p>
    </div>
  )
}

export default LoadingButton
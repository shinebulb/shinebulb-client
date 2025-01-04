import defaultLang from './assets/defaultLang';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function ServerDown() {
  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
        className="server-down"
        style={{fontSize: "1.5rem", width: "90%", margin: "auto", color: "rgb(220, 220, 220)"}}
    >
        <img src="img/off.svg" style={{
            transform: "rotate(-5deg)",
            width: "256px"
        }} alt="the lightbulb" />
        <p>{text[localStorage.getItem("language") === null ? defaultLang() : parseInt(localStorage.getItem("language"))].serverDown}</p>
    </motion.div>
  )
}

export default ServerDown

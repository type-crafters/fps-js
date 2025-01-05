import { useEffect, useState } from "react";
import styles from "./gui/styles/App.module.css"

export default function App() {
    const [modifying, setModifying] = useState(false);
    const [binding, setBinding] = useState("W");

    const changeKeyBind = () => {
        setModifying(true);
        setTimeout(() => {
            setModifying(false);
            return;
        }, 5000);
    }

    const getKeyboardInput = (event) => {
        const key = event.key;
        setBinding(key);
        setModifying(false);
    }

    const getMouseInput = (event) => {
        const mouseButtons = {
            "0": "LMB",
            "1": "WHEEL",
            "2": "RMB",
            "3": "M4",
            "4": "M5"
        }
        const button = String(event.button);
        setBinding(mouseButtons[button] || "UNDEFINED");
        setModifying(false);
    }

    useEffect(() => {
        if(modifying) {
            window.addEventListener("keydown", getKeyboardInput);
            window.addEventListener("mousedown", getMouseInput);
        } else {
            window.removeEventListener("keydown", getKeyboardInput);
            window.removeEventListener("mousedown", getMouseInput);
        }
    }, [modifying]);

    return (
        <main className={styles.main}>
            <div className={styles.keyBindWrapper}>
                <div className={styles.actionWrapper}>
                    MOVE FORWARD
                </div>
                <button
                    className={styles.bindingWrapper}
                    onClick={changeKeyBind}
                    onContextMenu={(event) => { event.preventDefault(); }}
                >
                    <kbd className={modifying ? styles.listening : styles.key}>
                        {binding}
                    </kbd>
                </button>
            </div>
        </main>
    );
}
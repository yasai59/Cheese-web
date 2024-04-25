import React, { useState } from "react";
import axios from "axios"; // Importa Axios

export const LinkButton = ({ link, app }) => {
    const [text, setText] = useState(""); 
    const [originalText, setOriginalText] = useState(""); // Guarda el texto original

    const handleChange = (event) => {
        setText(event.target.value); 
    };

    const handleSaveChanges = () => {
        // axios.post("/api/update-link-text", { text })
        //     .then(response => {
        //         console.log("Texto guardado:", text);
        //         setOriginalText(text); 
        //     })
        //     .catch(error => {
        //         console.error("Error al guardar el texto:", error);
        //     });
    };

    const hasChanges = text !== originalText;

    return (
        <div className="rounded-md p-2 text-white bg-base h-full">
            <div className="flex items-center gap-4">
                <div id="div-img" className="px-2 border-r-2 border-base-light">
                    <img src={`../../../../../assets/${app}.png`} alt={app} className="h-8 w-8 inline-block" />
                </div>
                <div id="div-text">
                    <input
                        type="text"
                        value={text}
                        onChange={handleChange}
                        placeholder="Enter link text" 
                        className="outline-none bg-transparent border-none text-base font-medium text-white"
                    />
                </div>
                {hasChanges && <button onClick={handleSaveChanges} className="text-primary rounded-md">Guardar</button>}
            </div>
        </div>
    );
}

import React, { useState } from "react";
import axios from "axios"; // Importa Axios

export const LinkButton = ({ src, originalText, onSave }) => {
    const [text, setText] = useState(originalText || ""); 

    const handleChange = (event) => {
        setText(event.target.value); 
    };

    const handleSaveChanges = () => {
        onSave(text);
    };

    const hasChanges = text !== originalText;

    return (
        <div className="rounded-md py-2 text-white bg-base h-full">
            <div className="flex items-center gap-4">
                <div id="div-img" className="px-2 border-r-2 border-base-light">
                    <img src={`../../../../../assets/${src}.png`} alt={src} className="h-8 w-8 inline-block" />
                </div>
                <div id="div-text">
                    <input
                        type="text"
                        value={text}
                        onChange={handleChange}
                        placeholder="Enter link text" 
                        className="outline-none bg-transparent border-none text-base font-sm text-white"
                    />
                </div>
                {hasChanges && <button onClick={handleSaveChanges} className="text-primary rounded-md">Save</button>}
            </div>
        </div>
    );
}

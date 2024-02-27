import React from "react";

export const Checkbox = ({id, name="", onChange = () => {}, value, setValue}) => {
    return <>
        <input 
            type="checkbox" 
            id={id} 
            name={name} 
            className="w-7 h-7 rounded-md filter border-base-light dark:border-base-light"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </>
}

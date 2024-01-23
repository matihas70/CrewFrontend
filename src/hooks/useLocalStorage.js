import { useState } from "react";

function useLocalSotrage(){
    //const [value, setValue] = useState(null)
    const setItem = (key, value) => {
        localStorage.setItem(key, value);
        //setValue(value)
    }
    const getItem = (key) => {
        return localStorage.getItem(key)
    }
    const removeItem = (key) => {
        localStorage.removeItem(key);
        //setValue(null)
    }
    return {setItem, getItem, removeItem};
};
export default useLocalSotrage;
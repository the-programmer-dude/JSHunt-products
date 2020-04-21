import React, { useState, useEffect } from 'react'
import keys from '../../json/storageKeys.json'

import './style.css'

export default function Header() {
    const html = document.querySelector('html')

    const [ currentText, setText ] = useState('Light mode')
    const [ checked, setChecked ] = useState(false)

    const lightMode = {
        backgroundContainers: '#fff', 
        descColor: '#999999', 
        borderAndforeground: '#1785a3', 
        headerBackground: '#1785a3', 
        background: '#fff', 
        containerH1foreground: '#000000', 
        containerHover: '#fff',
        nextpreviousBackground: '#1785a3', 
        nextpreviousForeground: '#fff', 
        border: "#fff"
    }

    const darkMode = {
        backgroundContainers: '#333', 
        descColor: '#fff', 
        borderAndforeground: '#fff', 
        headerBackground: '#333', 
        background: '#1f1d1d', 
        containerH1foreground: '#fff', 
        containerHover: '#000',
        nextpreviousBackground: '#fff', 
        nextpreviousForeground: '#000', 
        border: '#000'
    }

    useEffect(() => {
        if(localStorage.getItem(keys["darkModeKey"])){
            const jsonStorage = JSON.parse(localStorage.getItem(keys["darkModeKey"]))
            changeStyle(jsonStorage)

            if(jsonStorage.backgroundContainers === '#fff') {
                setText('Light mode')
                setChecked(false)
            }else{
                setText('Dark mode')
                setChecked(true)
            }
        }
    }, [])

    const formatKey = (key) => `--${key.replace(/([A-Z])/, '-$1').toLowerCase()}`

    function changeStyle(style) {
        let prop = style

        if(localStorage.getItem(keys["darkModeKey"])) prop = JSON.parse(localStorage.getItem(keys["darkModeKey"]))
        Object.keys(style).map(key => html.style.setProperty(formatKey(key), prop[key]))
    }
    

    function handleInputChange(e) {
        if(e.target.checked)  {
            localStorage.setItem(keys["darkModeKey"], JSON.stringify(darkMode))
            setText('Dark mode')
            changeStyle(darkMode)
        } else {
            localStorage.setItem(keys["darkModeKey"], JSON.stringify(lightMode))
            setText('Light mode')
            changeStyle(lightMode)
        }
    }

    return (
        <header id="main-header">
            JSHunt
            <input type="checkbox" className="option-input checkbox" checked={checked} onChange={e => { setChecked(e.target.checked); handleInputChange(e)}} name="inpt"/>
            <label htmlFor="inpt">{currentText}</label>
        </header>
    )
}

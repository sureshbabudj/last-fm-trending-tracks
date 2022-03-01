import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface ToggleProps {
    checked: boolean;
    onChange: (e: boolean) => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
    const toggleSwitch = useRef<HTMLInputElement>(null);

    function handleChange() {
        if (toggleSwitch.current) {
            let checked = toggleSwitch.current.checked;
            toggleSwitch.current.checked = !checked;
            onChange(!checked);
        }
    }

    useEffect(() => {
        if (toggleSwitch.current) toggleSwitch.current.checked = checked;
    }, [checked]);

    return <div className="toggle" onClick={handleChange}>
        <input type="checkbox" name="themeSwitchCheck" ref={toggleSwitch} />
        <span className="checked"></span>
    </div >
}

function Theme() {
    const [checked, setChecked] = useState(false);

    function switchTheme(checked: boolean) {
        const theme = checked ? "dark" : "light";
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        setChecked(theme === 'dark' ? true : false);
    }

    function load() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark')
                setChecked(true)
        }
    }

    useEffect(() => {
        load();
    }, [])

    return <div className="theme-switch">
        <label htmlFor="themeSwitchCheck">Dark Mode</label>
        <Toggle onChange={switchTheme} checked={checked} />
    </div>
}

export default Theme;
import { useEffect, useRef } from "react";

function ThemeMenu({ handleSetTheme, closeMenu }) {
    const myRef = useRef();

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target) && !e.target.classList.contains("theme-button")) {
            closeMenu();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function themeOptionSelected(theme) {
        handleSetTheme(theme);
        closeMenu();
    }

    return (
        <div className="theme-menu" ref={myRef}>
            <button className="theme-menu__theme-button" onClick={() => themeOptionSelected("os-default")}>
            <span className="icon icon-theme-os-default" />OS Default
            </button>
            <button className="theme-menu__theme-button" onClick={() => themeOptionSelected("light")}>
            <span className="icon icon-theme-light" />Light
            </button>
            <button className="theme-menu__theme-button" onClick={() => themeOptionSelected("dark")}>
            <span className="icon icon-theme-dark" />Dark
            </button>
        </div>
    )
}

export default ThemeMenu;

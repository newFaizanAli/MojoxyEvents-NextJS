"use client";
import { useState } from "react";
import Icon from "./Icon";
import { Button } from "../ui";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    large?: boolean;
}

const SearchBar = ({ placeholder = "Search artists, genres, locations...", onSearch, large = false }: SearchBarProps) => {
    const [val, setVal] = useState("");
    const [focused, setFocused] = useState(false);



    return (
        <div className={`
    flex items-center gap-3
    bg-white rounded-full
    transition-all duration-200
    ${large ? "py-3.5 px-5" : "py-1.5 px-3"}
    `} style={{
                border: focused ? "2px solid var(--primary)" : "2px solid var(--gray-200)",
                boxShadow: focused ? "var(--shadow-primary)" : "var(--shadow-md)",
            }}>
            <Icon name="search" size={large ? 20 : 17} color={focused ? "var(--primary)" : "var(--gray-400)"} />
            <input
                value={val} onChange={e => setVal(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                placeholder={placeholder}
                style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    background: "transparent",
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    fontSize: large ? 16 : 14,
                    color: "var(--gray-900)",
                    flex: 1,
                }}
                onKeyDown={e => e.key === "Enter" && onSearch?.(val)}
            />
            {val && <button onClick={() => setVal("")} style={{ background: "var(--gray-100)", border: "none", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Icon name="x" size={12} /></button>}
            {large && <Button size="sm" onClick={() => onSearch?.(val)}>Search</Button>}
        </div>
    );
};

export default SearchBar;

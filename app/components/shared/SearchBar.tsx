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
        <div style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "var(--white)", borderRadius: "var(--radius-full)",
            border: focused ? "2px solid var(--primary)" : "2px solid var(--gray-200)",
            boxShadow: focused ? "var(--shadow-primary)" : "var(--shadow-md)",
            padding: large ? "14px 20px" : "10px 16px",
            transition: "all 0.2s",
        }}>
            <Icon name="search" size={large ? 20 : 17} color={focused ? "var(--primary)" : "var(--gray-400)"} />
            <input
                value={val} onChange={e => setVal(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                placeholder={placeholder}
                style={{ border: "none", outline: "none", fontSize: large ? 16 : 14, color: "var(--gray-900)", background: "transparent", flex: 1 }}
                onKeyDown={e => e.key === "Enter" && onSearch?.(val)}
            />
            {val && <button onClick={() => setVal("")} style={{ background: "var(--gray-100)", border: "none", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Icon name="x" size={12} /></button>}
            {large && <Button size="sm" onClick={() => onSearch?.(val)}>Search</Button>}
        </div>
    );
};

export default SearchBar;

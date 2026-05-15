"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "../shared";
import { IconName } from "@/app/types";

interface Option {
    label: string;
    value: string;
}

interface SearchableSelectProps {
    label?: string;
    placeholder?: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;

    // optional icon
    icon?: IconName;
}

const SearchableSelect = ({
    label,
    placeholder = "Search...",
    options,
    value,
    onChange,
    error,
    required,
    icon,
}: SearchableSelectProps) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    // debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter((item) =>
        item.label.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const selectedLabel =
        options.find((item) => item.value === value)?.label || "";

    return (
        <div
            ref={wrapperRef}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
            }}
        >
            {label && (
                <label
                    style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--gray-700)",
                        display: "flex",
                        gap: 4,
                    }}
                >
                    {label}
                    {required && (
                        <span style={{ color: "var(--error)" }}>*</span>
                    )}
                </label>
            )}

            <div style={{ position: "relative" }}>
                {/* LEFT ICON */}
                {icon && (
                    <div
                        style={{
                            position: "absolute",
                            left: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: focused
                                ? "var(--primary)"
                                : "var(--gray-400)",
                            transition: "color 0.2s",
                            zIndex: 2,
                        }}
                    >
                        <Icon name={icon} size={16} />
                    </div>
                )}

                <input
                    type="text"
                    value={open ? query : selectedLabel}
                    placeholder={placeholder}
                    onFocus={() => {
                        setFocused(true);
                        setOpen(true);
                        setQuery("");
                    }}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    style={{
                        width: "100%",
                        padding: "12px 14px",
                        paddingLeft: icon ? 38 : 14,
                        borderRadius: 12,
                        border: `1px solid ${error
                            ? "var(--error)"
                            : focused
                                ? "var(--primary)"
                                : "var(--gray-200)"
                            }`,
                        outline: "none",
                        boxShadow: focused
                            ? error
                                ? "0 0 0 3px rgba(239,68,68,0.1)"
                                : "0 0 0 3px rgba(124,58,237,0.1)"
                            : "none",
                    }}
                />

                {/* DROPDOWN */}
                {open && (
                    <div
                        style={{
                            position: "absolute",
                            top: "105%",
                            left: 0,
                            width: "100%",
                            background: "#fff",
                            border: "1px solid var(--gray-200)",
                            borderRadius: 12,
                            maxHeight: 220,
                            overflowY: "auto",
                            zIndex: 1000,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        }}
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        onChange(item.value);
                                        setQuery(item.label);
                                        setOpen(false);
                                    }}
                                    style={{
                                        padding: "12px 14px",
                                        cursor: "pointer",
                                        transition: "0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "#f9fafb";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    {item.label}
                                </div>
                            ))
                        ) : (
                            <div
                                style={{
                                    padding: 14,
                                    color: "var(--gray-500)",
                                }}
                            >
                                No results found
                            </div>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <span
                    style={{
                        fontSize: 12,
                        color: "var(--error)",
                    }}
                >
                    {error}
                </span>
            )}
        </div>
    );
};

export default SearchableSelect;
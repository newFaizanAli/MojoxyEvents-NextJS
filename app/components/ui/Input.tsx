import { useState } from "react";
import { Icon } from "../shared";
import { IconName } from "@/app/types";

interface InputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: IconName;
    error?: string;
    hint?: string;
    autoComplete?: string;
    required?: boolean;
}

const Input = ({ name, label, type = "text", placeholder, value, autoComplete = "", onChange, icon, error, hint, required }: InputProps) => {
    const [showPass, setShowPass] = useState(false);
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {label && (
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-700)", display: "flex", gap: 4 }}>
                    {label} {required && <span style={{ color: "var(--error)" }}>*</span>}
                </label>
            )}
            <div style={{ position: "relative" }}>
                {icon && (
                    <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: focused ? "var(--primary)" : "var(--gray-400)", transition: "color 0.2s" }}>
                        <Icon name={icon} size={16} />
                    </div>
                )}
                <input
                    name={name}
                    type={type === "password" && showPass ? "text" : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoComplete={autoComplete}
                    style={{
                        paddingLeft: icon ? 38 : 14,
                        paddingRight: type === "password" ? 38 : 14,
                        borderColor: error ? "var(--error)" : focused ? "var(--primary)" : "var(--gray-200)",
                        boxShadow: focused ? (error ? "0 0 0 3px rgba(239,68,68,0.1)" : "0 0 0 3px rgba(124,58,237,0.1)") : "none",
                    }}
                />
                {type === "password" && (
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--gray-400)", cursor: "pointer" }}>
                        <Icon name={showPass ? "eyeOff" : "eye"} size={16} />
                    </button>
                )}
            </div>
            {error && <span style={{ fontSize: 12, color: "var(--error)" }}>{error}</span>}
            {hint && !error && <span style={{ fontSize: 12, color: "var(--gray-500)" }}>{hint}</span>}
        </div>
    );
};

export default Input;
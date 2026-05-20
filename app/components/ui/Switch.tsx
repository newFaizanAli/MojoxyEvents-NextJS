import { forwardRef, useState } from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ label, hint, error, className = "", ...rest }, ref) => {
        const [focused, setFocused] = useState(false);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {label && (
                    <label style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--gray-700)",
                        display: "flex",
                        gap: 4,
                        alignItems: "center"
                    }}>
                        {label}
                    </label>
                )}

                <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input
                        ref={ref}
                        type="checkbox"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        style={{ display: "none" }}
                        {...rest}
                    />

                    <div
                        className={className}
                        style={{
                            width: 42,
                            height: 24,
                            borderRadius: 999,
                            background: rest.checked
                                ? "var(--primary)"
                                : "var(--gray-300)",
                            position: "relative",
                            transition: "all 0.2s",
                            cursor: "pointer",
                            boxShadow: focused
                                ? "0 0 0 3px rgba(124,58,237,0.15)"
                                : "none",
                        }}
                    >
                        <div
                            style={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                background: "white",
                                position: "absolute",
                                top: "50%",
                                left: rest.checked ? 22 : 3,
                                transform: "translateY(-50%)",
                                transition: "all 0.2s",
                            }}
                        />
                    </div>
                </label>

                {error && (
                    <span style={{ fontSize: 12, color: "var(--error)" }}>
                        {error}
                    </span>
                )}

                {hint && !error && (
                    <span style={{ fontSize: 12, color: "var(--gray-500)" }}>
                        {hint}
                    </span>
                )}
            </div>
        );
    }
);

Switch.displayName = "Switch";

export default Switch;
import { Check } from "lucide-react";

interface RadioOption {
    value: string;
    label: string;
    description?: string;
}

interface RadioGroupProps {
    label?: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const RadioGroup = ({
    label,
    options,
    value,
    onChange,
    className = "",
}: RadioGroupProps) => {
    return (
        <div className={className} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {label && (
                <label
                    style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--gray-700)",
                    }}
                >
                    {label}
                </label>
            )}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {options.map((option) => {
                    const checked = value === option.value;

                    return (
                        <label
                            key={option.value}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                cursor: "pointer",
                                padding: "8px 10px",
                                borderRadius: 12,
                                border: `1px solid ${checked ? "var(--primary)" : "var(--gray-200)"
                                    }`,
                                background: checked
                                    ? "rgba(124,58,237,0.06)"
                                    : "transparent",
                                transition: "all 0.2s",
                                minWidth: 180,
                            }}
                        >
                            {/* hidden radio */}
                            <input
                                type="radio"
                                value={option.value}
                                checked={checked}
                                onChange={() => onChange(option.value)}
                                style={{ display: "none" }}
                            />

                            {/* custom radio */}
                            <div
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    border: "2px solid",
                                    borderColor: checked
                                        ? "var(--primary)"
                                        : "var(--gray-400)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.2s",
                                }}
                            >
                                {checked && (
                                    <div
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: "var(--primary)",
                                        }}
                                    />
                                )}
                            </div>

                            {/* text */}
                            <div style={{ flex: 1 }}>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "var(--gray-900)",
                                        margin: 0,
                                    }}
                                >
                                    {option.label}
                                </p>

                                {option.description && (
                                    <p
                                        style={{
                                            fontSize: 12,
                                            color: "var(--gray-500)",
                                            margin: 0,
                                            marginTop: 2,
                                        }}
                                    >
                                        {option.description}
                                    </p>
                                )}
                            </div>

                            {/* check icon */}
                            {checked && (
                                <Check
                                    size={16}
                                    color="var(--primary)"
                                />
                            )}
                        </label>
                    );
                })}
            </div>

        </div>
    );
};

export default RadioGroup;
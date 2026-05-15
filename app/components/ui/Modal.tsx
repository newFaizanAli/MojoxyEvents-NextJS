import { ReactNode } from "react";
import { Icon } from "../shared";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    width?: number;
}

const Modal = ({ open, onClose, title, children, width = 520 }: ModalProps) => {
    if (!open) return null;
    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, animation: "fadeIn 0.2s ease",
        }}>
            <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(9,9,11,0.5)", backdropFilter: "blur(4px)" }} />
            <div style={{
                position: "relative", width: "100%", maxWidth: width,
                background: "var(--white)", borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-xl)", animation: "fadeUp 0.3s ease",
                maxHeight: "90vh", overflow: "auto",
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--gray-100)" }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--gray-900)" }}>{title}</h3>
                    <button onClick={onClose} style={{ background: "var(--gray-100)", border: "none", borderRadius: "var(--radius-sm)", padding: 6, cursor: "pointer", color: "var(--gray-600)" }}>
                        <Icon name="x" size={16} />
                    </button>
                </div>
                <div style={{ padding: 24 }}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
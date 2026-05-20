import { useEffect, useMemo } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import Button from "./Button";

interface ImageUploadProps {
    value: File | string | "";
    onChange: (file: File | string) => void;
    error?: string;
    label?: string;
    accept?: string;
    className?: string;
    required?: boolean;
}

const ImageUpload = ({
    value,
    onChange,
    error,
    label = "Upload Image",
    accept = "image/*",
    className = "",
    required = false,
}: ImageUploadProps) => {
    // Memoized preview URL
    const preview = useMemo(() => {
        if (value instanceof File) {
            return URL.createObjectURL(value);
        } else if (typeof value === "string" && value !== "") {
            return value;
        } else {
            return null;
        }
    }, [value]);

    // Cleanup Object URLs when value changes
    useEffect(() => {
        if (value instanceof File) {
            const url = URL.createObjectURL(value);
            return () => URL.revokeObjectURL(url);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Check if filename contains space
        if (/\s/.test(file.name)) {
            alert("File name must not contain spaces. Please rename your file.");

            // Reset input
            e.target.value = "";

            return;
        }

        onChange(file);
    };


    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className={className}>
            {label && (
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-700)", display: "flex", gap: 4 }}>
                    {label} {required && <span style={{ color: "var(--error)" }}>*</span>}
                </label>
            )}

            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="file"
                        accept={accept}
                        className={`w-full bg-white/5 border ${error ? "border-red-500" : "border-white/10"
                            } rounded-xl px-4 py-3 text-white placeholder-gray-500 
                        focus:outline-none focus:border-purple-500 focus:ring-2 
                        focus:ring-purple-500/20 transition-all file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0 file:text-sm file:font-semibold
                        file:bg-purple-500/20 file:text-purple-800 hover:file:bg-purple-500/30
                        file:cursor-pointer cursor-pointer`}
                        onChange={handleFileChange}
                    />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                {preview && (
                    <div className="relative inline-block">
                        <div className="relative group space-y-2">
                            <Image
                                src={preview}
                                alt="Preview"
                                width={0}
                                height={0}
                                className="w-full max-w-md h-auto rounded-lg border-2 border-white/20 shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = "";
                                    e.currentTarget.alt = "Failed to load image";
                                }}
                            />
                            <p className="text-sm text-gray-400 text-center">Image Preview</p>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleRemove}
                                // className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 
                                // text-white rounded-full p-2 opacity-0 group-hover:opacity-100 
                                // transition-opacity duration-200"
                                icon="x"
                            >Remove image
                                {/* <X className="w-4 h-4" /> */}
                            </Button>
                        </div>

                    </div>
                )}

                {!preview && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Upload className="w-4 h-4" />
                        <span>Upload an image file (PNG, JPG, JPEG, GIF, WEBP)</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;

"use client";

import { ImagePlus, Upload, X } from "lucide-react";
import { forwardRef, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange?: (file: File | null) => void;
  onRemove?: () => void;
  placeholder?: string;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      label,
      value,
      onChange,
      onRemove,
      placeholder = "Clique ou arraste uma imagem",
      accept = "image/jpeg,image/png,image/webp",
      maxSize = MAX_SIZE_BYTES,
      disabled,
      className,
    },
    ref,
  ) => {
    const inputId = useId();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = (file: File) => {
      setError(null);

      if (!file.type.startsWith("image/")) {
        setError("Arquivo deve ser uma imagem");
        return;
      }

      if (file.size > maxSize) {
        setError(
          `Arquivo muito grande. Máximo ${Math.round(maxSize / 1024 / 1024)}MB`,
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      onChange?.(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFile(file);
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleRemove = () => {
      setPreview(null);
      onChange?.(null);
      onRemove?.();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const displayPreview = preview || value;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <input
          ref={(node) => {
            if (ref) {
              if (typeof ref === "function") {
                ref(node);
              } else {
                ref.current = node;
              }
            }
            fileInputRef.current = node;
          }}
          id={inputId}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />

        {displayPreview ? (
          <div className="relative group">
            <img
              src={displayPreview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-teal-200"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
              >
                <Upload className="w-4 h-4 text-slate-700" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={inputId}
            className={cn(
              "flex flex-col items-center justify-center w-24 h-24 rounded-full",
              "border-2 border-dashed border-slate-300 cursor-pointer",
              "hover:border-teal-400 hover:bg-teal-50 transition-colors",
              isDragging && "border-teal-500 bg-teal-50",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            <ImagePlus className="w-8 h-8 text-slate-400" />
            <span className="text-xs text-slate-500 mt-1 text-center">
              Adicionar
            </span>
          </label>
        )}

        <p className="text-xs text-slate-500">{placeholder}</p>

        {error && (
          <span className="text-xs text-red-600 font-medium">{error}</span>
        )}
      </div>
    );
  },
);

ImageUpload.displayName = "ImageUpload";

export { ImageUpload };

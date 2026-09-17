import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
}

export const Input = ({
    label,
    error,
    icon,
    className = "",
    ...props
}: InputProps) => {
    return (
        <div className="flex w-full flex-col mt-3 gap-0.5">
            {label && (
                <label
                    htmlFor={props.id}
                    className="pl-2 text-xs text-slate-600"
                >
                    {label}
                </label>
            )}

            <div
                className={`
                    flex items-center
                    rounded-lg
                    border
                    bg-slate-900
                    transition-colors
                    ${error
                        ? "border-red-500/50 focus-within:border-red-500"
                        : "border-slate-800 focus-within:border-slate-800"
                    }
                    ${props.disabled
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }
                `}
            >
                {icon && (
                    <span className="ml-3 shrink-0 text-slate-500">
                        {icon}
                    </span>
                )}

                <input
                    {...props}
                    className={`
                        h-10
                        w-full
                        bg-transparent
                        px-3
                        text-sm
                        text-slate-400
                        outline-none
                        placeholder:text-slate-400
                        disabled:cursor-not-allowed
                        ${icon ? "pl-2" : ""}
                        ${className}
                    `}
                />
            </div>

            {error && (
                <span className="text-xs text-red-400">
                    {error}
                </span>
            )}
        </div>
    );
};

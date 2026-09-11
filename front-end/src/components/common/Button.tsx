import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    icon?: ReactNode;
    text: string;
}

export const Button = ({
    loading = false,
    text,
    icon,
    className = "",
    disabled,
    ...props
}: ButtonProps) => {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`
                cursor-pointer
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-blue-800
                px-4
                py-3
                text-sm
                font-semibold
                text-slate-100
                transition-all
                duration-200
                hover:bg-blue-900
                active:scale-[0.98]
                focus-visible:outline-2
                focus-visible:outline-slate-400
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${className}
            `}
        >
            {loading ? (
                <>
                    <span
                        className="
                            h-4
                            w-4
                            animate-spin
                            rounded-full
                            border-2
                            border-current
                            border-t-transparent
                        "
                    />

                    <span>Carregando...</span>
                </>
            ) : (
                <>
                    {icon && (
                        <span className="shrink-0">
                            {icon}
                        </span>
                    )}

                    <span>{text}</span>
                </>
            )}
        </button>
    );
};

import { cn } from "@/common/utils/utils";
import { ComponentProps } from "react";

export default function Form({
    className,
    onSubmit,
    children,
    ...props
}: ComponentProps<"form">) {
    return (
        <form
            onSubmit={onSubmit}
            className={cn("w-full max-w-[600px]", className)}
            {...props}
        >
            {children}
        </form>
    );
}

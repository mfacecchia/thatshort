import { ChevronRight } from "lucide-react";
import { ComponentProps, forwardRef } from "react";
import { cn } from "../utils/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const InputWithIcon = forwardRef<HTMLInputElement, ComponentProps<"div">>(
    ({ className, title, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "flex justify-between h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                {...props}
            >
                <Input
                    ref={ref}
                    className="border-none p-0 shadow-none transition-none h-full"
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="p-0 h-full w-auto aspect-square"
                    title={title}
                    aria-description="Click this button to shorten your link!"
                >
                    <ChevronRight className="stroke-primary" />
                </Button>
            </div>
        );
    }
);

export default InputWithIcon;

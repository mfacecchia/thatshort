import { LucideHome } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";

const BackHomeButton = () => {
    return (
        <NavLink to="/" className="hover:animate-pulse mt-5">
            <Button variant="link" className="mt-5">
                Go back to
                <LucideHome className="inline align-text-bottom" />
                home
            </Button>
        </NavLink>
    );
};

export default BackHomeButton;

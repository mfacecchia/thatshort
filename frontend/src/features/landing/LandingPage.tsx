import logo from "@/common/assets/logo.svg";
import Footer from "@/common/components/footer";
import Form from "@/common/components/form";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { urlSchema } from "../url/schemas/urlSchema";
import { TUrl } from "../url/types/urlType";

const LandingPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TUrl>({
        resolver: zodResolver(urlSchema),
    });

    // TODO: Call the backend with a POST request
    function shortenUrl(urlData: TUrl) {
        axios
            .post(
                import.meta.env.VITE_BACKEND_ADDRESS + "/api/v1/url",
                {
                    redirect_to: urlData.redirect_to,
                },
                {
                    timeout: 1500,
                }
            )
            .then(({ data }) => {
                // TODO: Display generated shortened url here
                console.log(data);
            });
    }

    return (
        <div className="space-y-11">
            <div className="flex flex-col items-center justify-center w-full">
                <img src={logo} alt="Logo" className="size-48" />
                <div className="text-center space-y-2 max-w-80">
                    <h1 className="leading-none">Thashort</h1>
                    <p className="large leading-none">
                        The best URL shortener on earth (kind of)
                    </p>
                </div>
            </div>
            <div className="w-full">
                <p>
                    Begin by typing the link you want to shorten, we will sort
                    out the rest :)
                </p>
                <Form onSubmit={handleSubmit(shortenUrl)} className="space-y-2">
                    {/* TODO: Replace with component */}
                    <div className="flex justify-between gap-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                        <Input
                            {...register("redirect_to")}
                            className="border-none p-0 shadow-none transition-none h-full"
                        />
                        <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="p-0 h-full w-auto aspect-square"
                            title="Shorten this link!"
                            aria-description="Click this button to shorten your link!"
                        >
                            <ChevronRight className="stroke-primary" />
                        </Button>
                    </div>
                    {errors.redirect_to && (
                        <p className="text-red-500 small mt-0">
                            Oopsie! This link appears to be invalid :/
                        </p>
                    )}
                </Form>
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;

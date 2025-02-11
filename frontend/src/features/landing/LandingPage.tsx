import logo from "@/common/assets/logo.svg";
import Footer from "@/common/components/footer";
import Form from "@/common/components/form";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { ToastAction } from "@/common/components/ui/toast";
import { Toaster } from "@/common/components/ui/toaster";
import { useToast } from "@/common/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { urlSchema } from "../url/schemas/urlSchema";
import { TUrl } from "../url/types/urlType";

const LandingPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TUrl>({
        resolver: zodResolver(urlSchema),
    });
    const toast = useToast();

    async function shortenUrl(urlData: TUrl): Promise<void> {
        toast.toast({
            title: "Processing",
            description: "Tick, Tock, Tick, Tock. Your link is on its way!",
            variant: "default",
        });
        return axios
            .post(
                import.meta.env.VITE_BACKEND_ADDRESS + "/api/v1/url",
                {
                    redirect_to: urlData.redirect_to,
                },
                {
                    timeout: 5000,
                }
            )
            .then(({ data: { data } }) => {
                toast.toast({
                    title: "Generated!",
                    description:
                        "Here's your link! Click the button to copy it :)",
                    variant: "default",
                    action: (
                        <ToastAction
                            altText="Copy shortened link"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    data.shortenedUrl
                                );
                            }}
                        >
                            Copy Link
                        </ToastAction>
                    ),
                    duration: 15000,
                });
            })
            .catch((err) => {
                const toastContent = {
                    title: "Houston, we got a problem",
                    description:
                        "An unexpected error occured, if you don't mind please try again in a few minutes :/",
                };
                if (err instanceof AxiosError) {
                    if (err.code === "ECONNABORTED") {
                        toastContent.description =
                            "The request was taking too much to complete, if you don't mind please try again in a few minutes :/";
                    } else if (err.status === 429) {
                        const { data } = err.response?.data ?? {};
                        toastContent.description = `Woah there! You made too many requests, please wait another ${
                            data.retryAfter ?? "few"
                        } seconds to avoid destroying our database. Thank you!`;
                    }
                }
                toast.toast({
                    title: toastContent.title,
                    description: toastContent.description,
                    variant: "destructive",
                    duration: 15000,
                });
            });
    }

    return (
        <div className="space-y-11">
            <div className="flex flex-col items-center justify-center w-full">
                <img src={logo} alt="Logo" className="size-48" />
                <div className="text-center space-y-2 max-w-80">
                    <h1 className="leading-none">Thatshort</h1>
                    <p className="large leading-none">
                        The best URL shortener on earth (kind of)
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col items-center">
                <p>
                    Begin by typing the link you want to shorten, we will sort
                    out the rest :)
                </p>
                <Form onSubmit={handleSubmit(shortenUrl)} className="space-y-2">
                    {/* TODO: Replace with component */}
                    <div className="flex justify-between gap-2 h-9 w-full rounded-md border border-input bg-transparent pl-2 pr-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                        <Input
                            {...register("redirect_to")}
                            className="border-none p-0 pl-1 shadow-none transition-none h-full"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="p-0 h-full w-auto aspect-square"
                            title="Shorten this link!"
                            aria-description="Click this button to shorten your link!"
                            disabled={isSubmitting}
                            aria-disabled={isSubmitting}
                        >
                            {/* TODO: Display spinner on during fetch */}
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
            {/* FIXME: Not positioned to full bottom */}
            <Footer />
            <Toaster />
        </div>
    );
};

export default LandingPage;

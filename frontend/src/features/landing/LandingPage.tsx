import logo from "@/common/assets/logo.svg";
import Footer from "@/common/components/footer";
import Form from "@/common/components/form";
import InputWithIcon from "@/common/components/inputWithIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
                    {/* TODO: Register input */}
                    <InputWithIcon title="Shorten this link!" />
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

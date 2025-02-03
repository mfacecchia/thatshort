import logo from "@/common/assets/logo.svg";
import Footer from "@/common/components/footer";
import Form from "@/common/components/form";
import InputWithIcon from "@/common/components/inputWithIcon";
import { useForm } from "react-hook-form";

const LandingPage = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm();

    // TODO: Call the backend with a POST request
    function shortenUrl() {
        fetch(import.meta.env.VITE_BACKEND_ADDRESS + "/debug")
            .then((res) => res.json())
            .then((jsonRes) => {
                console.log(jsonRes);
            });
        console.info("Submitting");
        return;
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
                {/* TODO: Add interactivity (a.k.a. form submission handling) */}
                <Form onSubmit={handleSubmit(shortenUrl)} className="space-y-2">
                    {/* TODO: Register input */}
                    <InputWithIcon title="Shorten this link!" />
                    {!isValid && (
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

import redirecting from "@/common/assets/redirecting.svg";
import axios from "axios";
import { useParams } from "react-router";

const RedirectPage = () => {
    const params = useParams();
    const { id } = params;

    axios
        .get(import.meta.env.VITE_BACKEND_ADDRESS + "/api/v1/url/" + id)
        .then(({ data: { data } }) => {
            setTimeout(() => {
                window.location.href = data.redirect_to;
            }, 250);
        })
        .catch((err) => {
            // TODO: Display error message on link not found
            console.error(err);
        });

    return (
        <div className="space-y-11">
            <div className="flex flex-col items-center justify-center w-full">
                <img src={redirecting} alt="Redirecting" className="size-48" />
                <div className="text-center space-y-4 max-w-80">
                    <h1 className="leading-none">
                        You're about to be redirected!
                    </h1>
                    <div className="space-y-1">
                        <p className="large leading-none">Did you know?</p>
                    </div>
                </div>
            </div>
            <div className="w-full"></div>
        </div>
    );
};

export default RedirectPage;

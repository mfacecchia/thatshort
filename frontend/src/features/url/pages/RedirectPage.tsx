import axios from "axios";
import { useParams } from "react-router";

const RedirectPage = () => {
    const params = useParams();
    const { id } = params;

    axios
        .get(import.meta.env.VITE_BACKEND_ADDRESS + "/api/v1/url/" + id)
        .then(({ data: { data } }) => {
            window.location.href = data.redirect_to;
        })
        .catch((err) => {
            // TODO: Display error message on link not found
            console.error(err);
        });

    return (
        <>
            <h1>Redirecting...</h1>
        </>
    );
};

export default RedirectPage;

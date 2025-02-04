import invalidLink from "@/common/assets/invalidLink.svg";
import redirecting from "@/common/assets/redirecting.svg";
import BackHomeButton from "@/common/components/backHomeButton";
import updatePageTitle from "@/common/utils/updatePageTitle";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const RedirectPage = () => {
    const params = useParams();
    const { id } = params;
    const [uselessFact, setUselessFact] = useState<string | null>(null);
    const [isRedirecting, setIsRedirecting] = useState<boolean>(true);
    updatePageTitle(isRedirecting ? "Redirecting" : "Error");

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_ADDRESS + "/api/v1/url/" + id)
            .then(({ data: { data } }) => {
                setTimeout(() => {
                    window.location.href = data.redirect_to;
                }, 250);
            })
            .catch(() => {
                setIsRedirecting(false);
            });
    }, [id]);

    useEffect(() => {
        if (!isRedirecting) return;
        axios
            .get("https://uselessfacts.jsph.pl/random.json")
            .then(({ data: { text } }) => {
                setUselessFact(text);
            })
            .catch(() => {
                setUselessFact(
                    "When Google entered the phone market with its Android devices, Steve Jobs felt betrayed and stated that they had stolen some features of the iPhone."
                );
            });
    }, [isRedirecting]);

    return (
        <div className="space-y-11">
            <div className="flex flex-col items-center justify-center w-full">
                {isRedirecting ? (
                    <img
                        src={redirecting}
                        alt="Redirecting"
                        className="size-48"
                    />
                ) : (
                    <img
                        src={invalidLink}
                        alt="Invalid Link"
                        className="size-48"
                    />
                )}
                <div className="text-center space-y-4 max-w-80">
                    {isRedirecting ? (
                        <>
                            <h1 className="leading-none">
                                You're about to be redirected!
                            </h1>
                            <div className="space-y-1">
                                <p className="large leading-none">
                                    Did you know?
                                </p>
                                {uselessFact && <p>{uselessFact}</p>}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="leading-none">
                                Well... That's embarassing
                            </h1>
                            <div className="space-y-1">
                                <p className="large leading-none">
                                    We could not find the link in our systems
                                    but here’s a bag of fries just for you :) 🍟
                                </p>
                            </div>
                            <BackHomeButton />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RedirectPage;

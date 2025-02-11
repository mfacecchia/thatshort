import invalidLink from "@/common/assets/invalidLink.svg";
import redirecting from "@/common/assets/redirecting.svg";
import BackHomeButton from "@/common/components/backHomeButton";
import updatePageTitle from "@/common/utils/updatePageTitle";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TRedirectState } from "../types/redirectStateType";

const RedirectPage = () => {
    const params = useParams();
    const { id } = params;
    const [uselessFact, setUselessFact] = useState<string | null>(null);
    const [redirectState, setRedirectState] = useState<TRedirectState>({
        status: "pending",
        message: "You're about to be redirected!",
    });
    updatePageTitle(redirectState ? "Redirecting" : "Error");

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_ADDRESS + "/api/v1/url/" + id)
            .then(({ data: { data } }) => {
                setTimeout(() => {
                    window.location.href = data.redirect_to;
                }, 250);
            })
            .catch((err) => {
                const redirectState: TRedirectState = {
                    status: "error",
                    message:
                        "We could not find the link in our systems but here’s a bag of fries just for you :) 🍟",
                };
                if (err instanceof AxiosError && err.status === 429) {
                    const { data } = err.response?.data ?? {};
                    redirectState.message = `Woah there! You made too many requests, please wait another ${
                        data.retryAfter ?? "few"
                    } seconds to avoid destroying our database. Here, have some ramen while you wait! 🍜`;
                }
                setRedirectState(redirectState);
            });
    }, [id]);

    useEffect(() => {
        if (!redirectState) return;
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
    }, [redirectState]);

    return (
        <div className="space-y-11">
            <div className="flex flex-col items-center justify-center w-full">
                {/* TODO: redundant `redirectState` check */}
                {redirectState.status === "pending" ? (
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
                    {redirectState.status === "pending" ? (
                        <>
                            <h1 className="leading-none">
                                {redirectState.message}
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
                                    {redirectState.message}
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

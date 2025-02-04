import notFound from "@/common/assets/notFound.svg";
import BackHomeButton from "../components/backHomeButton";
import updatePageTitle from "../utils/updatePageTitle";

const NotFoundPage = () => {
    updatePageTitle("Not found");

    return (
        <div className="space-y-11">
            <div className="flex flex-col items-center justify-center w-full">
                <img src={notFound} alt="Not Found" className="size-48" />
                <div className="text-center space-y-4 max-w-80">
                    <h1 className="leading-none">Well... That's embarassing</h1>
                    <p className="large">
                        We could not find what you were looking for :(
                    </p>
                    <BackHomeButton />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;

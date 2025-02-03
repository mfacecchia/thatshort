import logo from "@/common/assets/logo.svg";
import Footer from "@/common/components/footer";
import Form from "@/common/components/form";
import InputWithIcon from "@/common/components/inputWithIcon";

const LandingPage = () => {
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
                <Form>
                    <InputWithIcon title="Shorten this link!" />
                </Form>
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;

import { BrowserRouter, Route, Routes } from "react-router";
import NotFoundPage from "./common/pages/NotFoundPage";
import LandingPage from "./features/landing/LandingPage";
import RedirectPage from "./features/url/pages/RedirectPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<LandingPage />} />
                    <Route path="/:id" element={<RedirectPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

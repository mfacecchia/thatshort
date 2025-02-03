import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./features/landing/LandingPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<LandingPage />} />
                </Route>
                {/* TODO: Add 404 page */}
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import React from "react";
import Users from "../app/layouts/users";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Route path="/login/:type?" component={Login} />
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                    </QualitiesProvider>
                </ProfessionProvider>
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;

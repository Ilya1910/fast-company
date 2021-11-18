import React from "react";
import Users from "../app/layouts/users";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
            </Switch>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;

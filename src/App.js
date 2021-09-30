import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./components/login";
import Main from "./components/main";
import Users from "./components/users";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

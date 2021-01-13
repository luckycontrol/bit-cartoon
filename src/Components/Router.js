import Header from "./Header";
import Home from "../Routes/Home";
import Login from "../Routes/Login";
import CreateAccount from "../Routes/CreateAccount";
import Cartoon from "../Routes/Cartoon";
import { HashRouter, Switch, Route } from "react-router-dom";

const Router = () => {
  return (
    <>
      <HashRouter>
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/login/createAccount" exact component={CreateAccount} />
          <Route path="/cartoon" exact component={Cartoon} />
        </Switch>
      </HashRouter>
    </>
  );
};

export default Router;

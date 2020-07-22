import React from "react";
import ReactDOM from "react-dom";
import "basikit/dist/index.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Container } from "basikit";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Start from "./routes/start";
import Medicine from "./routes/medicine";

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Start} />
          <Route path="/:id" exact component={Medicine} />
        </Switch>
      </BrowserRouter>
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

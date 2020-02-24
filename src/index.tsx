import React from "react";
import ReactDOM from "react-dom";
import { configure } from "mobx";
import { Game } from "./components/game/Game";

configure({
  enforceActions: "always",
});

ReactDOM.render(<Game />, document.getElementById("root"));

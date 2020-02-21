import React from "react";
import ReactDOM from "react-dom";
import { Board } from "./components/board/Board";
import { configure } from "mobx";

configure({
	enforceActions: "always",
});

ReactDOM.render(<Board />, document.getElementById("root"));

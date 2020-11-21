import * as $ from "jquery";

import "./babel";
import "./styles/styles.css";
import "./styles/less.less";
import "./styles/scss.scss";

import webpackLogo from "@/asserts/webpack_icon";
import React from "react";
import {render} from "react-dom";
// import jsonData from "@/asserts/data";
// import xmlData from "@/asserts/data.xml";
// import csvData from "@/asserts/data.csv";

import Post from "@models/Post";

const post = new Post("webpack Post Title", webpackLogo);

// $("pre").html(post.toString());
// $("pre").addClass("code").html(post.toString());

// console.log(`Post to string: ${post.toString()}`);
// console.log("JSON: ", jsonData);
// console.log("XML: ", xmlData);
// console.log("CSV", csvData);

const App = () => (
    <div className="container">
    <h1>Webpack Course</h1>

    <hr />

    <div className="logo"></div>

    <hr />
    <pre />
    <hr />

    <div className="box">
      <h2>Less</h2>
    </div>

    <div className="card">
      <h2>SCSS</h2>
    </div>
  </div>
);

render(<App/>, document.querySelector("#app"));
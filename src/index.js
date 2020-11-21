import * as $ from "jquery";

import "./babel";
import "./styles/styles.css";
import "./styles/less.less";
import "./styles/scss.scss";

import webpackLogo from "@/asserts/webpack_icon";
import jsonData from "@/asserts/data";
import xmlData from "@/asserts/data.xml";
import csvData from "@/asserts/data.csv";

import Post from "@models/Post";

const post = new Post("webpack Post Title", webpackLogo);

// $("pre").html(post.toString());
$("pre").addClass("code").html(post.toString());

console.log(`Post to string: ${post.toString()}`);
console.log("JSON: ", jsonData);
console.log("XML: ", xmlData);
console.log("CSV", csvData);
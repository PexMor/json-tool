/*
This is a dummy file for webpack build to pack all dependencies.
The dependencies are later exported by naive way of:
window....
*/

// import the lodash tool lib
import _ from "lodash";
// import the emuto lib for web
import emuto from "emuto/lib";
// import and (cross compiled/wrapped)
import GreetUser from "./greeting.emu";
// import the emscripten cross compiled
import jq from "jq-web";

// simple entry point
function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

// exports
window.component_fce = component;
window.GreetUser_fce = GreetUser;
window.emuto_fce = emuto;
window.jq_fce = jq;

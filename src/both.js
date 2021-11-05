/*
This is a dummy file for webpack build to pack all dependencies.
The dependencies are later exported by naive way of:
window....
*/

// import the emuto lib for web
import emuto from "emuto/lib";
// import the emscripten cross compiled
import jq from "jq-web";

// exports
window.emuto_fce = emuto;
window.jq_fce = jq;

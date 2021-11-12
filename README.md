# JSON Tool

A visual tool to help build json data queries using jq (jq-web) or emuto.

Inspired by:

* [https://stedolan.github.io/jq/](https://stedolan.github.io/jq/) - The original JQ command line tool.
* [https://github.com/fiatjaf/jq-web](https://github.com/fiatjaf/jq-web) - Its web (in browser) variant as emscripten.
* [https://github.com/kantord/emuto](https://github.com/kantord/emuto) - An alternative written on pure javascript.
* [https://kantord.github.io/emuto/](https://kantord.github.io/emuto/) - Github pages view on the project.
* [https://kantord.github.io/emuto/docs/try_emuto](https://kantord.github.io/emuto/docs/try_emuto) - Emuto demo.

## Why ?

The purpose of this experiment, in browser visual tool for displaying __JSON__, is to help humans to click through the __JSON__ structures. Such strictures that are today almost everywhere. The __JSON__ has almost replaced __XML__ in API and similar calls. However the structure of __JSON__ is sometimes a bit too simple for expressing certains things. One example is that __JSON__ is __not able__ to express relation attributes to the parent ~ child relations. In case of XML there are node attributes to do so. But in any other cases the __JSON__ serves __better__ for humans and __good enough__ for machines. There are even an attempts to convert __XML__ to __JSON__ which in most cased promotes the _"mess"_ into __JSON__ thus not used/usable too much (though mathematically/programatically correct).

### The problem

When I encounter deeper __JSON__ structure (or generally any __tree structure__) I have a problem figuring out the relation in between individual nodes and/or more distant relations within the tree. And as trees are pretty much everywhere this means having difficulties extracting information from `docker inspect`, `az-cli`, `gcloud` and any other __JSON__ formated resposes. In many cases you can ask the particular SW to show human friendly variant, but that might only support subset of the information base that is provided by the underlying system. And not to forget the human friendly variant is not suitable for machine processing.

### The eventual helper

I am far from proposing this as a ultimate solution to any problem, but rather sharing a small tool that I have made for myself to help me tackle my pain. The tool [https://pexmor.github.io/json-tool/both.html](https://pexmor.github.io/json-tool/both.html) is completely running in a browser packed using `webpack` processing a small `copy & pasted` chunk o JSON without sending anything to backend.

> __Note__: you can download the whole project to your computer (and webpack it yourself) as well as all dependencies so you will be able to run completelly off-line. But you have to change the CDN referenced dependencies to your local files.

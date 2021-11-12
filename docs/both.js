var setting = {
  data: {
    simpleData: {
      enable: true,
    },
  },
  callback: {
    beforeClick: beforeClick,
    onClick: onClick,
  },
  view: {
    nameIsHTML: true,
  },
};

var zDataHie = [
  {
    name: "pNode 01",
    open: true,
    children: [
      {
        name: "pNode 11",
        children: [
          { name: "leaf node 111" },
          { name: "leaf node 112" },
          { name: "leaf node 113" },
          { name: "leaf node 114" },
        ],
      },
      {
        name: "pNode 12",
        children: [
          { name: "leaf node 121" },
          { name: "leaf node 122" },
          { name: "leaf node 123" },
          { name: "leaf node 124" },
        ],
      },
      { name: "pNode 13 - no child", isParent: true },
    ],
  },
  {
    name: "pNode 02",
    children: [
      {
        name: "pNode 21",
        open: true,
        children: [
          { name: "leaf node 211" },
          { name: "leaf node 212" },
          { name: "leaf node 213" },
          { name: "leaf node 214" },
        ],
      },
      {
        name: "pNode 22",
        children: [
          { name: "leaf node 221" },
          { name: "leaf node 222" },
          { name: "leaf node 223" },
          { name: "leaf node 224" },
        ],
      },
      {
        name: "pNode 23",
        children: [
          { name: "leaf node 231" },
          { name: "leaf node 232" },
          { name: "leaf node 233" },
          { name: "leaf node 234" },
        ],
      },
    ],
  },
  { name: "pNode 3 - no child", isParent: true },
];
var zDataFlat = [
  {
    id: 1,
    pId: 0,
    name: "ordinary parent",
    t: "I am ordinary, just click on me",
    open: true,
  },
  {
    id: 11,
    pId: 1,
    name: "leaf node 1-1",
    t: "I am ordinary, just click on me",
  },
  {
    id: 12,
    pId: 1,
    name: "leaf node 1-2",
    t: "I am ordinary, just click on me",
  },
  {
    id: 13,
    pId: 1,
    name: "leaf node 1-3",
    t: "I am ordinary, just click on me",
  },
  {
    id: 2,
    pId: 0,
    name: "strong parent",
    t: "You can click on me, but you can not click on the sub-node!",
    open: true,
  },
  {
    id: 21,
    pId: 2,
    name: "leaf node 2-1",
    t: "You can't click on me..",
    click: false,
  },
  {
    id: 22,
    pId: 2,
    name: "leaf node 2-2",
    t: "You can't click on me..",
    click: false,
  },
  {
    id: 23,
    pId: 2,
    name: "leaf node 2-3",
    t: "You can't click on me..",
    click: false,
  },
  {
    id: 3,
    pId: 0,
    name: "weak parent",
    t: "You can't click on me, but you can click on the sub-node!",
    open: true,
    click: false,
  },
  {
    id: 31,
    pId: 3,
    name: "leaf node 3-1",
    t: "please click on me..",
  },
  {
    id: 32,
    pId: 3,
    name: "leaf node 3-2",
    t: "please click on me..",
  },
  {
    id: 33,
    pId: 3,
    name: "leaf node 3-3",
    t: "please click on me..",
  },
];

function getId() {
  if (typeof window.idPool === "undefined") {
    window.idPool = 0;
  }
  var res = window.idPool;
  window.idPool += 1;
  return res;
}

var qb = "";
var qe = "";

function getRepr(obj) {
  var propNames;
  var res = { text: "unknown", nested: false };
  if (Array.isArray(obj)) {
    res.text = `array[${obj.length}]`;
    res.recurse = true;
  } else if (typeof obj === "object") {
    if (obj === null) {
      res.text = "null";
      res.recurse = false;
    } else {
      propNames = Object.getOwnPropertyNames(obj);
      res.text = `object[${propNames.length}]`;
      res.recurse = true;
    }
  } else {
    //console.debug(`${typeof obj}:`);
    //console.debug(obj);
    var cssClass = typeof obj === "number" ? "json-num" : "json-text";
    res.text = `<span class='${cssClass}'>${qb}${obj}${qe}</span>`;
  }
  return res;
}

function arrCopyAndAdd(arr, item, isNum) {
  var cpArr = JSON.parse(JSON.stringify(arr));
  cpArr.push({ val: JSON.parse(JSON.stringify(item)), isNum: isNum });
  return cpArr;
}

function toZNodeData(ret, obj, parentId, depth, pfx) {
  // private variables inside this function
  var myId, selfId, propNames, val, item, opath;
  if (typeof parentId === "undefined") {
    parentId = getId();
    selfId = getId();
    ret.push({
      id: selfId,
      pId: parentId,
      opath: [],
      name: getRepr(obj).text,
      open: true,
    });
  } else {
    selfId = parentId;
  }
  if (typeof depth === "undefined") {
    depth = 0;
  }
  if (typeof pfx === "undefined") {
    pfx = [];
  }
  if (Array.isArray(obj)) {
    // we are processing an array
    for (var ii in obj) {
      val = obj[ii];
      myId = getId();
      repr = getRepr(val);
      opath = arrCopyAndAdd(pfx, ii, true);
      ret.push({
        id: myId,
        pId: selfId,
        name: `<span class='json-idx'>#${ii}</span>: ${repr.text}`,
        opath: opath,
        val: repr.text,
        open: true,
      });
      if (repr.recurse) {
        toZNodeData(ret, val, myId, depth + 1, opath);
      }
    }
  } else {
    // we are processing an object
    propNames = Object.getOwnPropertyNames(obj);
    for (var ii in propNames) {
      item = propNames[ii];
      val = obj[item];
      myId = getId();
      repr = getRepr(val);
      opath = arrCopyAndAdd(pfx, item, false);
      //opath = `${pfx}["${item}"]`;
      //opath = `${pfx}.${item}`;
      ret.push({
        id: myId,
        pId: selfId,
        name: `<span class='json-prop'>${qb}${item}${qe}</span>: ${repr.text}`,
        opath: opath,
        val: repr.text,
        open: true,
      });
      if (repr.recurse) {
        toZNodeData(ret, val, myId, depth + 1, opath);
      }
    }
  }
  return ret;
}

flat_array = [];
window.data = JSON.parse(JSON.stringify(zDataFlat));
res = toZNodeData(flat_array, window.data);
zNodes = res;
var log,
  className = "dark";

function beforeClick(treeId, treeNode, clickFlag) {
  return treeNode.click != false;
}

function opath2str(opath, bracket) {
  var txt = "";
  for (var ii = 0; ii < opath.length; ii++) {
    if (opath[ii].isNum) {
      txt += `[${opath[ii].val}]`;
    } else {
      if (bracket) {
        txt += `["${opath[ii].val}"]`;
      } else {
        txt += `.${opath[ii].val}`;
      }
    }
  }
  if (txt.substring(0, 1) === ".") {
    txt = txt.substring(1);
  }
  return txt;
}

function onClick(event, treeId, treeNode, clickFlag) {
  // showLog(`treeNode.opath,treeNode.val,"... zNodesX${treeNode.opath}`);
  opathStr = opath2str(treeNode.opath, true);
  opathStrAlt = opath2str(treeNode.opath, false);
  var res = jq_fce.json(window.data, `.${opathStr}`);
  window.result = JSON.parse(JSON.stringify(res));
  if (opathStr !== opathStrAlt) {
    showLog(
      `.${opathStr} = \nor\n.${opathStrAlt} = \n` +
        syntaxHighlight(JSON.stringify(res, null, 2))
    );
  } else {
    showLog(
      `.${opathStr} = \n` + syntaxHighlight(JSON.stringify(res, null, 2))
    );
  }
}

function showLog(str) {
  html = `<pre class='json'>${str}</pre>`;
  $("#log").html(html);
}

var x_data = {};
x_data["flat"] = JSON.parse(JSON.stringify(zDataFlat));
x_data["hie"] = JSON.parse(JSON.stringify(zDataHie));
x_data["set"] = JSON.parse(JSON.stringify(setting));
x_data["ex01"] = JSON.parse(JSON.stringify(ex01));
x_data["ex02"] = JSON.parse(JSON.stringify(ex02));

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

function loadData(id) {
  if (id === "result") {
    window.data = window.result;
  } else {
    window.data = x_data[id];
  }
  if (typeof window.data === "undefined") {
    window.data = x_data["set"];
  }
  var el = document.getElementById("jsonTa");
  if (el) {
    el.value = JSON.stringify(window.data, null, 4);
  }
  $.fn.zTree.destroy();
  window.idPool = undefined;
  window.flat_array = [];
  res = toZNodeData(flat_array, window.data);
  window.treeObj = $.fn.zTree.init($("#treeDemo"), setting, res);
}

function useJson() {
  var el = document.getElementById("jsonTa");
  if (el) {
    try {
      window.data = JSON.parse(el.value);
    } catch (e) {}
    // console.log(parseObjectLiteral(el.value));
    // console.log(window.treeObj);
    $.fn.zTree.destroy(); //window.treeObj.treeId);
    window.idPool = undefined;
    window.flat_array = [];
    res = toZNodeData(flat_array, window.data);
    //$("#treeDemo").html("");
    window.treeObj = $.fn.zTree.init($("#treeDemo"), setting, res);
  } else {
    alert("error in Json");
  }
}

function demo_orig() {
  var jso = {
    a: {
      big: {
        json: ["full", "of", "important", "things"],
      },
    },
  };
  var res2 = jq_fce.json(
    jso,
    '.a.big.json | ["empty", .[1], "useless", .[3]] | join(" ")'
  );
  console.log(res2.toString());
  var obj = { user: "Johnny", name: "Five" };
  console.log(obj);

  var objs = [1, 2, 3, 4, 5].map((item) => {
    var ret = { user: obj.user, name: obj.name };
    ret.name = ret.name + "-" + item;
    return ret;
  });
  var query = "$.name";
  var res = emuto_fce(query)(obj);
  console.log(JSON.stringify(res, null, 2));

  var query = 'map $ => {"name":$.name}';
  var res = emuto_fce(query)(objs);
  console.log(JSON.stringify(res, null, 2));
}

$(document).ready(function () {
  window.treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
  // demo
  var el = document.getElementById("jsonTa");
  if (el) {
    el.value = JSON.stringify(setting, null, 2);
  }
  fuzzySearch("treeDemo", "#search", true, true);
});

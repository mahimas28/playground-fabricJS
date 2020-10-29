fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 1;
fabric.Object.prototype.objectCaching = false;

// gsap.registerPlugin();
var canvas = new fabric.Canvas("canv", {
  preserveObjectStacking: true,
});

initCenteringGuidelines(canvas);
initAligningGuidelines(canvas);

var i = 0;
var count = 0;
function Addtext() {
  if (i == 5) {
    if (count == 0) {
      i -= 5;
      count++;
    }
  }
  var myId = "text" + i;
  canvas.add(
    new fabric.IText("Tap and Type", {
      id: myId,
      left: 50,
      top: 100,
      fontFamily: "arial black",
      fill: "#000000",
      fontSize: 50,
      strokeWidth: 5,
      // shadow:'rgba(0,0,0,0.3) 5px 5px 5px'
    })
  );
  i++;
}

function Delete() {
  canvas.remove(canvas.getActiveObject());
}

var textShadow = {
  color: "rgba(0,0,0,1)",
  blur: 3,
  opacity: 0.8,
};

addHandler(
  "text-color",
  function (obj) {
    setStyle(obj, "fill", this.value);
  },
  "oninput"
);

addHandler(
  "text-lines-bg-color",
  function (obj) {
    setStyle(obj, "textBackgroundColor", this.value);
  },
  "oninput"
);

addHandler(
  "text-stroke-color",
  function (obj) {
    setStyle(obj, "stroke", this.value);
  },
  "oninput"
);
document.getElementById("text-stroke-width").oninput = function () {
  changeStrokeWidth(this);
};

addHandler(
  "font-family",
  function (obj) {
    setStyle(obj, "fontFamily", this.value);
  },
  "onchange"
);

addHandler(
  "text-font-size",
  function (obj) {
    setStyle(obj, "fontSize", this.value);
  },
  "oninput"
);

addHandler(
  "text-line-height",
  function (obj) {
    setStyle(obj, "lineHeight", this.value);
  },
  "oninput"
);

addHandler(
  "text-align",
  function (obj) {
    setStyle(obj, "textAlign", this.value);
  },
  "onchange"
);

document.getElementById("graphic-color").oninput = function () {
  canvas.getActiveObject().set("fill", this.value);
  canvas.renderAll();
};
document.getElementById("graphic-stroke-color").oninput = function () {
  canvas.getActiveObject().set("stroke", this.value);
  canvas.renderAll();
};
document.getElementById("graphic-stroke-width").oninput = function () {
  changeStrokeWidth(this);
};
document.getElementById("skew-x").onchange = function () {
  canvas.getActiveObject().set("skewX", this.value);
  canvas.renderAll();
};
document.getElementById("skew-y").onchange = function () {
  canvas.getActiveObject().set("skewY", this.value);
  canvas.renderAll();
};
document.getElementById("rx").onchange = function () {
  canvas.getActiveObject().set("rx", this.value);
  canvas.renderAll();
};
document.getElementById("ry").onchange = function () {
  canvas.getActiveObject().set("ry", this.value);
  canvas.renderAll();
};
document.getElementById("graphic-opacity").oninput = function () {
  canvas.getActiveObject().set("opacity", this.value);
  canvas.renderAll();
};

document.getElementById("grdColor1").oninput = function () {
  var grd1 = document.getElementById("grdColor1").value;
  var grd2 = document.getElementById("grdColor2").value;
  console.log(grd1, grd2);
  var r = canvas.getActiveObject();
  r.setGradient("fill", {
    type: "linear",
    x1: 0,
    y1: 0,
    x2: r.width,
    y2: r.height,
    colorStops: {
      0: grd1,
      1: grd2,
    },
  });

  canvas.renderAll();
};

function backward() {
  canvas.sendBackwards(canvas.getActiveObject());
}
function toBack() {
  canvas.sendToBack(canvas.getActiveObject());
}
function forward() {
  canvas.bringForward(canvas.getActiveObject());
}
function toFront() {
  canvas.bringToFront(canvas.getActiveObject());
}

radios5 = document.getElementsByName("fonttype"); // wijzig naar button
for (var i = 0, max = radios5.length; i < max; i++) {
  radios5[i].onclick = function () {

    if (document.getElementById(this.id).checked == true) {
      if (this.id == "text-cmd-bold") {
        canvas.getActiveObject().set("fontWeight", "bold");
      }
      if (this.id == "text-cmd-italic") {
        canvas.getActiveObject().set("fontStyle", "italic");
      }
      if (this.id == "text-cmd-underline") {
        canvas.getActiveObject().set("underline", "true");
      }
      if (this.id == "text-cmd-linethrough") {
        canvas.getActiveObject().set("linethrough", "true");
      }
      if (this.id == "text-cmd-overline") {
        canvas.getActiveObject().set("overline", "true");
      }
      if (this.id == "text-shadow") {
        canvas.getActiveObject().set("shadow", textShadow);
      }
    } else {
      if (this.id == "text-cmd-bold") {
        canvas.getActiveObject().set("fontWeight", 100);
      }
      if (this.id == "text-cmd-italic") {
        canvas.getActiveObject().set("fontStyle", "");
      }
      if (this.id == "text-cmd-underline") {
        canvas.getActiveObject().set("underline", "");
      }
      if (this.id == "text-cmd-linethrough") {
        canvas.getActiveObject().set("linethrough", "");
      }
      if (this.id == "text-cmd-overline") {
        canvas.getActiveObject().set("overline", "");
      }
      if (this.id == "text-shadow") {
        canvas.getActiveObject().set("shadow", null);
      }
    }
    canvas.renderAll();
  };
}

async function uploadToS3(event){
  let files = event.target.files;
  var formData = new FormData();
  formData.append("file", files[0]);
  let resp = await axios.post(PROCESS_URL + '/upload', formData, {headers: {"Content-Type": "multipart/form-data"}});
  return resp.data;
}

$('#imgUpload').change(async function(){
  let upload = await uploadToS3(event);
  fabric.Image.fromURL(upload.url, function (img) {
    img.set({
      angle: 0,
      padding: 10,
      cornersize: 10,
      // height:110,
      // width:110,
      scaleX: 0.1,
      scaleY: 0.1,
      video_src: ""
    });
    canvas.centerObject(img);
    canvas.add(img);
  });
  canvas.renderAll();
});

function getVideoElement(url) {
  var videoE = document.createElement("video");
  videoE.muted = true;
  videoE.width = 858;
  videoE.height = 480;
  videoE.crossOrigin = "anonymous";
  videoE.style.display = "none";
  videoE.loop = true;
  var source = document.createElement("source");
  source.src = url;
  source.crossOrigin = "anonymous";
  source.type = "video/mp4";
  videoE.appendChild(source);
  return videoE;
}

$('#videoUpload').change(async function(){
  let upload = await uploadToS3(event);
  var videoE = getVideoElement(upload.url);
  var fab_video = new fabric.Image(videoE, {
    left: 0,
    top: 0,
    scaleY: 0.5,
    scaleX: 0.5,
  });
  fab_video.setSrc(upload.url);
  fab_video.set("video_src", upload.url);
  canvas.add(fab_video);
  console.log(fab_video);
  fab_video.getElement().volume = 1;
  fab_video.getElement().play();
  fabric.util.requestAnimFrame(function render() {
    canvas.renderAll();
    fabric.util.requestAnimFrame(render);
  });
});

function canvasLoaded(){
  canvas.renderAll.bind(canvas);
  var objs = JSON.parse(localStorage.getItem('data'))['objects'];
  for(var i=0; i< objs.length; i++){
    var obj = objs[i];
    if(obj.hasOwnProperty('video_src')){
      var videoE = getVideoElement(obj['video_src']);
      var fab_video = new fabric.Image(videoE, obj);
      canvas.add(fab_video);
      fab_video.getElement().volume = 1;
      fab_video.getElement().play();

      fabric.util.requestAnimFrame(function render() {
          canvas.renderAll();
        fabric.util.requestAnimFrame(render);
      });
    }
  }


}

document.getElementById("loadJson2Canvas").onchange = function (event) {
  var files = event.target.files[0];
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    let json = JSON.parse(event.target.result);
    console.log(json.gsap);
    editor.setValue(json.gsap);
    localStorage.setItem('data', JSON.stringify(json));
    canvas.loadFromJSON(JSON.stringify(json), canvasLoaded , function(o, object) {
      fabric.log(o, object);
    });
  });
  reader.readAsText(files);
};

fabric.Object.prototype.toObject = (function (toObject) {
  return function (propertiesToInclude) {
    propertiesToInclude = (propertiesToInclude || []).concat(
        ['video_src']
    );
    return toObject.apply(this, [propertiesToInclude]);
  };
})(fabric.Object.prototype.toObject);

function setStyle(object, styleName, value) {
  if (object.setSelectionStyles && object.isEditing) {
    var style = {};
    style[styleName] = value;
    object.setSelectionStyles(style);
  } else {
    object.set(styleName, value);
  }
}
function getStyle(object, styleName) {
  return object.getSelectionStyles && object.isEditing
    ? object.getSelectionStyles()[styleName]
    : object[styleName];
}
function addHandler(id, fn, eventName) {
  document.getElementById(id)[eventName || "onclick"] = function () {
    var el = this;
    if ((obj = canvas.getActiveObject())) {
      fn.call(el, obj);
      canvas.renderAll();
    }
  };
}
i = 0;
function AddRect() {
  var myId = "rect" + i;
  rect = new fabric.Rect({
    id: myId,
    left: 40,
    top: 40,
    width: 50,
    height: 50,
    padding: 0,
    fill: "transparent",
    stroke: "green",
    strokeWidth: 5,
  });
  canvas.add(rect);
  i++;
}
function AddCircle() {
  var myId = "circle" + i;
  rect = new fabric.Circle({
    id: myId,
    left: 40,
    top: 40,
    radius: 50,
    fill: "transparent",
    stroke: "green",
    strokeWidth: 5,
  });
  canvas.add(rect);
  i++;
}
function AddTriangle() {
  var myId = "triangle" + i;
  rect = new fabric.Triangle({
    id: myId,
    left: 40,
    top: 40,
    width: 50,
    height: 50,
    fill: "transparent",
    stroke: "green",
    strokeWidth: 5,
  });
  canvas.add(rect);
  i++;
}
function AddEllipse() {
  eli = new fabric.Ellipse({
    top: 150,
    left: 10,
    /* Try same values rx, ry => circle */
    rx: 75,
    ry: 50,
    fill: "",
    stroke: "blue",
    strokeWidth: 5,
  });
  canvas.add(eli);
}
var trapezoid = [
  { x: -100, y: -50 },
  { x: 100, y: -50 },
  { x: 150, y: 50 },
  { x: -150, y: 50 },
];
var emerald = [
  { x: 850, y: 75 },
  { x: 958, y: 137.5 },
  { x: 958, y: 262.5 },
  { x: 850, y: 325 },
  { x: 742, y: 262.5 },
  { x: 742, y: 137.5 },
];
var star4 = [
  { x: 0, y: 0 },
  { x: 100, y: 50 },
  { x: 200, y: 0 },
  { x: 150, y: 100 },
  { x: 200, y: 200 },
  { x: 100, y: 150 },
  { x: 0, y: 200 },
  { x: 50, y: 100 },
  { x: 0, y: 0 },
];
var star5 = [
  { x: 350, y: 75 },
  { x: 380, y: 160 },
  { x: 470, y: 160 },
  { x: 400, y: 215 },
  { x: 423, y: 301 },
  { x: 350, y: 250 },
  { x: 277, y: 301 },
  { x: 303, y: 215 },
  { x: 231, y: 161 },
  { x: 321, y: 161 },
];
var shape = new Array(trapezoid, emerald, star4, star5);

function AddPolygon() {
  var polyg = new fabric.Polygon(shape[1], {
    top: 180,
    left: 200,
    fill: "",
    stroke: "blue",
    strokeWidth: 2,
  });
  canvas.add(polyg);
}
function AddStar4() {
  var polyg = new fabric.Polygon(shape[2], {
    top: 180,
    left: 200,
    fill: "",
    stroke: "blue",
    strokeWidth: 2,
  });
  canvas.add(polyg);
}
function AddStar5() {
  var polyg = new fabric.Polygon(shape[3], {
    top: 180,
    left: 200,
    fill: "",
    stroke: "blue",
    strokeWidth: 2,
  });
  canvas.add(polyg);
}
function AddTrapezium() {
  var polyg = new fabric.Polygon(shape[0], {
    top: 180,
    left: 200,
    fill: "",
    stroke: "blue",
    strokeWidth: 2,
  });
  canvas.add(polyg);
}

/////mask/////////
function showOrHideDiv(divId, show) {
  let style = show === true ? "block" : "none";
  document.getElementById(divId).style.display = style;
}
function getValue(divId) {
  return document.getElementById(divId).value;
}
function toggleMaskOptions(event) {
  if (event.value == null || event.value === "rectangle") {
    showOrHideDiv("rect-cols", true);
    showOrHideDiv("circle-cols", false);
  } else {
    showOrHideDiv("rect-cols", false);
    showOrHideDiv("circle-cols", true);
  }
}
function maskColumns(maskType) {
  let top = getValue("top");
  let left = getValue("left");
  switch (maskType) {
    case "rectangle":
      return new fabric.Rect({
        left: left,
        top: top,
        width: getValue("rect-width"),
        height: getValue("rect-height"),
        originX: "center",
        originY: "center",
      });
    case "circle":
      return new fabric.Circle({
        radius: getValue("circle-radius"),
        top: top,
        left: left,
        originX: "center",
        originY: "center",
      });
  }
}
function applyMask() {
  let canvasObj = canvas.getActiveObject();
  if (
    !canvasObj ||
    (canvasObj.type !== "image" && canvasObj.type !== "video")
  ) {
    alert("Selected Object is not video or image");
    return;
  }
  let maskType = getValue("mask-shape");
  let clip = maskColumns(maskType);
  fabric.Object.prototype.transparentCorners = false;
  canvasObj.set({
    left: 500,
    top: 0,
    clipPath: clip,
  });
  canvas.centerObject(canvasObj);
  canvas.add(canvasObj);
  canvas.renderAll();
}

var editor = ace.edit("ace");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.session.setUseSoftTabs(true);

function downloadJson() {
  const myBtn = document.querySelector("#canvas2json");
  var code = canvas.toObject(["id"]);
  code.gsap = editor.getValue();
  var json = JSON.stringify(code);
  const jsonFile = new Blob([json]);
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(jsonFile);
  downloadLink.download = "demo.json";
  myBtn.addEventListener("click", () => {
    downloadLink.click();
    setTimeout(function(){
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(downloadLink.href);
    }, 100);
  });
}

function changeStrokeWidth(event) {
  var activeObj = canvas.getActiveObject();
  var newStrokeWidth =
    event.value / ((activeObj.scaleX + activeObj.scaleY) / 2);
  activeObj.set({
    strokeWidth: newStrokeWidth,
    strokeWidthUnscaled: event.value,
  });
  activeObj.setCoords();
  canvas.renderAll();
}

function previewCanvas() {
  // console.log("hello");
  // console.log(canvas.getObjects()[0].id);

  // tl.from(canvas.getObjects()[0],{
  //     duration:2,
  // left:-canvas.width,
  // onUpdate: () => canvas.renderAll(),

  // });
  var gsapCode = editor.getValue();
  eval(gsapCode);
  // canvas.loadFromJSON(json,canvas.renderAll.bind(canvas));

  console.log(JSON.stringify(canvas.toDatalessJSON(["id"])));
}

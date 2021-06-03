// function baseGsap(obj, time){
//     gsap.from(obj,{
//         left:canvas.width,
//         opacity:0,
//         duration:time,
//     });
// }
function fromRight(obj,time){
obj.set({"opacity":0});
var left=obj.get("left");
obj.animate({"left":left,"opacity":1},
{
    from:left+200, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function fromLeft(obj,time){

    obj.set({"opacity":0});
    var left=obj.get("left");
    obj.animate({"left":left,"opacity":1},
    {
    duration:time*1000,
    easing: fabric.util.ease.easeIn, 
    from:left-200, 
    onChange: canvas.renderAll.bind(canvas)});
}
function fromUp(obj,time){
    obj.set({"opacity":0});
    var top=obj.get("top");
    obj.animate({"top":top,"opacity":1},
    {
    from:top-200, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function fromDown(obj,time){

    obj.set({"opacity":0});
    var top=obj.get("top");
    obj.animate({"top":top,"opacity":1},
    {
    from:top+200, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function fadeIn(obj,time){ 
    obj.set({"opacity":0});
    obj.animate({"top":top,"opacity":1},
    {
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}

function shiftRight(obj,time){
    obj.set({"opacity":0});
    var left=obj.get("left");
    obj.animate({"left":left,"opacity":1},{
    from:left+20, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function shiftLeft(obj,time){
    obj.set({"opacity":0});
    var left=obj.get("left");
    obj.animate({"left":left,"opacity":1},{
    from:left-20, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function shiftUp(obj,time){
    obj.set({"opacity":0});
    var top=obj.get("top");
    obj.animate({"top":top,"opacity":1},{
    from:top-20, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function shiftDown(obj,time){
    obj.set({"opacity":0});
    var top=obj.get("top");
    obj.animate({"top":top,"opacity":1},{
    from:top+20, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}

function slideRight(obj,time){
    var left=obj.get("left");
    obj.animate({"left":left},{
    from:canvas.width, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function slideLeft(obj,time){
    var left=obj.get("left");
    obj.animate({"left":left},{
    from:-canvas.width, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function slideUp(obj,time){
    var top=obj.get("top");
    obj.animate({"top":top},{
    from:-canvas.height, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function slideDown(obj,time){
    var top=obj.get("top");
    obj.animate({"top":top},{
    from:canvas.height, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}

function zoomIn(obj,time){
    var scaleX=obj.get("scaleX");
    var scaleY=obj.get("scaleY");
    obj.set({"opacity":0,"originX":"center", "originY":"center"});
    obj.animate({"scaleX":scaleX, "scaleY":scaleY, "opacity":1},{
    from:0, 
    duration:time*1000,
    easing: fabric.util.ease.easeOut, 
    onChange: canvas.renderAll.bind(canvas)});
}
function zoomOut(obj,time){
    var scaleX=obj.get("scaleX");
    var scaleY=obj.get("scaleY");
    obj.set({"opacity":0,"originX":"center", "originY":"center"});
    obj.animate({"scaleX":scaleX, "scaleY":scaleY, "opacity":1},{
    from:2, 
    duration:time*1000,
    easing: fabric.util.ease.easeOutSine, 
    onChange: canvas.renderAll.bind(canvas)});
}
function zoomLeft(obj,time){
    gsap.from(obj,{
        left:-canvas.width,
        scaleX:2,
        ScaleY:2,
        opacity:0,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })

    var scaleX=obj.get("scaleX");
    var scaleY=obj.get("scaleY");
    var left=obj.get("left");
    obj.set({"opacity":0,"originX":"center", "originY":"center"});
    obj.animate({"scaleX":scaleX, "scaleY":scaleY, "opacity":1},{
    from:2, 
    duration:time*1000,
    easing: fabric.util.ease.easeOutSine, 
    onChange: canvas.renderAll.bind(canvas)});

    obj.animate({"left":left, "opacity":1},{
    from:-canvas.width, 
    duration:time*1000,
    easing: fabric.util.ease.easeOutSine, 
    onChange: canvas.renderAll.bind(canvas)});
}
function zoomRight(obj,time){
    gsap.from(obj,{
        left:canvas.width,
        scaleX:2,
        ScaleY:2,
        opacity:0,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })
}
function zoomUp(obj,time){
    gsap.from(obj,{
        top:-canvas.height,
        scaleX:2,
        ScaleY:2,
        opacity:0,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })
}
function zoomDown(obj,time){
    gsap.from(obj,{
        top:canvas.height,
        scaleX:2,
        ScaleY:2,
        opacity:0,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })
}

function bounceIn(obj,time){
    gsap.from(obj,{
        scaleX:0,
        ScaleY:0,
        opacity:0,
        ease: Bounce.easeOut,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })
}
function bounceLeft(obj,time){
    gsap.from(obj,{
        left:-canvas.width,
        ease: Bounce.easeOut,
        opacity:0,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })
}
function bounceRight(obj,time){
    gsap.from(obj,{
        left:canvas.width,
        ease: Bounce.easeOut,
        opacity:0,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })
}
function bounceUp(obj,time){
    gsap.from(obj,{
        top:-canvas.height,
        ease: Bounce.easeOut,
        opacity:0,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })
}
function bounceDown(obj,time){
    gsap.from(obj,{
        top:canvas.height,
        ease: Bounce.easeOut,
        opacity:0,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })
}

function rotateIn(obj,time){
    gsap.from(obj,{
        scaleX:0,
        ScaleY:0,
        angle:90,
        opacity:0,
        duration:time,
        onUpdate: () => canvas.renderAll(),

    })
}

// function rollLeft(obj,time){
//     gsap.from(obj,{
//         left:-canvas.width,
//         angle:90,
//         opacity:0,
//         duration:time,
//     })
// }



// Rotate Gradient

// Constants
let angle = 0;
let angleInc = 0.04;

let c1 = 'rgba(245,140,32,1)';
let c2 = 'rgba(255,203,74,1)';

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.elt.style.position = 'fixed';
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');

    mobile = isMobileDevice();

    frameRate(24);

    axis = createVector(windowWidth / 2, windowHeight / 2, 1);
}

function windowResized() {
    if (mobile == false) {
        resizeCanvas(windowWidth, windowHeight);
    }
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function draw() {
    angle += angleInc;

    frameRate(24);
    renderBackground(angle);

}

function renderBackground(angle) {

    noStroke();
    var grdFrom = p5.Vector.lerp(createVector(0, 0), createVector(0, windowHeight), 0);
    var grdTo = p5.Vector.lerp(createVector(windowWidth, 0), createVector(windowWidth, windowHeight), 1);

    var ctx = canvas.drawingContext;
    var grd = ctx.createLinearGradient(grdFrom.x, grdFrom.y, grdTo.x, grdTo.y);
    grd.addColorStop(0, c1);
    grd.addColorStop(1, c2);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(windowWidth, 0);
    ctx.lineTo(windowWidth, windowHeight);
    ctx.lineTo(0, windowHeight);
    ctx.closePath();

    ctx.translate(windowWidth/2, windowHeight/2); // translate to rectangle center 
    ctx.rotate(angle); // rotate
    ctx.translate(-windowWidth/2, -windowHeight/2); // translate back

    ctx.fill();


}



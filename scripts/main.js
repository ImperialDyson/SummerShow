var canvas;
var corr;
var dots = [];
var mobile;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.elt.style.position = 'fixed';
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');

    for (var i = 0; i < 150; i++) {

        let r = random(2, 10); // radius
        let x = random(0 + r, width - r);
        let y = random(0 + r, height - r);
        let a = random(0, 140); // alpha

        dots.push(new Circle(x, y, r, a));
    }

    mobile = isMobileDevice();

    corr = new Corridor();
    updateCorridorSize();

    frameRate(20);
}

function windowResized() {
    if (mobile == false) {
        resizeCanvas(windowWidth, windowHeight);
        updateCorridorSize();
    }
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// TODO: This function needs to be updated to support phone/tablet screen sizes.
function updateCorridorSize(mx, my) {

    if (mobile == false) {
        var doorHeight = (12 / 24) * height;
        var doorWidth = 0.55 * doorHeight;

        if (mx != null && (mx < 0.999 && mx > -0.999)) {
            var scalar = 5;
            corr.setCorridorEnd(100 + mx * scalar, (6 / 24) * height + my * scalar, doorWidth, doorHeight);

        }
        else {
            corr.setCorridorEnd(100, (6 / 24) * height, doorWidth, doorHeight);
            corr.setCorridorStart(0, 0, width * 0.6, height);

        }
    }
    else {
        corr.setCorridorEnd(80, (6 / 24) * height, (8 / 24) * width, (12 / 24) * height);
        corr.setCorridorStart(0, 0, width, height);
    }
}

function draw() {
    background('#F5EB70');

    corr.renderEnd();
    corr.renderRight();
    corr.renderBottom();
    corr.renderLeft();
    corr.renderTop();
    corr.renderLight();
    corr.renderDoor();

    // TODO: This code should ignore mouse when outside acceptable region.
    // This should prevent it from 'considering' the mouse when it is resizing window.
    // This should prevent corridor end from jittering.

    mx = map(mouseX, 0, width, -1, 1);
    my = map(mouseY, 0, height, -1, 1);
    updateCorridorSize(mx, my);

    for (dot of dots) {
        // dot.applyForce(); // add this for extra vectors to apply
        dot.update();
        dot.render();
    }

    if (isMobileDevice()) {
        noStroke();
        fill(color(255, 255, 255, 80));
        rect(0,0,width,height);

        // canvas.filter("blur", 10);
    }
}

class Corridor {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.p1 = createVector();
        this.p2 = createVector();
        this.p3 = createVector();
        this.p4 = createVector();

        this.o1 = createVector(0, 0);
        this.o2 = createVector(width, 0);
        this.o3 = createVector(width, height);
        this.o4 = createVector(0, height);
    }

    setCorridorStart(x, y, w, h) {
        this.o1.x = x;
        this.o1.y = y;
        this.o2.x = x + w;
        this.o2.y = y;
        this.o3.x = x + w;
        this.o3.y = y + h;
        this.o4.x = x;
        this.o4.y = y + h;
    }

    setCorridorEnd(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.p1.x = x;
        this.p1.y = y;
        this.p2.x = x + w;
        this.p2.y = y;
        this.p3.x = x + w;
        this.p3.y = y + h;
        this.p4.x = x;
        this.p4.y = y + h;
    }

    renderEnd() {
        noStroke();
        noFill();
        fill('#EAE9EC');
        rect(this.x, this.y, this.w, this.h);
    }

    renderTop() {
        noStroke();
        fill('#EADC5F');
        quad(this.o1.x, this.o1.y,
            this.o2.x, this.o2.y,
            this.p2.x, this.p2.y,
            this.p1.x, this.p1.y);
    }

    renderRight() {
        noStroke();
        fill('#F5EB70');
        quad(this.p2.x, this.p2.y,
            this.o2.x, this.o2.y,
            this.o3.x, this.o3.y,
            this.p3.x, this.p3.y);
    }

    renderBottom() {
        noStroke();
        fill('#EADC5F');
        quad(this.p4.x, this.p4.y,
            this.p3.x, this.p3.y,
            this.o3.x, this.o3.y,
            this.o4.x, this.o4.y);
    }

    renderLeft() {
        noStroke();
        fill('#D8C851');
        quad(this.o1.x, this.o1.y,
            this.p1.x, this.p1.y,
            this.p4.x, this.p4.y,
            this.o4.x, this.o4.y);
    }

    renderLight() {
        noStroke();
        var grdFrom = p5.Vector.lerp(this.p1, this.p4, 0.5);
        var grdTo = p5.Vector.lerp(this.o2, this.o3, 0.5)

        var ctx = canvas.drawingContext;
        var grd = ctx.createLinearGradient(grdFrom.x, grdFrom.y, grdTo.x, grdTo.y);
        grd.addColorStop(0, 'white');
        grd.addColorStop(0.7, 'rgba(255,255,255,0)');
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.o2.x, this.o2.y);
        ctx.lineTo(this.o3.x, this.o3.y);
        ctx.lineTo(this.p4.x, this.p4.y);
        ctx.closePath();
        ctx.fill();
    }

    renderDoor() {
        noStroke();
        fill('#CAB84A');
        let offsetVert = 80;
        let offsetHorz = 40;
        quad(this.p1.x, this.p1.y,
            this.p1.x + offsetHorz, this.p1.y - offsetVert,
            this.p4.x + offsetHorz, this.p4.y + offsetVert,
            this.p4.x, this.p4.y);
    }
}

class Circle {
    constructor(x, y, radius, alpha) {
        this.pos = createVector(x, y);
        this.radius = radius;
        this.pScale = 0;
        this.alpha = alpha;

        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.drift = createVector(random(-1, 1), random(-1, 1));
    }

    applyForce(vector) {
        if (vector instanceof p5.Vector) {
            this.acc.add(vector);
        } else {
            console.warn("applyForce must take a p5.Vector as argument.");
        }
    }

    update() {
        // Update acceleration
        this.acc.set(0);
        this.acc.add(this.drift);

        // Update velocity
        this.vel.add(this.acc);
        this.vel.limit(0.2);

        // Update position
        this.pos.add(this.vel);
        // Wrap position at window edges
        if (this.pos.x > width + this.radius) {
            this.pos.x = 0 - this.radius;
        }
        if (this.pos.x < 0 - this.radius) {
            this.pos.x = width + this.radius;
        }
        if (this.pos.y > height + this.radius) {
            this.pos.y = 0 - this.radius;
        }
        if (this.pos.y < 0 - this.radius) {
            this.pos.y = height + this.radius;
        }
    }

    render() {
        fill(color(255, 255, 255, this.alpha));
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
}
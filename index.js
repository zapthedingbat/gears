var scene;
var _rootGear;
var _context;
var _target = 0;

function init(){
    var canvas = document.getElementById('canvas');
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    _context = canvas.getContext('2d');

    _rootGear = new Gear(10);

    // Create a gear train
    _gear = _rootGear;
    for(var i = 0; i < 15; i++){
        _gear = _gear.add(Math.ceil(0.5 + Math.random() * 50));
    }
    // Place gears on a frame
    var frame = new Frame(canvas.height, canvas.width);
    _rootGear.accept(frame);

    // Create a scene with the frame
    scene = new Scene(frame, _context);

    renderLoop();

    document.addEventListener('mousemove', (e) => {
        _target = (e.clientX / document.documentElement.offsetWidth) - 0.5;
    });

    setInterval(() => {
        var t = (_target * TWO_PI);
        var r = _rootGear.rotation;
        _rootGear.rotate(((t - _rootGear.rotation) * 0.25));
    }, 100);
}

function render(){
    _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);
    scene.render();
}

function renderLoop(){
    render();
    requestAnimationFrame(renderLoop);
}

/*
 * Gear
 */
function Gear(teeth) {
    this.teeth = teeth;
    this.rotation = 0;
    this.child = null;
}

Gear.prototype.accept = function(visitor) {
    visitor.visit(this);
    if(this.child){
        this.child.accept(visitor);
    }
}

Gear.prototype.rotate = function(radians) {
    this.rotation += radians;
    if(this.child){

        var ratio = (this.teeth / this.child.teeth);

        this.child.rotate(-1 * (radians * ratio));
    }
}

Gear.prototype.add = function(teeth) {
    this.child = new Gear(teeth);
    return this.child;
}















const TWO_PI = 2 * Math.PI;

function Frame(height, width) {
    this.placements = [];
    this._x = width / 2;
    this._y = height / 2;
    this._radius = 0;
}

Frame.prototype.visit = function(gear) {

    // Place the gear
    var radius = gear.teeth * 1.5;
    var angle = Math.random() * TWO_PI;
    var x = this._x + (Math.cos(angle) * (this._radius + radius));
    var y = this._y + (Math.sin(angle) * (this._radius + radius));

    var placement = {
        gear: gear,
        radius: radius,
        x: x,
        y: y,
    };

    this.placements.push(placement);

    this._x = x;
    this._y = y;
    this._radius = radius;
}


function Frame(height, width) {
    this.placements = [];
    this._x = width / 2;
    this._y = height / 2;
    this._radius = 0;
}

Frame.prototype.clear = function() {
    this.placements = [];
}


function Scene(frame, context) {
    this.frame = frame;
    this.context = context;
}

Scene.prototype.drawCircle = function(x, y, radius) {
    this.context.save();
    this.context.lineWidth = 5;
    this.context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, TWO_PI, false);
    this.context.stroke();
    
    this.context.closePath();
    this.context.restore();
}

Scene.prototype.drawGear = function(x, y, radius, teeth, rotation) {

    const teethDepth = 3;
    const toothRad = (TWO_PI / teeth);
    this.context.save();
    this.context.lineJoin = 'bevel';
    this.context.lineWidth = 1;
    this.context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    this.context.fillStyle = 'rgba(255, 255, 255, 0.25)';
    
    this.context.beginPath();
    for(var tooth = 0; tooth < teeth; tooth++) {
        var theta = rotation + (toothRad * tooth);
        var _x = x + ((radius + teethDepth) * Math.sin(theta));
        var _y = y + ((radius + teethDepth) * Math.cos(theta));
        this.context.lineTo(_x, _y);
        theta += (toothRad / 2);
        _x = x + ((radius - teethDepth) * Math.sin(theta));
        _y = y + ((radius - teethDepth) * Math.cos(theta));
        this.context.lineTo(_x, _y);
    }
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    this.context.strokeStyle = 'rgba(255,255,255, 0.25)';
    this.context.beginPath();
    this.context.moveTo(x,y);
    _x = x + ((radius) * Math.sin(rotation));
    _y = y + ((radius) * Math.cos(rotation));
    this.context.lineTo(_x, _y);
    this.context.stroke();
    this.context.closePath();

    this.context.fillText(Math.round((rotation / TWO_PI) * 100), x, y);

    this.context.restore();
}

Scene.prototype.render = function() {

    this.context.lineWidth = 1;
    this.context.strokeStyle = '#888';
    this.frame.placements.forEach(placement => {

    //         const radius = gear.teeth * 2;
    // var angle = Math.random() * TWO_PI;
    // var x = this.gearX + (Math.cos(angle) * (this.gearRadius + radius));
    // var y = this.gearY + (Math.sin(angle) * (this.gearRadius + radius));

        this.drawCircle(placement.x, placement.y, placement.radius);
        this.drawGear(placement.x, placement.y, placement.radius, placement.gear.teeth, placement.gear.rotation);
    }, this);

    // this.context.save();




    // Place the next gear




    // this.context.moveTo(
    //     this.gearX + (radius * Math.sin(gear.rotation)),
    //     this.gearY + (radius * Math.cos(gear.rotation))
    // );
    // this.drawCircle(
    //     this.gearX + (radius * Math.sin(gear.rotation)),
    //     this.gearY + (radius * Math.cos(gear.rotation)));

    // 



    // for(var tooth = 0; tooth < teeth; tooth++) {

    //     // Draw a tooth ridge

    //     var theta = gear.rotation + (toothRad * tooth);
    //     var x = gear.x + (gear.radius * Math.sin(theta));
    //     var y = gear.y + (gear.radius * Math.cos(theta));

    //     this.context.beginPath();
    //     this.context.arc(x, y, 2, 0, TWO_PI, false);
    //     this.context.stroke();
    //     this.context.closePath();

    //     //this.context.lineTo(x, y);
    // }

    // this.context.closePath();

    // //this.context.stroke();

    // this.context.restore();
}

init();
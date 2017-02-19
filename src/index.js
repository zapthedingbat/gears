import { Gear } from './gear';
import { Frame } from './frame';
import { Scene } from './scene';

const TWO_PI = 2 * Math.PI;

var scene;
var _rootGear;
var _context;
var _target = 0;

function render(){
    _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);
    scene.render();
}

function renderLoop(){
    render();
    requestAnimationFrame(renderLoop);
}

var canvas = document.getElementById('canvas');
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;
_context = canvas.getContext('2d');

_rootGear = new Gear(10);

// Create a gear train
var _gear = _rootGear;
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
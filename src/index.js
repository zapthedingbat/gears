import { Gear } from './gear';
import { GearSystem } from './gearsystem';
import { drawGear } from './drawgear';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

const gearSystem = new GearSystem();

const smallGear = new Gear(10);
const midGear = new Gear(20);
const bigGear = new Gear(30);

gearSystem.set(smallGear, midGear);
gearSystem.set(midGear, bigGear);

render();

function render(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    // Iterate all gears
    for(const gear of gearSystem){
        drawGearAt(gear, x, y);
    };

    // Follow gear connections
    gearSystem.follow(smallGear, (a) => {
        drawGearAt(a, x, y);
    });
}

function drawGearAt(gear, x, y){
    drawGear(
        context,
        x, y,
        gear.numberOfTeeth * 2,
        gear.rotation,
        gear.numberOfTeeth
    );
}




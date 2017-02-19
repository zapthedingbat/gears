import { Gear } from './gear';
import { drawGear } from './drawgear';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

const smallGear = new Gear(10);
const bigGear = new Gear(20);

render();

function render(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    drawGearAt(smallGear, x - 30, y);
    drawGearAt(bigGear,  x + 30, y);
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




import { Gear } from './gear';
import { drawGear } from './drawgear';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

const gear = new Gear(10);

render();

function render(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawGear(
        context,
        canvas.width / 2,
        canvas.height / 2,
        gear.numberOfTeeth * 2,
        gear.rotation,
        gear.numberOfTeeth
    );
}




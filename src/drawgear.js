const TWO_PI = Math.PI * 2;
const TOOTH_DEPTH = 3;

export function drawGear(context, x, y, radius, rotation, numberOfTeeth) {
    drawPitch(context, x, y, radius + 5);
    drawTeeth(context, x, y, radius, rotation, numberOfTeeth);
    drawRotation(context, x, y, radius, rotation);
}

function drawPitch(context, x, y, radius){

    context.save();
    context.fillStyle = 'rgba(255, 255, 255, 0.25)';
    
    //context.beginPath();
    context.arc(x, y, radius, 0, TWO_PI, false);
    context.fill();
    //context.closePath();

    context.restore();
}

function drawTeeth(context, x, y, radius, rotation, numberOfTeeth){

    const toothRad = (TWO_PI / numberOfTeeth);

    context.save();
    
    // Draw Teeth
    context.lineJoin = 'bevel';
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    context.fillStyle = 'rgba(255, 255, 255, 0.25)';
    
    context.beginPath();
    for(var tooth = 0; tooth < numberOfTeeth; tooth++) {
        let theta, linex, liney;

        theta = rotation + (toothRad * tooth);
        linex = x + ((radius + TOOTH_DEPTH) * Math.sin(theta));
        liney = y + ((radius + TOOTH_DEPTH) * Math.cos(theta));
        context.lineTo(linex, liney);

        theta += (toothRad / 2);
        linex = x + ((radius - TOOTH_DEPTH) * Math.sin(theta));
        liney = y + ((radius - TOOTH_DEPTH) * Math.cos(theta));
        context.lineTo(linex, liney);
    }
    context.fill();
    context.stroke();
    context.closePath();

    context.restore();
}

function drawRotation(context, x, y, radius, rotation) {
    context.save();

    context.strokeStyle = 'rgba(255,255,255, 0.25)';
    context.beginPath();

    context.moveTo(x,y);
    const linex = x - ((radius) * Math.sin(rotation));
    const liney = y - ((radius) * Math.cos(rotation));
    context.lineTo(linex, liney);

    context.stroke();
    context.closePath();

    context.restore();
}
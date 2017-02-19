const TWO_PI = Math.PI * 2;
const TOOTH_DEPTH = 4;

export function drawGear(context, x, y, radius, rotation, numberOfTeeth) {
    drawPitch(context, x, y, radius);
    drawTeeth(context, x, y, radius, rotation, numberOfTeeth);
    drawRotation(context, x, y, radius, rotation);
}

function drawPitch(context, x, y, radius){
    context.save();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    context.beginPath();
    context.arc(x, y, radius, 0, TWO_PI, false);
    context.stroke();
    context.closePath();
    context.restore();
}

function drawTeeth(context, x, y, radius, rotation, numberOfTeeth){

    const toothRad = (TWO_PI / numberOfTeeth);

    context.save();
    
    context.lineJoin = 'bevel';
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    context.beginPath();

    let startTheta = rotation - (toothRad / 2);
    let startX = x - ((radius - TOOTH_DEPTH) * Math.sin(startTheta * -1));
    let startY = y - ((radius - TOOTH_DEPTH) * Math.cos(startTheta * -1));
    context.moveTo(startX, startY);

    for(var tooth = 0; tooth < numberOfTeeth; tooth++) {
        let theta = rotation + (toothRad * tooth);
        let toothX = x - ((radius + TOOTH_DEPTH) * Math.sin(theta * -1));
        let toothY = y - ((radius + TOOTH_DEPTH) * Math.cos(theta * -1));
        context.lineTo(toothX, toothY);

        theta = rotation + (toothRad / 2) + (toothRad * tooth);
        toothX = x - ((radius - TOOTH_DEPTH) * Math.sin(theta * -1));
        toothY = y - ((radius - TOOTH_DEPTH) * Math.cos(theta * -1));
        context.lineTo(toothX, toothY);
    }

    context.stroke();
    context.closePath();

    context.restore();
}

function drawRotation(context, x, y, radius, rotation) {
    context.save();

    context.strokeStyle = 'rgba(255,255,255, 0.25)';
    context.beginPath();

    context.moveTo(x,y);
    const linex = x - ((radius) * Math.sin(rotation * -1));
    const liney = y - ((radius) * Math.cos(rotation * -1));
    context.lineTo(linex, liney);

    context.stroke();
    context.closePath();

    context.restore();
}
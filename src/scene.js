const TWO_PI = 2 * Math.PI;

export function Scene(frame, context) {
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

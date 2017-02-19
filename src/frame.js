const TWO_PI = 2 * Math.PI;

export function Frame(height, width) {
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

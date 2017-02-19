export class Gear {
    constructor (teeth) {
        this.teeth = teeth;
        this.rotation = 0;
        this.child = null;
    }
    
    accept(visitor) {
        visitor.visit(this);
        if(this.child){
            this.child.accept(visitor);
        }
    }

    rotate(radians) {
        this.rotation += radians;
        if(this.child){

            var ratio = (this.teeth / this.child.teeth);

            this.child.rotate(-1 * (radians * ratio));
        }
    }

    add (teeth) {
        this.child = new Gear(teeth);
        return this.child;
    }
}
export class Gear {
    constructor (numberOfTeeth) {
        this.numberOfTeeth = numberOfTeeth;
        this.rotation = 0;
    }

    rotate(radians) {
        this.rotation += radians;
    }
}
class Vehicle {
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk() {
        return "Beep.";
    }
    toString() {
        return `The vehicle is a ${make} ${model} from 1999`;
    }
}

class Car extends Vehicle{
    constructor(make, model, year){
        super(make, model, year);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle{
    constructor(make, model, year){
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine(){
        return "VROOM!";
    }
}

class Garage {
    constructor(capacity){
        if (typeof capacity === 'number' && capacity > -1){
            this.capacity = capacity;
        } else {
            this.capacity = 1;
        }
        this.vehicles = [];
    }
    add(vehicle){
        if (!(vehicle instanceof Vehicle)){
            throw new Error("Only vehicles are allowed in here!");
        } else if (this.vehicles.length >= this.capacity){
            throw new Error("Sorry, we're full");
        } else {
            this.vehicles.push(vehicle);
        }
    }
}
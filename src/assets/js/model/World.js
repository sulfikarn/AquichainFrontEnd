/* Class representing world, has all buildings inside */
class World extends BasicObject {
    constructor(name, properties) {
        super(name, properties);
        this.buildings = [];
        this.className = 'World';
    }
 
    addBuilding(building) {
        this.buildings.push(building);
        this.emit('BuildingAdded', { building });
    }

    startUpdatingUnits() {
        for (let building of this.buildings) {
            building.startUpdatingUnits();
        }
    }

    checkGeometries() {
        for (let building of this.buildings) {
            building.checkGeometries();
        }
    }

    [Symbol.iterator]() {
        return this.buildings[Symbol.iterator]();
    }
}
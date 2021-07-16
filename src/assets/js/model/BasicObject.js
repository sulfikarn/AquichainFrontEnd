/* Class representing all objects */
class BasicObject extends Observable {
    constructor(name, properties = {}) {
        super();
        this.name = name;
        this.properties = properties;
    }

    getParent() {
        return this.parent;
    }
}
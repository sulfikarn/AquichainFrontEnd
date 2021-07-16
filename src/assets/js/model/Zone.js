class Zone extends BasicObject {
    constructor(name, properties) {
        super(name, properties);
        this.className = 'Zone';
        this.children = [];
    }

    get isVisible() {
        return this._isVisible;
    }

    set isVisible(isVisible) {
        this._isVisible = isVisible;
        this.emit('VisibilityChanged', { isVisible });
    }

    get guiFolder () {
        return this._guiFolder;
    }

    set guiFolder (guiFolder) {
        this._guiFolder = guiFolder;
    } 

    startUpdating() {

    }

    stopUpdating() {

    }

    checkGeometries(){
        
    }

    [Symbol.iterator]() {
        return this.children[Symbol.iterator]();
    }
}
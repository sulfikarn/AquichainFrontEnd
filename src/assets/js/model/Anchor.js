class Anchor extends BasicObject {
    constructor(name, properties) {
        super(name, properties);
        this.className = 'Anchor';
        this.children = [];

        this.position = {
            'x': 0,
            'y': 0,
            'z': 0
        };

        this.labelScale = 1;
    }

    set position(position) {
        this._position = position;
        this.emit('PositionChanged', {
            position
        });
    }

    get position() {
        return this._position;
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

    set labelScale(scale) {
        this._labelScale = scale;
        this.emit('LabelScaleChanged', {
            scale
        });
    }

    get labelScale() {
        return this._labelScale;
    }

    startUpdating() {
        DataLoader.subscribeAnchor(this);
    }

    stopUpdating() {
        DataLoader.unsubscribeAnchor(this);
    }

    checkGeometries(){
        
    }

    [Symbol.iterator]() {
        return this.children[Symbol.iterator]();
    }
}
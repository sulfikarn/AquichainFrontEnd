class TagGhost extends BasicObject {
    constructor(name, properties) {
        super(name, properties);
        this.className = 'TagGhost';
        this.children = [];
        this.position = {
            'x': 0,
            'y': 0,
            'z': 0
        };

        this.rotation = {
            'x': 0,
            'y': 0,
            'z': 0
        };

        this.geometry = TAG_GEOMETRY;
    }

    set position(position) {
        this._position = position;
        this.emit('PositionChanged', { position });
    }

    get position() {
        return this._position;
    }

    set rotation(rotation) {
        this._rotation = rotation;
        this.emit('RotationChanged', {
            rotation
        });
    }

    changeColor(color) {
        this.color = color;
        this.emit('ColorChanged', { color });
    }

    get rotation() {
        return this._rotation;
    }

    set geometry(geometry) {
        this._geometry = geometry;
        this.emit('GeometryChanged', { geometry });
    }

    get geometry() {
        return this._geometry;
    }

    [Symbol.iterator]() {
        return this.children[Symbol.iterator]();
    }
}
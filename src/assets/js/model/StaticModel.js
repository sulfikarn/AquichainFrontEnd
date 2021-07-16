class StaticModel extends BasicObject {
    constructor(name, properties) {
        super(name, properties);
        this.className = 'StaticModel';
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

        this.scale = {
            'x': 1,
            'y': 1,
            'z': 1
        };
    }

    createTransformControls(transform) {
        this.emit('TransformControlCreated', {transform});
    }

    saveGeometry(index) {
        this.emit('GeometrySaveClicked', {index});
    }

    follow(camera) {
        this.emit('Follow', {camera});
    }

    startUpdating() {
        
    }

    stopUpdating() {
        
    }

    [Symbol.iterator]() {
        return this.children[Symbol.iterator]();
    }
}
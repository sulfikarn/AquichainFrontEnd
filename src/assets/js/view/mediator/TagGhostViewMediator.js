class TagGhostViewMediator extends ViewMediator {
    constructor(tagGhost, mediatorFactory) {
        super(tagGhost, mediatorFactory);
        this.basicObject.addObserver('PositionChanged', (e) => this.updatePosition(e.position));
        this.basicObject.addObserver('RotationChanged', (e) => this.onRotationChange(e.rotation));
        this.basicObject.addObserver('GeometryChanged', (e) => this.onGeometryChange(e.geometry));
        this.basicObject.addObserver('ColorChanged', (e) => this.onColorChange(e.color));
    }

    makeObject3D() {
        const container = new THREE.Object3D();

        const mesh = new THREE.Mesh(
            this.basicObject.geometry,
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: .3
            })
        );

        mesh.name = 'mesh';

        mesh.material.color.setHSL(this.basicObject.properties.color.hue, this.basicObject.properties.color.saturation, this.basicObject.properties.color.lightness);

        container.add(mesh);

        return container;
    }

    updatePosition(position) {
        this.object3D.position.x = this.basicObject.position.x;
        this.object3D.position.y = this.basicObject.position.y;
        this.object3D.position.z = this.basicObject.position.z;
    }

    onRotationChange(rotation) {
        //this.object3D.getObjectByName("mesh").rotation.x = -rotation.x * Math.PI / 180;
        this.object3D.getObjectByName('mesh').rotation.y = -(rotation.z + GUI_STATE.north) * Math.PI / 180 ;
        //this.object3D.getObjectByName("mesh").rotation.z = -rotation.y * Math.PI / 180;
    }

    onGeometryChange(geometry) {
        this.object3D.getObjectByName('mesh').geometry = geometry;
    }

    onColorChange(color) {
        this.object3D.getObjectByName('mesh').material.color.setHSL(color.hue, color.saturation, color.lightness);
    }

    onFrameRenderered() {
        super.onFrameRenderered();
    }
}
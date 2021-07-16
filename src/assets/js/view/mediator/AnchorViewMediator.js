class AnchorViewMediator extends ViewMediator {
    constructor(anchor, mediatorFactory) {
        super(anchor, mediatorFactory);
        this.basicObject.addObserver("PositionChanged", (e) => this.onPositionChange(e.position));
        this.basicObject.addObserver("VisibilityChanged", (e) => this.onVisibilityChange(e.isVisible));
        this.basicObject.addObserver("LabelScaleChanged", (e) => this.onLabelScaleChange(e.scale));
    }

    makeObject3D() {
        const container = new THREE.Object3D();
        const coreMesh = new THREE.Mesh(
            ANCHOR_GEOMETRY,
            ANCHOR_MATERIAL
        );

        coreMesh.name = "coreMesh";
        container.position.x = ORIGIN.x;
        container.position.y = ORIGIN.y;
        container.add(coreMesh);
        
        const shadowMesh = new THREE.Mesh(
            ANCHOR_SHADOW_GEOMETRY,
            SHADOW_MATERIAL
        );

        shadowMesh.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        shadowMesh.name = "shadowMesh";
        container.add(shadowMesh);

        var canvas = document.createElement("canvas");
        var size = 1024;
        canvas.width = size;
        canvas.height = size;
        var context = canvas.getContext("2d");
        context.font = "80px Open Sans";
        context.textAlign = "center";
        if (this.basicObject.properties.alias.length) {
            context.fillText(this.basicObject.properties.alias, size / 2, size / 2);
        } else {
            context.fillText(this.basicObject.name, size / 2, size / 2);
        }

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        var material = new THREE.SpriteMaterial({
            map: texture
        });

        var sprite = new THREE.Sprite(material);
        sprite.name = "sprite";
        sprite.scale.set(GUI_STATE.label, GUI_STATE.label, GUI_STATE.label);
        sprite.position.set(0, .5, 0);
        container.add(sprite);

        return container;
    }

    onVisibilityChange(isVisible) {
        this.object3D.visible = isVisible;
    }

    onPositionChange(position) {
        this.object3D.getObjectByName("shadowMesh").position.y = -position.y + 0.01;
        this.object3D.position.x = Number(position.x) + ORIGIN.x;
        this.object3D.position.y = Number(position.y) + ORIGIN.y + 1.2;
        this.object3D.position.z = Number(position.z) + ORIGIN.z;
    }

    onLabelScaleChange(scale) {
        this.object3D.getObjectByName("sprite").scale.set(scale, scale, scale);
    }

    onFrameRenderered() {
        super.onFrameRenderered();
    }
}

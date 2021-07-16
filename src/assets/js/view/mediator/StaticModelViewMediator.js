class StaticModelViewMediator extends ViewMediator {
    constructor(staticModel, mediatorFactory) {
        super(staticModel, mediatorFactory);
        this.basicObject.addObserver('TransformControlCreated', (e) => this.onTransformControlCreated(e.transform));
        this.basicObject.addObserver('GeometrySaveClicked', (e) => this.onGeometrySaveClicked(e.index));
        this.basicObject.addObserver('Follow', (e) => this.onFollow(e.camera));
    }

    makeObject3D() {
        const container = new THREE.Object3D();
		
        var mesh;
		
        if (this.basicObject.properties.index == -1) {
            mesh = new THREE.Mesh(
                ANCHOR_GEOMETRY,
                new THREE.MeshLambertMaterial({
                    color: 0x777
                })
            );
        } else if (this.basicObject.properties.index == -2) {
            mesh = new THREE.Mesh(
                TAG_GEOMETRY,
                new THREE.MeshLambertMaterial({
                    color: 0x777
                })
            );
        } else {
            mesh = new THREE.Mesh(
                CUSTOM_GEOMETRIES[this.basicObject.properties.index].geometry,
                new THREE.MeshLambertMaterial({
                    color: 0x777
                })
            );
        }		

        mesh.name = 'mesh';
        container.add(mesh);

        var gridHelper = new THREE.GridHelper();
        container.add( gridHelper );

        return container;
    }

    onTransformControlCreated(transform) {
        transform.attach(this.object3D.getObjectByName('mesh'));
    }

    onGeometrySaveClicked(index) {
        if (index == -1) {
            ANCHOR_GEOMETRY.scale(
                this.object3D.getObjectByName('mesh').scale.x,
                this.object3D.getObjectByName('mesh').scale.y,
                this.object3D.getObjectByName('mesh').scale.z
            );

            ANCHOR_GEOMETRY.translate(
                this.object3D.getObjectByName('mesh').position.x,
                this.object3D.getObjectByName('mesh').position.y,
                this.object3D.getObjectByName('mesh').position.z
            );

            ANCHOR_GEOMETRY.rotateX(
                this.object3D.getObjectByName('mesh').rotation.x
            );

            ANCHOR_GEOMETRY.rotateY(
                this.object3D.getObjectByName('mesh').rotation.y
            );

            ANCHOR_GEOMETRY.rotateZ(
                this.object3D.getObjectByName('mesh').rotation.z
            );

            return;
        }

        if (index == -2) {
            TAG_GEOMETRY.scale(
                this.object3D.getObjectByName('mesh').scale.x,
                this.object3D.getObjectByName('mesh').scale.y,
                this.object3D.getObjectByName('mesh').scale.z
            );

            TAG_GEOMETRY.translate(
                this.object3D.getObjectByName('mesh').position.x,
                this.object3D.getObjectByName('mesh').position.y,
                this.object3D.getObjectByName('mesh').position.z
            );

            TAG_GEOMETRY.rotateX(
                this.object3D.getObjectByName('mesh').rotation.x
            );

            TAG_GEOMETRY.rotateY(
                this.object3D.getObjectByName('mesh').rotation.y
            );

            TAG_GEOMETRY.rotateZ(
                this.object3D.getObjectByName('mesh').rotation.z
            );

            return;
        }

        CUSTOM_GEOMETRIES[index].geometry.scale(
            this.object3D.getObjectByName('mesh').scale.x,
            this.object3D.getObjectByName('mesh').scale.y,
            this.object3D.getObjectByName('mesh').scale.z
        );

        CUSTOM_GEOMETRIES[index].geometry.translate(
            this.object3D.getObjectByName('mesh').position.x,
            this.object3D.getObjectByName('mesh').position.y,
            this.object3D.getObjectByName('mesh').position.z
        );

        CUSTOM_GEOMETRIES[index].geometry.rotateX(
            this.object3D.getObjectByName('mesh').rotation.x
        );

        CUSTOM_GEOMETRIES[index].geometry.rotateY(
            this.object3D.getObjectByName('mesh').rotation.y
        );

        CUSTOM_GEOMETRIES[index].geometry.rotateZ(
            this.object3D.getObjectByName('mesh').rotation.z
        );
    }

    onFollow(camera) {
        this.object3D.add(camera);
    }

    onFrameRenderered() {
        super.onFrameRenderered();
    }
}
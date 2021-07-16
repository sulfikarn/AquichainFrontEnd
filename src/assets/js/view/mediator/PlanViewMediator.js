class PlanViewMediator extends ViewMediator {
    constructor(plan, mediatorFactory) {
        super(plan, mediatorFactory);
        this.basicObject.addObserver("UnitAdded", (e) => this.onUnitAdded(e));
        this.basicObject.addObserver("UnitRemoved", (e) => this.onUnitRemoved(e));
        this.basicObject.addObserver("PlanVisibilityChanged", (e) => this.onPlanVisibilityChange(e.isVisible));
        this.basicObject.addObserver("OffsetChanged", (e) => this.onOffsetChange(e.offset));
        this.basicObject.addObserver("GeometryChanged", (e) => this.onGeometryChanged(e.geometry));
        this.createFloor();
    }

    onUnitAdded(e) {
        this.addChild(e.unit);
    }

    onUnitRemoved(e) {
        this.removeChild(e.unit);
    }

    onPlanVisibilityChange(isVisible) {
        this.object3D.visible = isVisible;
    }

    onOffsetChange(offset) {
        this.object3D.position.x = offset.x;
        this.object3D.position.z = offset.y;

        // shift floor to (0,0,0)
        let floor;

        for (var child of this.object3D.children) {
            floor = child.getObjectByName("floor");
        }

        if (floor) {
            floor.position.x = - offset.x;
            floor.position.z = - offset.y;
        }
    }

    onGeometryChanged(geometry) {
        let mesh;

        for (var child of this.object3D.children) {
            mesh = child.getObjectByName("planMesh");
        }

        if (!geometry) {
            if (mesh) {
                this.object3D.remove(mesh);
            }

            return;
        }

        if (!mesh) {
            let mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                transparent: true,
                opacity: PLAN_OPACITY
            }));

            mesh.name = "planMesh";
            this.object3D.add(mesh);
        } else {
            mesh.geometry = geometry;
        }
    }

    createFloor() {
        var self = this;
        let mtlLoader = new MTLLoader();
      //  console.log(mtlLoader);
        let objLoader = new THREE.OBJLoader();
          mtlLoader.load('./warehouse-ACN-v3.mtl', (materialsResult) => {
            objLoader.setMaterials(materialsResult);
            objLoader.load('./warehouse-ACN-v3.obj',
                (obj) => {
                    obj.scale.set(0.0045,0.0045,0.0045);
                    obj.position.x = ORIGIN.x - 3;
                    obj.position.y = ORIGIN.y;
                    self.object3D.add(obj);
                }
             );
          });
    }
}

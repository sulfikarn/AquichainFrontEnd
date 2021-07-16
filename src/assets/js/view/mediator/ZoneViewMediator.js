class ZoneViewMediator extends ViewMediator {
  constructor(zone, mediatorFactory) {
    super(zone, mediatorFactory);
    this.basicObject.addObserver('VisibilityChanged', (e) => this.onVisibilityChange(e.isVisible));
    this.basicObject.addObserver('OffsetChanged', (e) => this.onOffsetChange(e.offset));
  }

  makeObject3D(){
    const container = new THREE.Object3D();
        const zoneShape = new THREE.Shape(this.basicObject.properties.points);
        const extrudeSettings = { depth: 0.1, bevelEnabled: false };
        const extrudeGeometry = new THREE.ExtrudeGeometry(zoneShape, extrudeSettings);
        const mesh = new THREE.Mesh(
            extrudeGeometry,
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: .3,
                depthWrite: false
            })
        );
        mesh.rotation.x = Math.PI / 2;
        mesh.geometry.computeBoundingBox();
        var middle = {};
        middle.x = (mesh.geometry.boundingBox.max.x + mesh.geometry.boundingBox.min.x) / 2;
        middle.y = (mesh.geometry.boundingBox.max.y + mesh.geometry.boundingBox.min.y) / 2;
        middle.z = (mesh.geometry.boundingBox.max.z + mesh.geometry.boundingBox.min.z) / 2;
        container.position.y = .001;
        container.position.x = ORIGIN.x;
        container.position.y = ORIGIN.y;
        var textGeometry = new THREE.TextGeometry(this.basicObject.name.split(" ").join("\n"), {
            font: font,
            size: 0.4,
            height: 0
        });
        var textMaterial = new THREE.MeshPhongMaterial(
            { color: 0x000000, specular: 0x000000 }
        );
        var textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.name = "label-" + this.basicObject.name;
textMesh.position.set(LABEL_POSITIONS[this.basicObject.name].x , LABEL_POSITIONS[this.basicObject.name].y, LABEL_POSITIONS[this.basicObject.name].z);
        textMesh.rotation.x = - Math.PI / 2;
        container.add(textMesh);
         // Create a texture loader so we can load our image file
         var loader = new THREE.TextureLoader();
         // Load an image file into a custom material
         var material = new THREE.MeshBasicMaterial({
             map: loader.load('js/warning.png'),
             transparent: true,
             depthWrite: false,
             side: THREE.DoubleSide
         });
         // create a plane geometry for the image with a width of 1
         // and a height that preserves the image's aspect ratio
         var geometry = new THREE.PlaneGeometry(1, 1 * .75);
         // combine our image geometry and material into a mesh
        // Loading alert icon
        // Starts here
        let sewioZoneId = this.basicObject.properties.id;
        setInterval(() => {
            container.remove(container.getObjectByName("warn-" + this.basicObject.name));
            container.remove(container.getObjectByName("warnC-" + this.basicObject.name));
            let alertZones = JSON.parse(localStorage.getItem("alertZone"));
            alertZones.forEach((zone) => {
                if (sewioZoneId === zone.zoneId) {
                    const imageMesh = new THREE.Mesh(geometry, material);
                    imageMesh.name = "warn-" + this.basicObject.name;
                    imageMesh.position.set(middle.x, 2, middle.y);
                    imageMesh.needsUpdate = true;
                    var _this = this;
                    container.add(imageMesh);
                    // use this to call local storage 30 s
                    var counts = zone.alertCount.toString();;
                    var textGeometry = new THREE.TextGeometry(counts, {
                        font: font,
                        size: 0.3,
                        height: 0
                    });
                    var textMaterial = new THREE.MeshPhongMaterial(
                         { color: LABEL_POSITIONS[this.basicObject.name].color, specular: 0xffffff }
                     );
                     textMesh = new THREE.Mesh(textGeometry, textMaterial);
                    textMesh.name = "warnC-" + _this.basicObject.name;
                    textMesh.position.set(middle.x, 2.5, middle.y);
                    container.add(textMesh);
                }
            });
        }, 500);
        container.add(mesh);
          return container;
  }

onVisibilityChange(isVisible) {
  this.object3D.visible = isVisible;
}

onOffsetChange(offset) {
  let edges = this.object3D.getObjectByName('edges');

  edges.position.x = -offset.x;
  edges.position.y = -offset.y;
}

onFrameRenderered() {
  super.onFrameRenderered();
}
}

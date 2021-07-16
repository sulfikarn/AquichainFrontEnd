class ObjectPicker extends Observable {
    constructor(mediator, renderingContext) {
        super();
        this.mediator = mediator;
        this.renderingContext = renderingContext;
    }

    initialize() {
        this.raycaster = new THREE.Raycaster();

        this.startTime = 0;

        this.renderingContext.renderer.domElement.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.renderingContext.renderer.domElement.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    onMouseDown(e) {
        this.startTime = new Date().getTime();
    }

    onMouseUp(e) {
        if (new Date().getTime() - this.startTime < 100) {
            this.onClick(e);
        }
    }

    onClick(e) {
        e.preventDefault();
        const selectedObject = this.getIntersection(e);
        this.emit('click', { selectedObject });
    }

    getIntersection(e) {
        var mouse = {};
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera(mouse, this.renderingContext.camera);
        let intersects = this.raycaster.intersectObjects(this.renderingContext.scene.children, true);

        let originalObject = null;

        if (intersects[0]) {
            originalObject = intersects[0].object.parent;
        }

        return originalObject;
    }
}
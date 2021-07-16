class MainView {
    constructor(controller, world) {
        this.controller = controller;
        this.world = world;
        this.renderingContext = this.createRenderingContext();
        this.worldViewMediator = new WorldViewMediator(world, new ViewMediatorFactory());
        this.objectPicker = new ObjectPicker(this.worldViewMediator, this.renderingContext);
        this.gui = new Gui(this.worldViewMediator, this.renderingContext);
        //this.stats = new Stats();
    }

    createRenderingContext() {
        const domContainer = document.createElement('div');
        document.getElementById('canvas').appendChild(domContainer);
        return RenderingContext.getDefault(domContainer);
    }

    initialize() {
        var self = this;
        const scene = this.renderingContext.scene;
        const object3D = this.worldViewMediator.object3D;

        scene.add(object3D);

        /** Pradeep - Customiization - Start */
        // this.stats.showPanel(0);
        // this.stats.dom.style.left = '5px';
        // $(this.stats.dom).addClass('stats');

        // document.getElementById('canvas').appendChild( this.stats.dom );

        // this.gui.initialize();

        // this.gui.addObserver('toggleAnchors', (e) => this.controller.onToggleVisibility(e.toggleValue, 'Anchor'));
        // this.gui.addObserver('toggleTags', (e) => this.controller.onToggleVisibility(e.toggleValue, 'Tag'));
        // this.gui.addObserver('toggleZones', (e) => this.controller.onToggleVisibility(e.toggleValue, 'Zone'));
        // this.gui.addObserver('toggleStats', (e) => this.controller.onToggleVisibility(e.toggleValue, 'Stats'));
        // this.gui.addObserver('toggleInactive', (e) => this.controller.onToggleVisibility(e.toggleValue, 'Inactive'));
        // this.gui.addObserver('recordsCountChange', (e) => this.controller.onRecordsCountChange(e.newCount));
        // this.gui.addObserver('northOffsetChange', (e) => this.controller.onNorthOffsetChange());
        // this.gui.addObserver('labelScaleChange', (e) => this.controller.onLabelScaleChange(e.newScale));
        // this.gui.addObserver('filterChange', (e) => this.controller.onFilterChange(e.filter));
    /** Pradeep - Customiization - End */
        this.objectPicker.initialize();
        this.objectPicker.addObserver('click', (e) => this.controller.onClick(e.selectedObject));

        window.addEventListener( 'resize', (e) => this.onWindowResize(), false );
    }

    /* Main rendering Three.js cycle */
    render() {
        // this.stats.begin();
        this.renderingContext.controls.update();
        this.renderingContext.transform.update();
        TWEEN.update();
        this.worldViewMediator.onFrameRenderered();
        this.renderingContext.renderer.render(this.renderingContext.scene, this.renderingContext.camera);
        // this.stats.end();

        requestAnimationFrame(() => this.render());
    }

    onWindowResize(){
        this.renderingContext.camera.aspect = window.innerWidth / window.innerHeight;
        this.renderingContext.camera.updateProjectionMatrix();

        this.renderingContext.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
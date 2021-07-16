class RenderingContext {
    constructor(scene, camera, renderer, controls, transform) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.controls = controls;
        this.transform = transform;
    }

    static getDefault(containerElement) {
        const width = window.innerWidth,
            height = window.innerHeight;
        const scene = new THREE.Scene();
        //scene.background = new THREE.Color(0xffffff);

        const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
        const renderer = new THREE.WebGLRenderer({
            antialias: ANTIALIAS
        });

        renderer.setClearColor( 0xffffff, 1);
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target = new THREE.Vector3(DEFAULT_CAMERA_TAR[0], DEFAULT_CAMERA_TAR[1], DEFAULT_CAMERA_TAR[2]);

        const transform = new THREE.TransformControls(camera, renderer.domElement);
        //scene.add(transform);

        camera.position.x = DEFAULT_CAMERA_POS[0];
        camera.position.y = DEFAULT_CAMERA_POS[1];
        camera.position.z = DEFAULT_CAMERA_POS[2];
        renderer.setSize(width, height);
        scene.add(new THREE.AmbientLight(0xaaaaaa));

        const light = new THREE.DirectionalLight(0xffffff, .6);
        light.position.set(0, 15, 0);
        scene.add(light);

        /* HELPERS */
        //scene.add(new THREE.GridHelper(50, 50));

        containerElement.appendChild(renderer.domElement);

        return new RenderingContext(scene, camera, renderer, controls, transform);
    }
}
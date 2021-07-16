// Create the scene and a camera to view it
var scene = new THREE.Scene();
/**
* Camera
**/

// Specify the portion of the scene visiable at any time (in degrees)
var fieldOfView = 75;

// Specify the camera's aspect ratio
var aspectRatio = window.innerWidth / window.innerHeight;

// Specify the near and far clipping planes. Only objects
// between those planes will be rendered in the scene
// (these values help control the number of items rendered
// at any given time)
var nearPlane = 0.1;
var farPlane = 1000;

// Use the values specified above to create a camera
var camera = new THREE.PerspectiveCamera(
  fieldOfView, aspectRatio, nearPlane, farPlane
);

// Finally, set the camera's position in the z-dimension
camera.position.z = 5;

/**
* Renderer
**/

// Create the canvas with a renderer
var renderer = new THREE.WebGLRenderer({antialias: true});

// Specify the size of the canvas
renderer.setSize( window.innerWidth, window.innerHeight );

// Add the canvas to the DOM
document.body.appendChild( renderer.domElement );

/**
* Image
**/

// Create a texture loader so we can load our image file
var loader = new THREE.TextureLoader();

// Load an image file into a custom material
var material = new THREE.MeshLambertMaterial({
  map: loader.load('Warehouse Layout.png')
});

console.log(material);

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var geometry = new THREE.PlaneGeometry(10, 10*.75);

// combine our image geometry and material into a mesh
var mesh = new THREE.Mesh(geometry, material);

// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(0,0,0)

// add the image to the scene
scene.add(mesh);

/**
* small spheres
*/

var geometry = new THREE.SphereGeometry( 0.05, 32, 32 );

const container = new THREE.Object3D();
const mesh3d = new THREE.Object3D();
mesh3d.name = 'mesh';

container.add(mesh3d);

const coreMesh = new THREE.Mesh(
	geometry,
	new THREE.MeshLambertMaterial()
);
       
coreMesh.name = 'coreMesh';
mesh3d.add(coreMesh);

const highlightMesh = new THREE.Mesh(
	geometry,
	new THREE.MeshBasicMaterial({
		color: 0xff0000,
		transparent: true,
		opacity: .2
	})
);

highlightMesh.material.visible = false;
highlightMesh.name = 'highlightMesh';
mesh3d.add(highlightMesh);

const shadowMesh = new THREE.Mesh(
	TAG_SHADOW_GEOMETRY,
	SHADOW_MATERIAL
);

shadowMesh.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
shadowMesh.name = 'shadowMesh';
mesh3d.add(shadowMesh);
container.add(mesh3d);

//container.position.set(50,50,100);
//console.log(container.position);
scene.add(container);

/**
* Lights
**/

// Add a point light with #fff color, .7 intensity, and 0 distance
var light = new THREE.PointLight( 0xffffff, 1, 0 );

// Specify the light's position
light.position.set(1, 1, 100 );

// Add the light to the scene
scene.add(light)

/**
* Render!
**/

// The main animation function that re-renders the scene each animation frame
function animate() {
requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();
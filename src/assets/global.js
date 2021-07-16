/* GLOBAL VARS */
const SEWIO_HOST = 'viera-rtls.netobjex.com';  //'demo.sewio.net';

var TAG_GEOMETRY = new THREE.SphereBufferGeometry(.1, 32, 32);
const TAG_SHADOW_GEOMETRY = new THREE.CircleBufferGeometry(.1,32);

var ANCHOR_GEOMETRY = new THREE.SphereBufferGeometry(.15, 32, 32);
const ANCHOR_SHADOW_GEOMETRY = new THREE.CircleBufferGeometry(.15,32);
const ANCHOR_MATERIAL = new THREE.MeshLambertMaterial({
  color: '#92c462'
});

const SHADOW_MATERIAL = new THREE.MeshBasicMaterial({
  color: '#aaaaaa',
  transparent: true,
  opacity: .5
});

var CUSTOM_GEOMETRIES = [];
var FREE_TAGS = [];

const OBJ_LOADER = new THREE.OBJLoader();

var UNFOLLOW_BUTTON;

var DEFAULT_CAMERA_POS = [0, 22, 22];
var DEFAULT_CAMERA_TAR = [0, 0, 5];
var DEFAULT_LABEL_HEIGHT = .5;

var DEFAULT_BUILDING = localStorage.getItem('sewio-sensmap3d-building') ? localStorage.getItem('sewio-sensmap3d-building') : null;
var DEFAULT_PLAN = localStorage.getItem('sewio-sensmap3d-plan') ? localStorage.getItem('sewio-sensmap3d-plan') : null;

var ORIGIN = {
  x : -11,
  y : 5,
  z : 0
};

const LABEL_POSITIONS = [];

LABEL_POSITIONS['Flammable store'] = {x: 2, y: 0.1, z: 8, color: 0x3D6B01};
LABEL_POSITIONS['Cold Room'] = {x: 8, y: 0.1, z: 8, color: 0x6C0102};
LABEL_POSITIONS['Oven Room'] = {x: 14, y: 0.1, z: 8, color: 0x124F90};
LABEL_POSITIONS['Dry Store'] = {x: 19.5, y: 0.1, z: 8, color: 0xD94C3E};
LABEL_POSITIONS['Raw Material Storage'] = {x: 2.5, y: 0.1, z: 4, color: 0x497B63};
LABEL_POSITIONS['Blender Area'] = {x: 14.5, y: 0.1, z: 2, color: 0x9F0052};
LABEL_POSITIONS['Haz Area'] = {x: 7.3, y: 0.1, z: 2, color: 0x783884};
LABEL_POSITIONS['Shop Floor'] = {x: 11, y: 0.1, z: 2, color: 0x824B22};
LABEL_POSITIONS['Packaging Area'] = {x: 19, y: 0.1, z: 4.5, color: 0x245100};
LABEL_POSITIONS['Finished Goods'] = {x: 19, y: 0.1, z: 0.3, color: 0xDD6602};

var EDITED_OBJECT = {
  active: false,
  index: 0,
  object: null
};

var FILTERED_MACS = [];

var GUI_STATE = {
  anchors:     localStorage.getItem('sewio-sensmap3d-anchors')    ? JSON.parse(localStorage.getItem('sewio-sensmap3d-anchors'))  : true,
  tags:        localStorage.getItem('sewio-sensmap3d-tags')       ? JSON.parse(localStorage.getItem('sewio-sensmap3d-tags'))     : true,
  zones:       localStorage.getItem('sewio-sensmap3d-zones')      ? JSON.parse(localStorage.getItem('sewio-sensmap3d-zones'))    : true,
  stats:       localStorage.getItem('sewio-sensmap3d-stats')      ? JSON.parse(localStorage.getItem('sewio-sensmap3d-stats'))    : true,
  inactive:    localStorage.getItem('sewio-sensmap3d-inactive')   ? JSON.parse(localStorage.getItem('sewio-sensmap3d-inactive')) : false,
  presence:    localStorage.getItem('sewio-sensmap3d-presence')   ? JSON.parse(localStorage.getItem('sewio-sensmap3d-presence')) : false,
  three:       localStorage.getItem('sewio-sensmap3d-three')      ? JSON.parse(localStorage.getItem('sewio-sensmap3d-three'))    : true,
  trajectory:  localStorage.getItem('sewio-sensmap3d-trajectory') ? parseInt(localStorage.getItem('sewio-sensmap3d-trajectory')) : 10,
  label:       localStorage.getItem('sewio-sensmap3d-label')      ? parseInt(localStorage.getItem('sewio-sensmap3d-label'))      : 3,
  north:       localStorage.getItem('sewio-sensmap3d-north')      ? parseInt(localStorage.getItem('sewio-sensmap3d-north'))      : 0,
  savedColors: localStorage.getItem('sewio-sensmap3d-colors')     ? JSON.parse(localStorage.getItem('sewio-sensmap3d-colors'))   : {}
};

var ANTIALIAS = false;
var PLAN_OPACITY = .9;
var VALID_ZONES = [];

var INITIALIZED = false;

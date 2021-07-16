class TagViewMediator extends ViewMediator {
  constructor(tag, mediatorFactory) {
    super(tag, mediatorFactory);
    this.basicObject.addObserver('PositionChanged', (e) => this.onPositionChange(e.position, this.basicObject.properties.alias));
    this.basicObject.addObserver('RotationChanged', (e) => this.onRotationChange(e.x, e.y, e.z, e.w));
    this.basicObject.addObserver('VisibilityChanged', (e) => this.onVisibilityChange(e.isVisible));
    this.basicObject.addObserver('GeometryChanged', (e) => this.onGeometryChange(e.geometry));
    this.basicObject.addObserver('ColorChanged', (e) => this.onColorChange(e.color));
    this.basicObject.addObserver('LabelScaleChanged', (e) => this.onLabelScaleChange(e.scale));
    this.basicObject.addObserver('ButtonPressed', (e) => this.onButtonPressed());
    this.basicObject.addObserver('DistanceChanged', (e) => this.onDistanceChange(e.distance));

    this.basicObject.addObserver('GhostAdded', (e) => this.onGhostAdded(e.ghost));
    this.basicObject.addObserver('GhostRemoved', (e) => this.onGhostRemoved(e.ghost));
    this.basicObject.addObserver('Follow', (e) => this.onFollow(e.camera));

    this.onPositionChange(this.basicObject.position);

    let date = new Date();
    this.lastTime = date.getTime();
  }

  makeObject3D() {
    const container = new THREE.Object3D();
    const mesh = new THREE.Object3D();
    mesh.name = 'mesh';
    container.position.x = ORIGIN.x;
    container.position.y = ORIGIN.y;
    container.add(mesh);

    const coreMesh = new THREE.Mesh(
      this.basicObject.geometry,
      new THREE.MeshLambertMaterial()
    );

    coreMesh.material.color.setHSL(this.basicObject.color.hue, this.basicObject.color.saturation, this.basicObject.color.lightness);
    coreMesh.name = 'coreMesh';
    mesh.add(coreMesh);

    const highlightMesh = new THREE.Mesh(
      this.basicObject.geometry,
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: .2
      })
    );

    highlightMesh.material.visible = false;
    highlightMesh.name = 'highlightMesh';
    mesh.add(highlightMesh);

    const shadowMesh = new THREE.Mesh(
      TAG_SHADOW_GEOMETRY,
      SHADOW_MATERIAL
    );

    shadowMesh.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    shadowMesh.name = 'shadowMesh';
    mesh.add(shadowMesh);

    let width = 1400;
    let height = 1200;

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    let context = this.canvas.getContext('2d');

    context.fillStyle = '#92c462';
    context.globalAlpha = 0.4;
    GUI_STATE.stats ? context.fillRect(0,0,width,height/2 - 80) : context.fillRect(0,0,width,height/4 - 80);
    context.globalAlpha = 1;

    context.font = '80pt Open Sans';
    context.textAlign = 'center';
    context.fillStyle = '#000';

    if (this.basicObject.properties.alias.length) {
      context.fillText(this.basicObject.properties.alias, width / 2, height / 8);
    } else {
      context.fillText(this.basicObject.name, width / 2, height / 8);
    }

    this.distance = '0 m';
    this.speed = '0 m/s';

    context.font = '40pt Open Sans';
    // GUI_STATE.stats ? context.fillText(this.distance, width / 2, (2 * height) / 8) : null;
    // GUI_STATE.stats ? context.fillText(this.speed, width / 2, (3 * height) / 8) : null;

    var canvasTexture = new THREE.Texture(this.canvas);
    canvasTexture.needsUpdate = true;

    var canvasMaterial = new THREE.SpriteMaterial({
      map: canvasTexture
    });

    var sprite = new THREE.Sprite(canvasMaterial);
    sprite.name = 'sprite';

    sprite.scale.set(GUI_STATE.label, GUI_STATE.label, GUI_STATE.label);
    GUI_STATE.stats ? sprite.position.set(0, GUI_STATE.label / 3 + 0.2, 0) : sprite.position.set(0, GUI_STATE.label / 5 + 0.2, 0);

    if(this.basicObject.properties.alias && ( this.basicObject.properties.alias.indexOf("ForkLift") === -1 && this.basicObject.properties.alias.indexOf("Personnel") === -1)) {
      mesh.add(sprite);
    }
     container.visible = false;

    return container;
  }

  onVisibilityChange(isVisible) {
    this.object3D.visible = true;
  }

  onPositionChange(position, alias) {
    // this.object3D.getObjectByName('mesh').getObjectByName('shadowMesh').position.y = - position.y + 0.01;
    if(alias && ( alias.indexOf("ForkLift") !== -1 || alias.indexOf("Personnel") !== -1)) {
      if(this.object3D.getObjectByName('mesh').position.x > position.x){
        this.object3D.getObjectByName('mesh').rotation.y = -Math.PI/2;
      }else if(this.object3D.getObjectByName('mesh').position.x < position.x){
        this.object3D.getObjectByName('mesh').rotation.y = Math.PI/2;
      }else if(this.object3D.getObjectByName('mesh').position.z > position.z){
        this.object3D.getObjectByName('mesh').rotation.y = Math.PI;
      }else if(this.object3D.getObjectByName('mesh').position.z < position.z){
        this.object3D.getObjectByName('mesh').rotation.y = 0;
      }
      position.y = 0.1;
    }else{
      this.object3D.getObjectByName('mesh').getObjectByName('shadowMesh').position.y = - position.y + 0.01;
    }
    this.object3D.getObjectByName('mesh').position.x = position.x;
    this.object3D.getObjectByName('mesh').position.y = position.y;
    this.object3D.getObjectByName('mesh').position.z = position.z;
  }

  onRotationChange(x,y,z,w) {
    let newQuaternion = new THREE.Quaternion().set(x,y,z,w);

    this.object3D.getObjectByName('coreMesh').quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0), GUI_STATE.north * Math.PI / 180);
    this.object3D.getObjectByName('coreMesh').quaternion.multiply(newQuaternion);

    this.object3D.getObjectByName('highlightMesh').quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0), GUI_STATE.north * Math.PI / 180);
    this.object3D.getObjectByName('highlightMesh').quaternion.multiply(newQuaternion);
  }

  onGhostAdded(ghost) {
    this.addChild(ghost);
  }

  onGhostRemoved(ghost) {
    this.removeChild(ghost);
  }

  onFollow(camera) {
    this.object3D.getObjectByName('mesh').add(camera);
  }

  onGeometryChange(geometry) {
    this.object3D.getObjectByName('coreMesh').geometry = geometry;
    this.object3D.getObjectByName('highlightMesh').geometry = geometry;
  }

  onLabelScaleChange(scale) {
    this.object3D.getObjectByName('sprite').position.y = scale / 3 + 0.2;
    this.object3D.getObjectByName('sprite').scale.set(scale,scale,scale);

    //this.object3D.getObjectByName("nameSprite").scale.set(scale, scale, scale);
    //this.object3D.getObjectByName("distanceSprite").scale.set(scale, scale, scale);
    //this.object3D.getObjectByName("speedSprite").scale.set(scale, scale, scale);
  }

  onColorChange(color) {
    this.object3D.getObjectByName('coreMesh').material.color.setHSL(color.hue, color.saturation, color.lightness);
  }

  onDistanceChange(distance) {
    /*let context = this.distanceCanvas.getContext('2d');
    context.clearRect(0, 0, this.distanceCanvas.width, this.distanceCanvas.width);
    context.fillText(Math.round(distance) + " m", this.distanceCanvas.width/2, this.distanceCanvas.height/2);
    this.object3D.getObjectByName("distanceSprite").material.map.needsUpdate = true;*/

    this.distance = Math.round(distance) + ' m';
    this.redrawStatus();
  }

  onSpeedChange() {
    this.speed = (Math.round(((this.basicObject.distance - this.basicObject.lastDistance) / 3) * 100) / 100) + ' m/s';
    this.basicObject.lastDistance = this.basicObject.distance;
    this.redrawStatus();

    /*let context = this.speedCanvas.getContext('2d');
    context.clearRect(0, 0, this.speedCanvas.width, this.speedCanvas.width);
    context.fillText((Math.round(speed * 100) / 100) + " m/s", this.speedCanvas.width/2, this.speedCanvas.height/2);
    this.object3D.getObjectByName("speedSprite").material.map.needsUpdate = true;*/
  }

  redrawStatus() {
    let context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    context.fillStyle = '#92c462';
    context.globalAlpha = 0.4;
    GUI_STATE.stats ? context.fillRect(0,0,this.canvas.width,this.canvas.height/2 - 80) : context.fillRect(0,0,this.canvas.width,this.canvas.height/4 - 80);
    context.globalAlpha = 1;

    context.font = '80pt Roboto';
    context.textAlign = 'center';
    context.fillStyle = '#000';

    if (this.basicObject.properties.alias.length) {
      context.fillText(this.basicObject.properties.alias, this.canvas.width / 2, this.canvas.height / 8);
    } else {
      context.fillText(this.basicObject.name, this.canvas.width / 2, this.canvas.height / 8);
    }

    context.font = '60pt Roboto';
    GUI_STATE.stats ? context.fillText(this.distance, this.canvas.width / 2, (2 * this.canvas.height) / 8) : null;
    GUI_STATE.stats ? context.fillText(this.speed, this.canvas.width / 2, (3 * this.canvas.height) / 8) : null;

    if(this.basicObject.properties.alias && ( this.basicObject.properties.alias.indexOf("ForkLift") === -1 && this.basicObject.properties.alias.indexOf("Personnel") === -1)) {
    this.object3D.getObjectByName('sprite').material.map.needsUpdate = true;
  }
  }

  onButtonPressed() {
    var self = this;

    if (this.basicObject.highlightTween) {
      this.basicObject.highlightTween.stop();
      TWEEN.remove(this.basicObject.highlightTween);
    }

    this.object3D.getObjectByName('highlightMesh').scale.set(1,1,1);
    this.object3D.getObjectByName('highlightMesh').material.visible = true;
    this.basicObject.highlightTween = new TWEEN.Tween( this.object3D.getObjectByName('highlightMesh').scale ).to({ x: 4, y: 4, z: 4 } , 1000).repeat(1).yoyo(true).start().onComplete(function() {
      self.object3D.getObjectByName('highlightMesh').material.visible = false;
    });
  }

  onStatsChange(value) {
    let scale;

    if (value) {
      scale = (this.object3D.getObjectByName('sprite').position.y - 0.2) * 5;
      this.object3D.getObjectByName('sprite').position.y = scale / 3 + 0.2;
    } else {
      scale = (this.object3D.getObjectByName('sprite').position.y - 0.2) * 3;
      this.object3D.getObjectByName('sprite').position.y = scale / 5 + 0.2;
    }

    this.redrawStatus();
  }

  onFrameRenderered() {
    let date = new Date();
    let time = date.getTime();

    if (time - this.lastTime >= 3000) {
      this.lastTime = date.getTime();
      this.onSpeedChange();
    }

    super.onFrameRenderered();
  }
}

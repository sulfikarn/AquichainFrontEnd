class Tag extends BasicObject {
    constructor(name, properties) {
        super(name, properties);
        this.className = 'Tag';
        this.times = [0, 0, 0];
        this.ghosts = [];
        this.ghostLimit = GUI_STATE.trajectory;
        this.color =  GUI_STATE.savedColors[name] ? Colors.getColor(GUI_STATE.savedColors[name]) : Colors.getColor('Random');
        this.firstPosition = true;

        this.position = {
            'x': 0,
            'y': 0,
            'z': 0
        };

        this.startQuaternion = new THREE.Quaternion();
        this.endQuaternion = new THREE.Quaternion();
        this.quaternion = new THREE.Quaternion();

        this.quaternion._onChange( () => this.quaternionChanged() );

        this.distancePosition = {
            'x': 0,
            'y': 0,
            'z': 0
        };

        this.distance = 0;
        this.lastDistance = 0;
        this.batteryLevel = '';
        this.geometry = TAG_GEOMETRY;
        this.labelScale = 10;
        this.isVisible = true;
        this.isZ = false;

        this.lastBlink = 0;
        this.active = false;
        setInterval(() => this.testBlink(), 60000);
    }

    handleTimes(lastTime) {
        this.times.rotate(-1);
        this.times[0] = lastTime;
    }

    getMedian() {
        let median = findMedian(this.times[0], this.times[1], this.times[2]);
        return median;
    }

    refreshGhosts() {
        if (!this.ghostLimit) {
            return;
        }

        if (this.ghosts.length >= this.ghostLimit) {
            this.ghosts.rotate(1);
            this.ghosts[0].position = this.position;
            this.ghosts[0].rotation = this.rotation;
        } else {
            var color = this.color;
            const ghost = new TagGhost(this.name + 'Ghost', { color });
            //ghost.geometry = this.geometry;
            this.ghosts.push(ghost);
            this.emit('GhostAdded', {
                ghost
            });

            ghost.position = this.position;
            ghost.rotation = this.rotation;
        }      
    }

    removeGhost(ghost) {
        this.ghosts.shift();
        this.emit('GhostRemoved', {
            ghost
        });
    }

    updateOffsetRotation() {
        let x = this.quaternion.x;
        let y = this.quaternion.y;
        let z = this.quaternion.z;
        let w = this.quaternion.w;
        this.emit('RotationChanged', {x,y,z,w});
    }

    set position(position) {
        this._position = position;
        this.emit('PositionChanged', {
            position
        });
    }

    get position() {
        return this._position;
    }

    /*set rotation(rotation) {
        this._rotation = rotation;
        this.emit('RotationChanged', {
            rotation
        });
    }

    get rotation() {
        return this._rotation;
    }*/

    quaternionChanged() {
        //console.log(this);
        let x = this.quaternion.x;
        let y = this.quaternion.y;
        let z = this.quaternion.z;
        let w = this.quaternion.w;
        this.emit('RotationChanged', {x,y,z,w});
    }

    get distance() {
        return this._distance;
    }

    set distance(distance) {
        this._distance = distance;
        this.emit('DistanceChanged', {
            distance
        });
    }

    set labelScale(scale) {
        this._labelScale = scale;
        this.emit('LabelScaleChanged', {
            scale
        });
    }

    get labelScale() {
        return this._labelScale;
    }

    changeGeometry(geometry, isUserChange = true) {
        for (let i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
            if (CUSTOM_GEOMETRIES[i].name == geometry) {
                this.geometry = CUSTOM_GEOMETRIES[i].geometry;

                if (isUserChange) {
                    xively.feed.update(this.properties.id, { model_reference: CUSTOM_GEOMETRIES[i].id}, function(data, status, response) {
                        if (response.status === 200) {
                            toastr.success('Tag model successfuly set in database.');
                        } else {
                            toastr.error('Tag model could not be set in database. Model will reset after page refresh.');
                        }
                    });
                }

                return;
            }
        }

        if (this.geometry != TAG_GEOMETRY) {
            this.geometry = TAG_GEOMETRY;
        }        
    }

    changeColor(colorName) {
        GUI_STATE.savedColors[this.name] = colorName;
        localStorage.setItem('sewio-sensmap3d-colors', JSON.stringify(GUI_STATE.savedColors));

        let color = this.color = Colors.getColor(colorName);
        this.emit('ColorChanged', { color });

        for (let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].changeColor(color);
        }
    }

    set geometry(geometry) {
        this._geometry = geometry;
        this.emit('GeometryChanged', { geometry });
    }

    get geometry() {
        return this._geometry;
    }

    set ghostLimit(ghostLimit) {
        this._ghostLimit = ghostLimit;

        if (ghostLimit == 100) {
            this._ghostLimit = Number.MAX_SAFE_INTEGER;
        }
        
        for (let i = this.ghosts.length; this.ghosts.length > ghostLimit; i--) {
            this.removeGhost(this.ghosts[0]);
        }
    }

    get ghostLimit() {
        return this._ghostLimit;
    }

    get isVisible() {
        return this._isVisible;
    }

    set isVisible(isVisible) {
        this._isVisible = isVisible;
        let active = this.active;
        this.emit('VisibilityChanged', { isVisible: active && isVisible });
    }

    get batteryLevel () {
        return this._batteryLevel;
    }

    set batteryLevel (batteryLevel) {
        this._batteryLevel = batteryLevel;
        this.emit('BatteryLevelChanged');
    }

    get guiFolder () {
        return this._guiFolder;
    }

    set guiFolder (guiFolder) {
        this._guiFolder = guiFolder;
    }

    highlight() {
        this.emit('ButtonPressed', {});
    }

    startUpdating() {
        DataLoader.subscribeTag(this);
    }

    stopUpdating() {
        DataLoader.unsubscribeTag(this);
    }

    get active() {
        return this._active;
    }

    set active(active) {
        this._active = active;
        let visible = this.isVisible;
        this.emit('VisibilityChanged', { isVisible: active && visible });
    }

    updateBlink() {
        this.lastBlink = Date.now();
        this.active = true;
    }

    testBlink() {
        let now = Date.now();

        if (now - this.lastBlink >= 60000 && !GUI_STATE.inactive) {
            this.active = false;
        }
    }

    changePlan(newPlan, newBuilding) {
        let oldPlan = this.properties.plan;
        let oldBuilding = this.properties.building;

        if (newPlan != oldPlan || newBuilding != oldBuilding) {
            this.properties.plan = newPlan;
            this.properties.building = newBuilding;
            this.emit('PlanChanged', { oldPlan, newPlan, oldBuilding, newBuilding });
            return true;
        } else {
            return false;
        }        
    }

    checkGeometries() {
        for (let i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
            if (CUSTOM_GEOMETRIES[i].id === this.properties.model) {
                this.changeGeometry(CUSTOM_GEOMETRIES[i].name, false);
                return;
            }
        }

        this.changeGeometry('', false);
    }

    [Symbol.iterator]() {
        return this.ghosts[Symbol.iterator]();
    }
}
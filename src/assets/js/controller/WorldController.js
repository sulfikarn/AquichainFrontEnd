class WorldController {
    constructor(world) {
        this.world = world;
        this.view = new MainView(this, world);
        this.view.initialize();
        this.loaded = 0;
    }

    /* lock onto selected object */
    onClick(selectedObject) {
        /*if (selectedObject) {
            if (selectedObject.mediator.basicObject.className == 'Tag') {
                selectedObject.add(this.view.renderingContext.camera);
                this.view.renderingContext.camera.position.set(0, 10, 10);
                this.view.renderingContext.controls.target = new THREE.Vector3(0, 0, 0);
                this.view.renderingContext.controls.enablePan = false;
            } else if (selectedObject.mediator.basicObject.className == 'Plan') {
                this.resetCamera();
            }
        }*/
    }

    resetCamera() {
        this.view.renderingContext.scene.add(this.view.renderingContext.camera);
        this.view.renderingContext.camera.position.set(DEFAULT_CAMERA_POS[0], DEFAULT_CAMERA_POS[1], DEFAULT_CAMERA_POS[2]);
        this.view.renderingContext.controls.target = new THREE.Vector3(DEFAULT_CAMERA_TAR[0], DEFAULT_CAMERA_TAR[1], DEFAULT_CAMERA_TAR[2]);
        this.view.renderingContext.controls.enablePan = true;
    }

    onToggleVisibility(toggleValue, type) {
        for (let building of this.world.buildings) {
            for (let plan of building.plans) {
                for (let unit of plan.units) {
                    if (type === 'Stats' && unit.className === 'Tag') {
                        unit.emit('ToggleStats', { toggleValue });
                    } else if (type === 'Inactive' && unit.className === 'Tag') {
                        unit.active = toggleValue;
                    } else if (unit.className === type) {
                        unit.isVisible = toggleValue;
                    }
                }
            }
        }
    }

    onRecordsCountChange(newCount) {
        for (let building of this.world.buildings) {
            for (let plan of building.plans) {
                for (let unit of plan.units) {
                    if (unit.className == 'Tag') {
                        unit.ghostLimit = newCount;
                    }
                }
            }
        }
    }

    onLabelScaleChange(newScale) {
        for (let building of this.world.buildings) {
            for (let plan of building.plans) {
                for (let unit of plan.units) {
                    if (unit.className == 'Tag' || unit.className == 'Anchor') {
                        unit.labelScale = newScale;
                    }
                }
            }
        }
    }

    onNorthOffsetChange() {
        for (let building of this.world.buildings) {
            for (let plan of building.plans) {
                for (let unit of plan.units) {
                    if (unit.className === 'Tag') {
                        unit.updateOffsetRotation();
                    }
                }
            }
        }
    }

    onFilterChange(filter) {
        this.updateUnitsGui(selectedPlan, filter);
    }

    updateUnitsGui(plan, filter = undefined) {
        var self = this;

        // remove old tag folders
        for (let tagFolder in this.view.gui.tagsFolder.__folders) {
            this.view.gui.tagsFolder.removeFolder(tagFolder);
        }

        if (filter == undefined) {
            this.view.gui.tagsFolder.close();
        }        

        // remove old anchors folders
        for (let anchorFolder in this.view.gui.anchorsFolder.__folders) {
            this.view.gui.anchorsFolder.removeFolder(anchorFolder);
        }
        this.view.gui.anchorsFolder.close();

        // remove old zones folders
        for (let zoneFolder in this.view.gui.zonesFolder.__folders) {
            this.view.gui.zonesFolder.removeFolder(zoneFolder);
        }
        this.view.gui.zonesFolder.close();

        // remove old models folders
        for (let modelFolder in this.view.gui.modelsFolder.__folders) {
            this.view.gui.modelsFolder.removeFolder(modelFolder);
        }
        this.view.gui.modelsFolder.close();
        
        // create new folders
        if (!plan) {
            return;
        }

        for (let unit of plan.units) {
            switch (unit.className) {
            case 'Tag':
                if (unit.properties.alias.length) {
                    if (filter !== undefined && unit.properties.alias.toLowerCase().indexOf(filter.toLowerCase()) == -1) {
                        continue;
                    }

                    if (unit.properties.alias + ' : ' + unit.batteryLevel in this.view.gui.tagsFolder.__folders) {
                        unit.guiFolder = this.view.gui.tagsFolder.addFolder(unit.properties.alias + ' : ' + unit.batteryLevel + ' [' + unit.properties.id + ']');
                    } else {
                        unit.guiFolder = this.view.gui.tagsFolder.addFolder(unit.properties.alias + ' : ' + unit.batteryLevel);
                    }
                } else {
                    if (filter !== undefined && unit.name.toLowerCase().indexOf(filter.toLowerCase()) == -1) {
                        continue;
                    }

                    unit.guiFolder = this.view.gui.tagsFolder.addFolder(unit.name + ' : ' + unit.batteryLevel);
                }

                var guiControls = new function() {
                    this.follow = function() {
                        let camera = self.view.renderingContext.camera;
                            
                        unit.emit('Follow', { camera });
                        self.view.renderingContext.camera.position.set(0, 10, 10);
                        self.view.renderingContext.controls.target = new THREE.Vector3(0, 0, 0);
                        self.view.renderingContext.controls.enablePan = false;

                        if (UNFOLLOW_BUTTON) {
                            self.view.gui.gui.remove(UNFOLLOW_BUTTON);
                            UNFOLLOW_BUTTON = null;
                        }                            

                        var guiControls = new function() {
                            this.unfollow = function () {
                                self.resetCamera();
                                self.view.gui.gui.remove(UNFOLLOW_BUTTON);
                                UNFOLLOW_BUTTON = null;
                            };
                        };

                        UNFOLLOW_BUTTON = self.view.gui.gui.add(guiControls, 'unfollow');
                        self.view.gui.gui.__controllers[0].domElement.previousSibling.innerHTML = texts.unfollowTxt;
                            
                    };

                    this.model = 'Default';
                    this.color = 'Random';
                };

                unit.guiFolder.add(guiControls, 'follow');
                unit.guiFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.followTxt;
                    
                let modelsArray = ['Default'];
                for (let i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
                    modelsArray.push(CUSTOM_GEOMETRIES[i].name);
                }

                let modelControler = unit.guiFolder.add(guiControls, 'model', modelsArray);
                unit.guiFolder.__controllers[1].domElement.previousSibling.innerHTML = texts.modelTxt;

                for (let i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
                    if (unit.properties.model === CUSTOM_GEOMETRIES[i].id) {
                        modelControler.setValue(CUSTOM_GEOMETRIES[i].name);
                        break;
                    }
                }

                // function wrapped for firefox functionality
                (function (unit) { modelControler.onFinishChange((value) => unit.changeGeometry(value));})(unit);

                let colorControler = unit.guiFolder.add(guiControls, 'color', Colors.getColorNames());
                unit.guiFolder.__controllers[2].domElement.previousSibling.innerHTML = texts.colorTxt;

                (function (unit) { colorControler.onFinishChange((value) => unit.changeColor(value));})(unit);
                break;
            case 'Anchor':
                if (unit.properties.alias.length) {
                    if (unit.properties.alias in this.view.gui.anchorsFolder.__folders) {
                        unit.guiFolder = this.view.gui.anchorsFolder.addFolder(unit.properties.alias + ' [' + unit.properties.id + ']');
                    } else {
                        unit.guiFolder = this.view.gui.anchorsFolder.addFolder(unit.properties.alias);
                    }
                } else {
                    unit.guiFolder = this.view.gui.anchorsFolder.addFolder(unit.name);
                }
                break;
            case 'Zone':
                if (unit.name in this.view.gui.zonesFolder.__folders) {
                    unit.guiFolder = this.view.gui.zonesFolder.addFolder(unit.name + ' [' + unit.properties.id + ']');
                } else {
                    unit.guiFolder = this.view.gui.zonesFolder.addFolder(unit.name);
                }
                break;
            }
        }

        if (!EDITED_OBJECT.active) {         
            // tag default model
            let tagModelFolder = this.view.gui.modelsFolder.addFolder('Default Tag');

            var tagModelGuiControls = new function() {
                this.edit = function() {
                    // hide everything
                    for (let unit of plan.units) {
                        if (unit.className === 'Tag' || unit.className === 'Zone' || unit.className === 'Anchor') {
                            unit.isVisible = false;
                        }
                    }

                    // create model
                    let model = new StaticModel(TAG_GEOMETRY, { 'index': -2});
                    plan.addUnit(model);

                    self.view.renderingContext.transform.setSpace('local');
                    self.view.renderingContext.transform.setMode('scale');
                    self.view.renderingContext.scene.add(self.view.renderingContext.transform);
                    model.createTransformControls(self.view.renderingContext.transform);
                    
                    EDITED_OBJECT.active = true;
                    EDITED_OBJECT.index = -2;
                    EDITED_OBJECT.object = model;

                    model.follow(self.view.renderingContext.camera);

                    self.updateUnitsGui(plan);
                };
            };

            tagModelFolder.add(tagModelGuiControls, 'edit');
            tagModelFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.editTxt;

            // anchor default model
            let anchorModelFolder = this.view.gui.modelsFolder.addFolder('Default Anchor');

            var anchorModelGuiControls = new function() {
                this.edit = function() {
                    // hide everything
                    for (let unit of plan.units) {
                        if (unit.className === 'Tag' || unit.className === 'Zone' || unit.className === 'Anchor') {
                            unit.isVisible = false;
                        }
                    }

                    // create model
                    let model = new StaticModel(ANCHOR_GEOMETRY, { 'index': -1});
                    plan.addUnit(model);

                    self.view.renderingContext.transform.setSpace('local');
                    self.view.renderingContext.transform.setMode('scale');
                    self.view.renderingContext.scene.add(self.view.renderingContext.transform);
                    model.createTransformControls(self.view.renderingContext.transform);
                    
                    EDITED_OBJECT.active = true;
                    EDITED_OBJECT.index = -1;
                    EDITED_OBJECT.object = model;

                    model.follow(self.view.renderingContext.camera);

                    self.updateUnitsGui(plan);
                };
            };

            anchorModelFolder.add(anchorModelGuiControls, 'edit');
            anchorModelFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.editTxt;

            // loaded models
            for (let i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
                let modelFolder = this.view.gui.modelsFolder.addFolder(CUSTOM_GEOMETRIES[i].name);

                guiControls = new function() {
                    this.assign = function() {
                        selectedPlan.changeGeometry(CUSTOM_GEOMETRIES[i].name);
                    };

                    this.edit = function() {
                        // hide everything
                        for (let unit of plan.units) {
                            if (unit.className === 'Tag' || unit.className === 'Zone' || unit.className === 'Anchor') {
                                unit.isVisible = false;
                            }
                        }

                        // create model
                        let model = new StaticModel(CUSTOM_GEOMETRIES[i].name, { 'index': i});
                        plan.addUnit(model);

                        self.view.renderingContext.transform.setSpace('local');
                        self.view.renderingContext.transform.setMode('scale');
                        self.view.renderingContext.scene.add(self.view.renderingContext.transform);
                        model.createTransformControls(self.view.renderingContext.transform);
                        
                        EDITED_OBJECT.active = true;
                        EDITED_OBJECT.index = i;
                        EDITED_OBJECT.object = model;

                        model.follow(self.view.renderingContext.camera);

                        self.updateUnitsGui(plan);
                    };

                    this.remove = function() {
                        xively.models.delete(CUSTOM_GEOMETRIES[i].id, function (a,b,c) {
                            if (a.status === 200) {
                                toastr.success('Model ' + CUSTOM_GEOMETRIES[i].name + ' successfuly removed from database.');
                                CUSTOM_GEOMETRIES.splice(i, 1);

                                self.updateUnitsGui(selectedPlan);
                                self.world.checkGeometries();
                            } else {
                                toastr.error('Model ' + CUSTOM_GEOMETRIES[i].name + ' could not be removed from database.');
                            }
                        });
                    };
                };

                modelFolder.add(guiControls, 'assign').name(texts.assignTxt);

                modelFolder.add(guiControls, 'edit').name(texts.editTxt);
                //modelFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.editTxt;

                modelFolder.add(guiControls, 'remove').name(texts.removeTxt);
                //modelFolder.__controllers[1].domElement.previousSibling.innerHTML = texts.removeTxt;

                if (i+1 == CUSTOM_GEOMETRIES.length) {
                    //modelFolder.open();
                    //this.view.gui.modelsFolder.open();
                }
            }
        } else {
            let modelFolder;

            if (EDITED_OBJECT.index == -1) {
                modelFolder = this.view.gui.modelsFolder.addFolder('Default Anchor');
            } else if (EDITED_OBJECT.index == -2) {
                modelFolder = this.view.gui.modelsFolder.addFolder('Default Tag');
            } else {
                modelFolder = this.view.gui.modelsFolder.addFolder(CUSTOM_GEOMETRIES[EDITED_OBJECT.index].name);
            }            

            guiControls = new function() {
                this.translate = function() {
                    self.view.renderingContext.transform.setMode('translate');
                },
                this.rotate = function() {
                    self.view.renderingContext.transform.setMode('rotate');
                },
                this.scale = function() {
                    self.view.renderingContext.transform.setMode('scale');
                },
                this.save = function() {
                    // show everyting
                    for (let unit of plan.units) {
                        switch (unit.className) {
                        case 'Tag':
                            unit.isVisible = GUI_STATE.tags;
                            break;
                        case 'Anchor':
                            unit.isVisible = GUI_STATE.anchors;
                            break;
                        case 'Zone':
                            unit.isVisible = GUI_STATE.zones;
                            break;
                        default:
                            break;
                        }
                    }

                    self.resetCamera();

                    EDITED_OBJECT.object.saveGeometry(EDITED_OBJECT.index);
                    EDITED_OBJECT.active = false;

                    self.view.renderingContext.transform.detach();
                    self.view.renderingContext.scene.remove(self.view.renderingContext.transform);
                    plan.removeUnit(EDITED_OBJECT.object);

                    self.updateUnitsGui(plan);

                    xively.models.update(CUSTOM_GEOMETRIES[EDITED_OBJECT.index].id, { vertices: CUSTOM_GEOMETRIES[EDITED_OBJECT.index].geometry.attributes['position'].array.toString() }, function(a,b,c) {
                        if (a.status === 200) {
                            toastr.success('Model updated in database.');
                        } else {
                            toastr.error('Could not update model in a database. Changes will be lost after page refresh.');
                        }
                    });
                },
                this.cancel = function() {
                    // show everyting
                    for (let unit of plan.units) {
                        switch (unit.className) {
                            case 'Tag':
                                unit.isVisible = GUI_STATE.tags;
                                break;
                            case 'Anchor':
                                unit.isVisible = GUI_STATE.anchors;
                                break;
                            case 'Zone':
                                unit.isVisible = GUI_STATE.zones;
                                break;
                            default:
                                break;
                        }
                    }

                    self.resetCamera();
                    EDITED_OBJECT.active = false;
                    self.view.renderingContext.transform.detach();
                    self.view.renderingContext.scene.remove(self.view.renderingContext.transform);
                    plan.removeUnit(EDITED_OBJECT.object);
                    self.updateUnitsGui(plan);
                }
            };

            modelFolder.add(guiControls, 'translate').name(texts.translateTxt);
            //modelFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.translateTxt;

            modelFolder.add(guiControls, 'rotate').name(texts.rotateTxt);
            //modelFolder.__controllers[1].domElement.previousSibling.innerHTML = texts.rotateTxt;

            modelFolder.add(guiControls, 'scale').name(texts.scaleTxt);
            //modelFolder.__controllers[2].domElement.previousSibling.innerHTML = texts.scaleTxt;

            modelFolder.add(guiControls, 'save').name(texts.saveTxt);
            //modelFolder.__controllers[3].domElement.previousSibling.innerHTML = texts.saveTxt;

            modelFolder.add(guiControls, 'cancel').name(texts.cancelTxt);

            this.view.gui.modelsFolder.open();
            modelFolder.open();
        }
    }

    onTagBatteryLevelChange(unit) {
        if (unit.properties.alias.length) {
            unit.guiFolder.name = unit.properties.alias + ' : ' + unit.batteryLevel;
        } else {
            unit.guiFolder.name = unit.name + ' : ' + unit.batteryLevel;
        }
    }

    onTagPlanChange(tag, oldPlan, newPlan, oldBuilding, newBuilding) {
        for (let building of this.world) {
            if (building.name == oldBuilding) {
                for (let plan of building) {
                    if (plan.name == oldPlan) {
                        plan.removeUnit(tag);
                        break;
                    }
                }
            }
        }

        for (let building of this.world) {
            if (building.name == newBuilding) {
                for (let plan of building) {
                    if (plan.name == newPlan) {
                        plan.addUnit(tag);
                        break;
                    }
                }
            }
        }

        // from undefined to defined
        if ((oldPlan == '' || oldBuilding == '') && newPlan != '' && newBuilding != '') {
            let index = FREE_TAGS.indexOf(tag);

            if (index !== -1) {
                FREE_TAGS.splice(index, 1);
            }
        }
    }

    onObjectFrameRendered(visibleName, object) {
        var vector = new THREE.Vector3();

        var widthHalf = 0.5 * this.view.renderingContext.renderer.context.canvas.width;
        var heightHalf = 0.5 * this.view.renderingContext.renderer.context.canvas.height;

        object.updateMatrixWorld();
        vector.setFromMatrixPosition(object.matrixWorld);
        vector.project(this.view.renderingContext.camera);

        vector.x = ( vector.x * widthHalf ) + widthHalf;
        vector.y = - ( vector.y * heightHalf ) + heightHalf;

        visibleName.css({
            'transform': 'translate(' + vector.x + 'px, ' + vector.y + 'px) translate(-50%, -50%)'
        });
    }

    onZoneAdded(zone, plan, selectedPlan) {
        if (plan == selectedPlan) {
            if (zone.name in this.view.gui.zonesFolder.__folders) {
                zone.guiFolder = this.view.gui.zonesFolder.addFolder(zone.name + ' [' + zone.properties.id + ']');
            } else {
                zone.guiFolder = this.view.gui.zonesFolder.addFolder(zone.name);
            }
        }
    }
}
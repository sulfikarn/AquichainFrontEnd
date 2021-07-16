/* Class representing plan (e.g. floor), has all tags, anchors and zones inside */
class Plan extends BasicObject {
    constructor(name, properties) {
        super(name, properties);
        this.className = 'Plan';
        this.units = [];
    }

    addUnit(unit) {
        this.units.push(unit);
        this.emit('UnitAdded', { unit });
    }

    removeUnit(unit) {
        const index = this.units.indexOf(unit);

        if (index !== -1) {
            delete this.units.splice(index, 1);
            this.emit('UnitRemoved', { unit });
        }
    }

    startUpdatingUnits() {
        for (let unit of this.units) {
            unit.startUpdating();
        }
    }

    stopUpdatingUnits() {
        for (let unit of this.units) {
            unit.stopUpdating();
        }
    }

    get isVisible() {
        return this._isVisible;
    }

    set isVisible(isVisible) {
        this._isVisible = isVisible;
        this.emit('PlanVisibilityChanged', { isVisible });
    }

    set offset(offset) {
        this._offset = offset;
        this.emit('OffsetChanged', {
            offset
        });

        for (let unit in this.units) {
            if (unit.className == 'Zone') {
                unit.emit('OffsetChanged', { offset });
            }
        }
    }

    get offset() {
        return this._offset;
    }

    set geometry(geometry) {
        this._geometry = geometry;
        this.emit('GeometryChanged', { geometry });
    }

    get geometry() {
        return this._geometry;
    }

    changeGeometry(geometry, isUserChange = true) {
        for (let i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
            if (CUSTOM_GEOMETRIES[i].name == geometry) {

                this.geometry = CUSTOM_GEOMETRIES[i].geometry;

                if (isUserChange) {
                    xively.plans.update(this.properties.id, { model_reference: CUSTOM_GEOMETRIES[i].id }, function (data, status, response) {
                        if (data.status === 200) {
                            toastr.success('Plan model successfuly set in database.');
                        } else {
                            toastr.error('Plan model could not be set in database. Model will reset after page refresh.');
                        }
                    });
                }

                return;
            }
        }

        this.geometry = null;
    }

    checkGeometries() {
        for (let unit of this.units) {
            unit.checkGeometries();
        }

        for (let i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
            if (CUSTOM_GEOMETRIES[i].id === Number(this.properties.model_reference)) {
                this.changeGeometry(CUSTOM_GEOMETRIES[i].name, false);
                return;
            }
        }

        this.changeGeometry(null, false);
    }

    [Symbol.iterator]() {
        return this.units[Symbol.iterator]();
    }
}
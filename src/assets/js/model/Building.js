/* Class representing buildings, has all building plans inside (e.g. floors) */
class Building extends BasicObject {
    constructor(name, properties) {
        super(name, properties);
        this.plans = [];
        this.className = 'Building';
    }

    addPlan(plan) {
        this.plans.push(plan);
        this.emit('PlanAdded', { plan });
    }

    createZones() {
        for (let plan of this.plans) {
            xively.zone.list(this.properties.id, plan.name, function (data) {

                for (let i = 0; i < data.length; i++/*result of data*/) {
                    const zone = new Zone(data[i].name, { points: DataParser.parsePolygons(data[i].polygon), type: data[i].type, id: data[i].id, offset: plan.offset});
                    plan.addUnit(zone);

                    if (zone.properties.type === 'valid') {
                        VALID_ZONES.push({zone: zone, plan: plan.name});
                    }

                    zone.isVisible = GUI_STATE.zones;

                    // FIXME: redo zones
                    plan.emit('ZoneAdded', { zone });
                }
            });
        }
    }

    startUpdatingUnits() {
        for (let plan of this.plans) {
            plan.startUpdatingUnits();
        }
    }

    checkGeometries() {
        for (let plan of this.plans) {
            plan.checkGeometries();
        }
    }

    [Symbol.iterator]() {
        return this.plans[Symbol.iterator]();  
    }
}
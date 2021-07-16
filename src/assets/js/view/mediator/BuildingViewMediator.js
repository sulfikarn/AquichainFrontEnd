class BuildingViewMediator extends ViewMediator {
    constructor(building, mediatorFactory) {
        super(building, mediatorFactory);
        this.basicObject.addObserver('PlanAdded', (e) => this.onPlanAdded(e));
    }

    onPlanAdded(e) {
        this.addChild(e.plan);
    }
}
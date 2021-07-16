class WorldViewMediator extends ViewMediator {
    constructor(world, mediatorFactory) {
        super(world, mediatorFactory);
        this.basicObject.addObserver('BuildingAdded', (e) => this.onBuildingAdded(e));
    }

    onBuildingAdded(e) {
        this.addChild(e.building);
    }
}
class ViewMediatorFactory {
    getMediator(basicObject) {
        switch (basicObject.className) {
        case 'World':
            return new WorldViewMediator(basicObject, this);
        case 'Building':
            return new BuildingViewMediator(basicObject, this);
        case 'Plan':
            return new PlanViewMediator(basicObject, this);
        case 'Anchor':
            return new AnchorViewMediator(basicObject, this);
        case 'Tag':
            return new TagViewMediator(basicObject, this);
        case 'TagGhost':
            return new TagGhostViewMediator(basicObject, this);
        case 'Zone':
            return new ZoneViewMediator(basicObject, this);
        case 'StaticModel':
            return new StaticModelViewMediator(basicObject, this);
        }
    }
}

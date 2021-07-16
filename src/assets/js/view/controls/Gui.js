class Gui extends Observable {
    constructor(mediator, renderingContext) {
        super();
        this.mediator = mediator;
        this.renderingContext = renderingContext;
    }

    initialize() {
        dat.GUI.TEXT_OPEN = texts.openControlsTxt;
        dat.GUI.TEXT_CLOSED = texts.closeControlsTxt;

        this.gui = new dat.GUI({
            width: 305,
            resizable: false
        });

        var optionsFolder = this.gui.addFolder(texts.optionsTxt);
        var nodesFolder = this.gui.addFolder(texts.nodesTxt);
        this.zonesFolder = this.gui.addFolder(texts.zonesTxt);
        this.modelsFolder = this.gui.addFolder(texts.modelsTxt);

        this.anchorsFolder = nodesFolder.addFolder(texts.anchorsTxt);
        this.tagsFolder = nodesFolder.addFolder(texts.tagsTxt);

        var guiControls = new function() {
            this.anchorsVisible = GUI_STATE.anchors;
            this.tagsVisible = GUI_STATE.tags;
            this.zonesVisible = GUI_STATE.zones;
            this.statsVisible = GUI_STATE.stats;
            this.inactiveVisible = GUI_STATE.inactive;
            this.presenceVisible = GUI_STATE.presence;
            this.enable3d = GUI_STATE.three;			
            this.recordsCount = GUI_STATE.trajectory;
            this.northOffset = GUI_STATE.north;
            this.labelScale = GUI_STATE.label;
        };

        optionsFolder.add(guiControls, 'anchorsVisible').onFinishChange((e) => this.onToggleAnchors(e));
        optionsFolder.add(guiControls, 'tagsVisible').onFinishChange((e) => this.onToggleTags(e));
        optionsFolder.add(guiControls, 'zonesVisible').onFinishChange((e) => this.onToggleZones(e));
        optionsFolder.add(guiControls, 'statsVisible').onFinishChange((e) => this.onToggleStats(e));
        optionsFolder.add(guiControls, 'inactiveVisible').onFinishChange((e) => this.onToggleInactive(e));
        optionsFolder.add(guiControls, 'presenceVisible').onFinishChange((e) => this.onTogglePresence(e));
				
        optionsFolder.add(guiControls, 'recordsCount').min(0).max(100).step(1).onFinishChange((e) => this.onRecordsCountChange(e));
        optionsFolder.add(guiControls, 'labelScale').min(1).max(10).step(1).onFinishChange((e) => this.onLabelScaleChange(e));

        /* FIXME isn't there another way of changing GUI's object names? */
        optionsFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.anchorsVisibleTxt;
        optionsFolder.__controllers[1].domElement.previousSibling.innerHTML = texts.tagsVisibleTxt;
        optionsFolder.__controllers[2].domElement.previousSibling.innerHTML = texts.zonesVisibleTxt;
        optionsFolder.__controllers[3].domElement.previousSibling.innerHTML = texts.statsVisibleTxt;
        optionsFolder.__controllers[4].domElement.previousSibling.innerHTML = texts.inactiveTxt;
        optionsFolder.__controllers[5].domElement.previousSibling.innerHTML = texts.presenceTxt;
        optionsFolder.__controllers[6].domElement.previousSibling.innerHTML = texts.recordsCountTxt;
        optionsFolder.__controllers[7].domElement.previousSibling.innerHTML = texts.labelScaleTxt;

        var imuFolder = optionsFolder.addFolder(texts.imuTxt);

        imuFolder.add(guiControls, 'enable3d').onFinishChange((e) => this.onToggle3d(e));
        imuFolder.add(guiControls, 'northOffset').min(0).max(360).step(1).onFinishChange((e) => this.onNorthOffsetChange(e));

        imuFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.enable3dTxt;
        imuFolder.__controllers[1].domElement.previousSibling.innerHTML = texts.northOffsetTxt;

        let tagsControls = new function() {
            this.search = '';
        };

        this.tagsFolder.add(tagsControls, 'search').onChange((e) => this.onFilterTags(e));
        this.tagsFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.searchTxt;

        let modelsControls = new function() {
            this.importModel = function() {
                document.getElementById('file').click();
            };
        };

        this.modelsFolder.add(modelsControls, 'importModel');
        this.modelsFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.importModelTxt;
    }

    onToggleTags(toggleValue) {
        GUI_STATE.tags = toggleValue;
        localStorage.setItem('sewio-sensmap3d-tags', toggleValue);

        this.emit('toggleTags', {
            toggleValue
        });
    }

    onToggleAnchors(toggleValue) {
        GUI_STATE.anchors = toggleValue;
        localStorage.setItem('sewio-sensmap3d-anchors', toggleValue);

        this.emit('toggleAnchors', {
            toggleValue
        });
    }

    onToggleZones(toggleValue) {
        GUI_STATE.zones = toggleValue;
        localStorage.setItem('sewio-sensmap3d-zones', toggleValue);

        this.emit('toggleZones', {
            toggleValue
        });
    }

    onToggleStats(toggleValue) {
        GUI_STATE.stats = toggleValue;
        localStorage.setItem('sewio-sensmap3d-stats', toggleValue);

        this.emit('toggleStats', {
            toggleValue
        });
    }

    onToggleInactive(toggleValue) {
        GUI_STATE.inactive = toggleValue;
        localStorage.setItem('sewio-sensmap3d-inactive', toggleValue);

        this.emit('toggleInactive', {
            toggleValue
        });
    }

    onTogglePresence(toggleValue) {
        GUI_STATE.presence = toggleValue;
        localStorage.setItem('sewio-sensmap3d-presence', toggleValue);
    }

    onToggle3d(toggleValue) {
        GUI_STATE.three = toggleValue;
        localStorage.setItem('sewio-sensmap3d-three', toggleValue);
    }

    onRecordsCountChange(newCount) {
        GUI_STATE.trajectory = newCount;
        localStorage.setItem('sewio-sensmap3d-trajectory', newCount);

        this.emit('recordsCountChange', {
            newCount
        });
    }

    onNorthOffsetChange(newOffset) {
        GUI_STATE.north = newOffset;
        localStorage.setItem('sewio-sensmap3d-north', newOffset);

        this.emit('northOffsetChange', {});
    }

    onLabelScaleChange(newScale) {
        GUI_STATE.label = newScale;
        localStorage.setItem('sewio-sensmap3d-label', newScale);

        this.emit('labelScaleChange', {
            newScale
        });
    }

    onFilterTags(filter) {
        this.emit('filterChange', {
            filter
        });
    }
}
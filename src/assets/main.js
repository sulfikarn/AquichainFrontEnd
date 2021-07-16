let selectedPlan;

toastr.options = {
    'positionClass': 'toast-top-left',
    "progressBar": true,
    "hideDuration": "400",
    "showDuration": "400",
    "extendedTimeOut": "2000"
};

// TODO: move this
// (function($){
//     $(document).ready(function(){
//         $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
//             event.preventDefault();
//             event.stopPropagation();
//             $(this).parent().siblings().removeClass('open');
//             $(this).parent().toggleClass('open');
//         });
//     });
// })(jQuery);

var texts = Language.getTexts("en-US");


$(document).ready(function () {
$( "#canvas" ).ready(function() {
  loadFloorMap();
  });
});

function loadFloorMap(){
  var url = SEWIO_HOST ;
  var key = $('meta[name="api-token"]').attr('content');
  //inject

  /* QUERY */

  let args = getUrlVars();

/*
  if (args.ip && args.ip !== 'local') {
      url = args.ip;
  } */

  if (args.tagsize) {
      TAG_GEOMETRY = new THREE.SphereBufferGeometry(Number(args.tagsize), 32, 32);
  }

  if (args.anchorsize) {
      ANCHOR_GEOMETRY = new THREE.SphereBufferGeometry(Number(args.anchorsize), 32, 32);
  }

  if (args.labelsize) {
      GUI_STATE.label = Number(args.labelsize);
  }

  if (args.labelheight) {
      DEFAULT_LABEL_HEIGHT = Number(args.labelheight);
  }

  if (args.camerapos) {
      DEFAULT_CAMERA_POS = JSON.parse(args.camerapos);
  }

  if (args.cameratar) {
      DEFAULT_CAMERA_TAR = JSON.parse(args.cameratar);
  }

  if (args.ghostcount) {
      GUI_STATE.trajectory = Number(args.ghostcount);
  }

  if (args.building) {
      DEFAULT_BUILDING = Number(args.building);
  }

  if (args.antialiasing) {
      ANTIALIAS = Number(args.antialiasing);
  }

  if (args.filtered) {
      FILTERED_MACS = args.filtered.toUpperCase().split(",");
  }

  if (args.plan) {
      DEFAULT_PLAN = decodeURIComponent(args.plan);
  }

  startClient(url, key, args.user);
}

function startClient(url = window.location.host, key, user = 'rtlsuser') {

    if (!Detector.webgl) {
        $('#canvas').html(Detector.getWebGLErrorMessage());
        $('#canvasloader-container').html('');
        $('.sewio-loading').fadeOut();
        return;
    }

    /* XIVELY SETUP */
    xively.feed.setHost((document.location.protocol === "https:" ? "https://" : "https://") + url + '/sensmapserver/api');
    xively.apiEndpoint = (document.location.protocol === "https:" ? "https://" : "https://") + url + '/sensmapserver/api';
    xively.apiHost = url + '';
    xively.setKey(key);

    xively.test.testsocket(function(mydata, mydata2) {
        if (mydata && mydata2.error) {
            toastr.error('Connection to websocket server lost. Reconnecting...');
        } else {
            if (mydata) {
                console.log('Connection to websocket server established.');

                if (!INITIALIZED) {
                    INITIALIZED = true;

                    // gets data from server
                    xively.feed.list({ user: user }, function (data) {
                        if (!data.totalResults) {
                            if (data.statusText == 'error') {
                                $('#canvasloader-container').html('No response from server.');
                                $('.sewio-loading').fadeOut();
                            } else {
                                $('#canvasloader-container').html('No results found.');
                                $('.sewio-loading').fadeOut();
                            }

                            return;
                        }

                        const world = new World('Earth', {});
                        const worldController = new WorldController(world);

                        var selectedBuilding;

                        var results = data.results;

                        for (let i = results.length - 1; i >= 0; i--) {
                            if (results[i].type === 'building') {
                                //let parsedData = DataParser.parseBuildingTags(results[i].tags);

                                const building = new Building(results[i].title, { 'id': results[i].id });
                                world.addBuilding(building);

                                if (!selectedBuilding || (DEFAULT_BUILDING && DEFAULT_BUILDING == results[i].id)) {
                                    selectedBuilding = building;
                                    $('#current-building').html(selectedBuilding.name);
                                }

                                /** Pradeep - Customiization - Start */
                                // let buildingElem = $('<li/>');
                                // buildingElem.addClass('dropdown-header');
                                // buildingElem.html(building.name);
                                // $('#plans').append(buildingElem);
                                /** Pradeep - Customiization - End */
                                for (let planData in results[i].plans) {
                                    const plan = new Plan(planData, results[i].plans[planData]);
                                    building.addPlan(plan);
                                    if (!selectedPlan || (DEFAULT_BUILDING && DEFAULT_BUILDING == results[i].id && DEFAULT_PLAN && DEFAULT_PLAN.toLowerCase() === plan.name.toLowerCase())) {
                                        if (selectedPlan) {
                                            selectedPlan.isVisible = false;
                                        }

                                        selectedBuilding = building;
                                        $('#current-building').html(selectedBuilding.name);

                                        selectedPlan = plan;
                                        $('#current-plan').html(selectedPlan.name + ' <span class="caret"></span>');
                                    } else {
                                        plan.isVisible = false;
                                    }

                                    let planElem = $('<a/>');
                                    planElem.html(plan.name);
                                    planElem.addClass("dropdown-item");
                                    planElem.attr("href", "#");
                                    $('#plans').append($('<li/>').append(planElem));

                                    // change plan
                                    planElem.click(function() {
                                        if (EDITED_OBJECT.active || $('#current-building').html() == building.name && $('#current-plan').html() == plan.name + ' <span class="caret"></span>') {
                                            if (EDITED_OBJECT.active) {
                                                toastr.error('Cannot change plan while editing model.');
                                            }

                                            return;
                                        }

                                        selectedBuilding = building;
                                        /** Pradeep - Customiization - Start */
                                        // $('#current-building').html(selectedBuilding.name);
                                        /** Pradeep - Customiization - End */
                                        localStorage.setItem('sewio-sensmap3d-building', selectedBuilding.properties.id);

                                        //selectedPlan.stopUpdatingUnits();

                                        selectedPlan.isVisible = false;
                                        selectedPlan = plan;
                                        selectedPlan.isVisible = true;
                                        $('#current-plan').html(selectedPlan.name + ' <span class="caret"></span>');
                                        localStorage.setItem('sewio-sensmap3d-plan', selectedPlan.name);

                                        //selectedPlan.startUpdatingUnits();
                                        worldController.updateUnitsGui(selectedPlan);
                                        worldController.resetCamera();
                                    });
                                    /** Pradeep - Customiization - Start */
                                    //plan.addObserver('ZoneAdded', (e) => worldController.onZoneAdded(e.zone, plan, selectedPlan));
                                    /** Pradeep - Customiization - End */
                                    for (let result of results) {
                                        //let parsedData = DataParser.parseTags(result.tags);

                                        if (result.type === 'tag' && result.location.name === building.name && result.location.ele === plan.name) {
                                            if (FILTERED_MACS.length > 0 && FILTERED_MACS.indexOf(result.title.toUpperCase()) === -1) {
                                                continue;
                                            }

                                            const tag = new Tag(result.title, { alias: result.alias, id: result.id, building: result.location.name, plan: result.location.ele, model: Number(result.model_reference) });
                                            plan.addUnit(tag);

                                            let x, y, z, battery;
                                            let rotX, rotY, rotZ;
                                            let dataStreams = result.datastreams;
                                            for (let i = 0; i < dataStreams.length; i++) {
                                                switch (dataStreams[i].id) {
                                                case 'posX':
                                                    x = parseFloat(dataStreams[i].current_value);
                                                    break;
                                                case 'posY':
                                                    y = parseFloat(dataStreams[i].current_value);
                                                    break;
                                                case 'posZ':
                                                    z = parseFloat(dataStreams[i].current_value);
                                                    break;
                                                case 'battery_level':
                                                    tag.batteryLevel = dataStreams[i].current_value;
                                                    break;
                                                case 'rotX':
                                                    rotX = parseFloat(dataStreams[i].current_value);
                                                    break;
                                                case 'rotY':
                                                    rotY = parseFloat(dataStreams[i].current_value);
                                                    break;
                                                case 'rotZ':
                                                    rotZ = parseFloat(dataStreams[i].current_value);
                                                    break;
                                                }
                                            }

                                            tag.position = {
                                                'x': isNaN(x) ? 0 : x,
                                                'y': isNaN(z) || z === 0 ? .5 : z,
                                                'z': isNaN(y) ? 0 : y
                                            };

                                            tag.distancePosition = {
                                                'x': isNaN(x) ? 0 : x,
                                                'y': isNaN(z) ? .5 : z,
                                                'z': isNaN(y) ? 0 : y
                                            };

                                            tag.rotation = {
                                                'x': isNaN(rotX) ? 0 : rotX,
                                                'y': isNaN(rotY) ? 0 : rotY,
                                                'z': isNaN(rotZ) ? 0 : rotZ
                                            };

                                            tag.isVisible = GUI_STATE.tags;
                                            tag.active = GUI_STATE.inactive;

                                            tag.addObserver('BatteryLevelChanged', () => worldController.onTagBatteryLevelChange(tag));
                                            tag.addObserver('FrameRendered', (e) => worldController.onObjectFrameRendered(e.visibleName, e.object));
                                            tag.addObserver('PlanChanged', (e) => worldController.onTagPlanChange(tag, e.oldPlan, e.newPlan, e.oldBuilding, e.newBuilding));

                                        } else if (result.type === 'anchor' && result.location.name === building.name && result.location.ele === plan.name) {

                                            const anchor = new Anchor(result.title, { alias: result.alias, id: result.id });
                                            plan.addUnit(anchor);

                                            let x, y, z;

                                            for (let datastream of result.datastreams) {
                                                switch (datastream.id) {
                                                case 'posX':
                                                    x = datastream.current_value;
                                                    break;
                                                case 'posY':
                                                    y = datastream.current_value;
                                                    break;
                                                case 'posZ':
                                                    z = datastream.current_value;
                                                    break;
                                                }
                                            }

                                            anchor.position = {
                                                'x': isNaN(x) ? 0 : x,
                                                'z': isNaN(y) ? .5 : y,
                                                'y': isNaN(z) ? 0 : z
                                            };

                                            anchor.isVisible = GUI_STATE.anchors;

                                            anchor.addObserver('FrameRendered', (e) => worldController.onObjectFrameRendered(e.visibleName, e.object));
                                        }
                                    }
                                }

                                building.createZones();
                            }
                        }

                        /* Create tags without plan */
                        for (let result of results) {
                            if (result.type === 'tag' && result.location.ele === '') {
                                if (FILTERED_MACS.length > 0 && FILTERED_MACS.indexOf(result.title.toUpperCase()) === -1) {
                                    continue;
                                }

                                const tag = new Tag(result.title, { alias: result.alias, id: result.id, building: '', plan: '' });

                                let x, y, z, battery;
                                let dataStreams = result.datastreams;
                                for (let i = 0; i < dataStreams.length; i++) {
                                    switch (dataStreams[i].id) {
                                    case 'posX':
                                        x = parseFloat(dataStreams[i].current_value);
                                        break;
                                    case 'posY':
                                        y = parseFloat(dataStreams[i].current_value);
                                        break;
                                    case 'posZ':
                                        z = parseFloat(dataStreams[i].current_value);
                                        break;
                                    case 'battery_level':
                                        tag.batteryLevel = dataStreams[i].current_value;
                                        break;
                                    }
                                }

                                tag.position = {
                                    'x': isNaN(x) ? 0 : x,
                                    'y': isNaN(z) ? .5 : z,
                                    'z': isNaN(y) ? 0 : y
                                };

                                tag.isVisible = GUI_STATE.tags;
                                tag.active = GUI_STATE.inactive;

                                FREE_TAGS.push(tag);
                                tag.addObserver('PlanChanged', (e) => worldController.onTagPlanChange(tag, e.oldPlan, e.newPlan, e.oldBuilding, e.newBuilding));
                            }
                        }

                        $('#canvasloader-container').hide();
                        $('.sewio-loading').fadeOut();
                        worldController.view.render();

                        world.startUpdatingUnits();

                        for (let i = 0; i < FREE_TAGS.length; i++) {
                            FREE_TAGS[i].startUpdating();
                        }
                        /** Pradeep - Customiization - Start */
                        //worldController.updateUnitsGui(selectedPlan);
                        /** Pradeep - Customiization - End */
                        // load models
                        xively.models.list(function(a, b, c) {
                            for (let index in a) {
                                if (!a[index] || !a[index].vertices) {
                                    continue;
                                }

                                let points = a[index].vertices.split(',');
                                let vertices = new Float32Array(points.length);

                                for (let i = 0; i < points.length; i++) {
                                    vertices[i] = parseFloat(points[i]);
                                }

                                let geometry = new THREE.BufferGeometry();
                                geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                                geometry.computeVertexNormals();

                                CUSTOM_GEOMETRIES.push({
                                    'name': a[index].name,
                                    'id': Number(a[index].id),
                                    'alias': '',
                                    'geometry': geometry
                                });

                                console.log('loaded model ' + a[index].name);
                            }

                            if (worldController && selectedPlan) {
                                /** Pradeep - Customiization - Start */
                                //worldController.updateUnitsGui(selectedPlan);
                                /** Pradeep - Customiization - End */
                                world.checkGeometries();
                            }
                        });

                        // model file loading
                        $('input:file').on('change', function () {
                            let file = $(this)[0].files[0];

                            if (file) {
                                let fileType = file.name.match(/\.(.*)$/)[1];

                                for (let i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
                                    if (file.name === CUSTOM_GEOMETRIES[i].name) {
                                        toastr.warning('Model ' + file.name + ' already exists.');
                                        return;
                                    }
                                }

                                var reader = new FileReader();
                                reader.readAsText(file, 'UTF-8');
                                reader.onload = function (content) {
                                    switch (fileType) {
                                    case 'obj':
                                        let geometry = OBJ_LOADER.parse(content.target.result).children[0].geometry;

                                        xively.models.new({ 'name': file.name, 'vertices': geometry.attributes['position'].array.toString() }, function (a,b,c) {
                                            if (b === 'success') {
                                                CUSTOM_GEOMETRIES.push({
                                                    'name': file.name,
                                                    'id': a.id,
                                                    'geometry': geometry
                                                });

                                                toastr.success('Model sucessfully uploaded to database.');

                                                if (worldController && selectedPlan) {
                                                    worldController.updateUnitsGui(selectedPlan);
                                                }
                                            } else {
                                                toastr.error('Could not upload model to database.');
                                            }
                                        });
                                        break;
                                    case 'json':
                                        break;
                                    default:
                                        break;
                                    }

                                    let formData = new FormData();
                                    formData.append('0', file, file.name);
                                };
                            }

                            $('input:file').val('');
                        });
                    });
                } else {
                    xively.reconnectSubscribers();
                }
            }
        }
    });
}

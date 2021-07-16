class DataLoader {
    static subscribeTag (tag) {
        var time = new Date().getTime();

        xively.feed.subscribe(tag.properties.id, function(e, data) {
            
            if (!data.datastreams) {
                return;
            }

            if (data.location && data.location.ele && data.location.name && tag.changePlan(data.location.ele, data.location.name)) {
                //FIXME: changePlan into two methods (shouldChangePlan, changePlan)
            }

            let newPosition = {};
            let newRotation = {};
            let quaternion;
            let skipPositionClr = false;
            let skipPosition = true;
            let skipRotation = true;

            for (let stream of data.datastreams) {
                switch (stream.id) {
                case 'baterry_level':
                    tag.batteryLevel = stream.current_value;
                    break;
                case 'posX':
                    newPosition.x = parseFloat(stream.current_value);
                    skipPosition = false;
                    break;
                case 'posY':
                    newPosition.z = parseFloat(stream.current_value);
                    skipPosition = false;
                    break;
                case 'posZ':
                    newPosition.y = parseFloat(stream.current_value);
                    skipPosition = false;
                    break;
                case 'roll':
                    break;
                case 'pitch':
                    break;
                case 'yaw':
                    break;
                case 'user_button':
                    if (stream.current_value == 'pressed') {
                        tag.highlight();
                    }

                    break;
                case 'clr':
                    if (parseFloat(stream.current_value) > 9990) {
                        skipPositionClr = true;
                    }

                    break;
                case 'quaternion':
                    quaternion = DataParser.parseQuaternions(stream.current_value);
                    skipRotation = false;
                    break;
                }
            }

            if (!tag.isVisible) {
                return;
            }

            let newTime = new Date().getTime();
            let deltaTime = newTime - time;

            tag.handleTimes(deltaTime);
            tag.updateBlink();
            time = newTime;

            let median = tag.getMedian();
            median = (median < 100) ? 100 : median;
            median = (median > 3000) ? 3000 : median;

            for (let i = 0; i < VALID_ZONES.length; i++) {

                if (VALID_ZONES[i].plan !== selectedPlan.name) {
                    continue;
                }

                skipPosition = true;

                let xPoints = [];
                let zPoints = [];

                for (let point of VALID_ZONES[i].zone.properties.points) {
                    xPoints.push(point.x);
                    zPoints.push(point.y);
                }

                if (isInPolygon(xPoints, zPoints, newPosition.x, newPosition.z)) {
                    skipPosition = false;
                    break;
                }
            }

            if (!skipPosition && (!skipPositionClr || GUI_STATE.presence))  {
                if (!tag.isZ && !isNaN(newPosition.y)) {
                    tag.isZ = true;
                }

                newPosition.x = isNaN(newPosition.x) ? tag.position.x : newPosition.x;
                newPosition.y = isNaN(newPosition.y) ? (tag.isZ ? tag.position.y : .5) : newPosition.y;
                newPosition.z = isNaN(newPosition.z) ? tag.position.z : newPosition.z;

                if (tag.firstPosition) {
                    tag.distancePosition = newPosition;
                    tag.firstPosition = false;
                } else {
                    // distance handling
                    let distance = Math.sqrt(Math.pow(tag.distancePosition.x - newPosition.x, 2) + Math.pow(tag.distancePosition.z - newPosition.z, 2));

                    if (distance > 1) {
                        tag.distance += distance;
                        tag.distancePosition = newPosition;
                    }
                }                

                tag.refreshGhosts();

                if (!tag.positionTween) {
                    tag.positionTween = new TWEEN.Tween(tag.position);
                }

                tag.positionTween.stop();
                tag.positionTween.to(newPosition, median).easing( median < 3000 ? TWEEN.Easing.Linear.None : TWEEN.Easing.Exponential.InOut ).onUpdate(function() {
                    tag.position = {
                        'x': this.x,
                        'y': this.y,
                        'z': this.z
                    };
                }).start();
            }

            if (!skipRotation) {
                
                if (!tag.rotationTween) {
                    tag.rotationTween = new TWEEN.Tween({ x: 0 });
                }
                
                tag.startQuaternion.copy(tag.quaternion);
                tag.endQuaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
                
                tag.rotationTween.stop();
                TWEEN.remove(tag.rotationTween);

                tag.rotationTween = new TWEEN.Tween({ x: 0 });

                tag.rotationTween.to({ x: 1 }, median).onUpdate(function() {
                    THREE.Quaternion.slerp(tag.startQuaternion, tag.endQuaternion, tag.quaternion, this.x);
                }).start();
            
            }
        });
    }

    static unsubscribeTag (tag) {
        console.log('unsubsrcibed tag ' + tag.name);
        xively.feed.unsubscribe(tag.properties.id);
    }

    static subscribeAnchor (anchor) {
        xively.feed.subscribe(anchor.properties.id, function(e, data) {
            let newPosition = {};
            newPosition.x = parseFloat(data.datastreams[0].current_value);
            newPosition.y = parseFloat(data.datastreams[2].current_value);
            newPosition.z = parseFloat(data.datastreams[1].current_value);

            newPosition.x = isNaN(newPosition.x) ? 0 : newPosition.x;
            newPosition.y = isNaN(newPosition.y) ? .5 : newPosition.y;
            newPosition.z = isNaN(newPosition.z) ? 0 : newPosition.z;

            anchor.position = newPosition;
        });
    }

    static unsubscribeAnchor (anchor) {
        console.log('unsubscribed anchor ' + anchor.name);
        xively.feed.unsubscribe(anchor.properties.id);
    }
}
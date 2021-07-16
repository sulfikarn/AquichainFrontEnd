/* Class for parsing special data strings from RTLS server */
class DataParser {

    /**
     * parseTags returns parsed data from tags lines as JSON objects
     *
     * @param {Array[String]} tags
     * @return {Object} parsedTags
     */
    static parseBuildingTags(tags) {
        let parsedTags = { 'plans' : {} };

        for (let line of tags) {
            // splits the string by ":" except for ":" between two "#" characters
            let lineParts = line.match(/(#.*?#|[^#:]+)+(?=:*|:*$)/g);

            for (let i = 0; i < lineParts.length; i += 2) {
                if (lineParts[i] == 'plan') {
                    parsedTags.plans[lineParts[i + 1].replace(/#/g,'')] = {};
                    parsedTags.plans[lineParts[i + 1].replace(/#/g,'')].url = (lineParts[i + 3] != null) ? lineParts[i + 3].replace(/#/g,'') : null;
                    i += 2;
                } else {
                    if (lineParts[i][0] == '#') {
                        let plan = lineParts[i].match(/(#.*?#)/)[0].replace(/#/g,'');

                        let val = (lineParts[i + 1] != null) ? lineParts[i + 1].replace(/#/g,'') : null;

                        if (val && val[0] == '(') {
                            val = val.replace(/(\(|\))/g, '');
                            val = val.split('_');

                            let zeroAxis = {};
                            zeroAxis['x'] = parseFloat(val[0]);
                            zeroAxis['y'] = parseFloat(val[1]);
                            parsedTags.plans[plan][lineParts[i].slice(lineParts[i].indexOf(plan) + plan.length + 1).replace(/_/g, '')] = zeroAxis;
                            break;
                        }

                        parsedTags.plans[plan][lineParts[i].slice(lineParts[i].indexOf(plan) + plan.length + 1).replace(/_/g, '')] = val;
                    } else {
                        parsedTags[lineParts[i]] = (lineParts[i + 1] != null) ? lineParts[i + 1].replace(/#/g,'') : null;
                    }
                    
                } 
            }
        }

        return parsedTags;
    }

    /**
     * parseTags returns parsed data from tags lines as JSON objects
     *
     * @param {Array[String]} tags
     * @return {Object} parsedTags
     */
    static parseTags(tags) {
        var parsedTags = {};

        for (let line of tags) {
            // splits the string by ":" except for ":" between two "#" characters
            var lineParts = line.match(/(#.*?#|[^#:]+)+(?=:*|:*$)/g);

            for (let i = 0; i < lineParts.length; i += 2) {

                if (lineParts[i] == 'plan') {
                    parsedTags[lineParts[i]] = (lineParts[i + 1] != null) ? lineParts[i + 1].replace(/#/g,'') : null;
                } else {
                    // creates key/value JSON object from parsed lines
                    parsedTags[lineParts[i]] = (lineParts[i + 1] != null) ? lineParts[i + 1].replace(/#/g,'') : null;
                } 
            }
        }

        return parsedTags;
    }

    static parsePolygons(polygons) {
        var parsedPolygons = [];

        var lineParts = polygons.match(/-?\d*\.-?\d*/g);
        
        for (let i = 0; i < lineParts.length; i++) {
            parsedPolygons.push(new THREE.Vector2(parseFloat(lineParts[i]), parseFloat(lineParts[++i])));
        }

        return parsedPolygons;
    }

    static parseQuaternions(quaternions) {
        let parsedQuaternions = quaternions.split(';');

        let x = parseFloat(parsedQuaternions[0]);
        let y = parseFloat(parsedQuaternions[1]);
        let z = parseFloat(parsedQuaternions[2]);
        let w = parseFloat(parsedQuaternions[3]);

        return { x: -z, y: -x, z: -y, w: w };
    }
}

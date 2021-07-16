function isInPolygon(polygonX, polygonY, x, y) {
    let count = polygonX.length;
    let answer = false;

    let i = 0;
    let j = count - 1;

    for (; i < count; j = i++) {
        if (((polygonY[i] > y) != (polygonY[j] > y)) && (x < (polygonX[j] - polygonX[i]) * (y - polygonY[i]) / (polygonY[j] - polygonY[i]) + polygonX[i])) {
            answer = !answer;
        }
    }

    return answer;
}

function findMedian (a, b, c) {
    if (a > b) {
        if (b > c) {
            return b;
        }
        else if (c > a) {
            return a;
        }
        else {
            return c;
        }
    }
    else {
        if (b < c) {
            return b;
        }
        else if (c < a) {
            return a;
        }
        else {
            return c;
        }
    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    
    return vars;
}

Array.prototype.rotate = (function() {
    var unshift = Array.prototype.unshift,
        splice = Array.prototype.splice;

    return function(count) {
        var len = this.length >>> 0;
        count = count >> 0;

        unshift.apply(this, splice.call(this, count % len, len));
        return this;
    };
})();
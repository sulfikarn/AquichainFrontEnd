/* returns projecting coords of object at @pos */
function toXYCoords (pos, camera) {
	let vector = pos.clone().project(camera);
	vector.x = (vector.x + 1)/2 * window.innerWidth;
	vector.y = -(vector.y - 1)/2 * window.innerHeight;
	return vector;
}
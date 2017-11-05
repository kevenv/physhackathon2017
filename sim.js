"use strict";

var gridH = [];
var grad = [];

function createGrid(w,h)
{
	//grid.data = new Array(w);
	for(var i = 0; i < w; i++) {
		grid.push([]);
		gridH.push([]);
		grad.push([]);
		for(var j = 0; j < h; j++) {
			grid[i].push(0);
			gridH[i].push(0);
			grad[i].push(0);
		}
	}
}


function addSrc(x,y)
{
	sources.push({
		'x' : x,
		'y' : y
	});
	var geometry = new THREE.SphereGeometry(5);
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	var sphere = new THREE.Mesh( geometry, material );
    spheres.push(sphere);
    scene.add( sphere );
    sphere.position.set(sources[sources.length-1].x, sources[sources.length-1].y, 0);
    sphere.visible = true;
}

function waveEq(y0, f, t, x, c)
{
	var w = 2*Math.PI*f;
	var cosResult = Math.cos(w * (t - x/c));
	return y0 * cosResult;
}

function waveEq2DNoDist(a,f,t,c)
{
	var temp1 = new THREE.Vector2(0,0);
	var temp2 = new THREE.Vector2(0,0);
	return waveEq2D(a,temp1,temp2,f,t,c);
}

function waveEq2D(amplitude,sensorLocation,sourceLocation,f,t,c)
{
	var length = sensorLocation.distanceTo(sourceLocation);
	var amp = waveEq(amplitude, f, t, length, c);
	return amp;
}

function tickSim(t, grid, sources, frequency, waveSpeed, amplitude)
{
	var f = frequency;
	var c = waveSpeed;
	var a = amplitude;
	
	// new physics engine!
	var dt = 0.008;
	var damping = 1.2;
	updateField(dt,damping,t,frequency,waveSpeed,amplitude,grid);

	// update amplitudes
	/*var dt = clock.getDelta();
	for(var i = 0; i < gridWidth; i++) {
		for(var j = 0; j < gridHeight; j++) {
			grid[i][j] = 0;
			for (var s = 0; s < sources.length; ++s)
			{
				var sensorLocation = new THREE.Vector2(i, j);
				var sourceLocation = new THREE.Vector2(sources[s].x, sources[s].y);
				grid[i][j] += waveEq2D(a,sensorLocation,sourceLocation,f,t,c);
			}
		}
	}*/

	currentTime += dt;
}

function updateField(dt,damping,t,frequency,wavespeed,amplitude,grid)
{
	for(var i = 0; i < gridWidth; i++) {
		for(var j = 0; j < gridHeight; j++) {
			var deltaX = 0.1;
			var deltaY = 0.1;
			var gradX = (getGrid(grid,i+1,j) - 2.0*getGrid(grid,i,j) + getGrid(grid,i-1,j)) / (deltaX*deltaX);
			var gradY = (getGrid(grid,i,j+1) - 2.0*getGrid(grid,i,j) + getGrid(grid,i,j-1)) / (deltaY*deltaY);
			grad[i][j] = gradX + gradY;

			gridH[i][j] += dt * (grad[i][j] - damping*gridH[i][j]);
			grid[i][j] += dt * gridH[i][j];
		}
	}

	var k = 1;
	for(var s = 0; s < sources.length; ++s) {
		var src = sources[s];
		grid[src.x][src.y] = waveEq2DNoDist(amplitude, frequency, t, wavespeed);
	}
}

function getGrid(grid, i, j)
{
	if(i >= 0 && i <= gridWidth-1 &&
		j >= 0 && j <= gridHeight-1) 
	{
		return grid[i][j];
	}
	else {
		var newI = i;
		var newJ = j;
		if(i < 0) {
			newI = i+1;
		}
		if(i > gridWidth-1) {
			newI = i-1;
		}
		if(j < 0) {
			newJ = j+1;
		}
		if(j > gridHeight-1) {
			newJ = j-1;
		}
		return grid[newI][newJ];
	}
}
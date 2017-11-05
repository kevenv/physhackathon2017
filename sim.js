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

function waveEq2D(a,sensorLocation,sourceLocation,f,t,c)
{
	var length = sensorLocation.distanceTo(sourceLocation);
	var amp = waveEq(a, f, t, length, c);
	return amp;
}

function tickSim(t, grid, sources, frequency, waveSpeed, amplitude)
{
	var f = frequency;
	var c = waveSpeed;
	var dt = clock.getDelta();
	var a = amplitude;
	
	// new physics engine!
	/*
	var dt = 0.008;
	var damping = 1.2;

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

	// src
	//if(t < 1) {
		var k = 1;
		for(var i = gridWidth/2.0-k; i < k+gridWidth/2.0-k; i++) {
			for(var j = gridHeight/2.0-k; j < k+gridHeight/2.0-k; j++){
				grid[i][j] = 100*Math.sin(8*t*Math.PI);
			}
		}	
	//}
	*/

	// update amplitudes
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
	}

	currentTime += dt;
}

function updateField(t,grid)
{
	var dt = 0.008;
	var damping = 1.2;

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

	// src
	//if(t < 1) {
		var k = 1;
		for(var i = gridWidth/2.0-k; i < k+gridWidth/2.0-k; i++) {
			for(var j = gridHeight/2.0-k; j < k+gridHeight/2.0-k; j++){
				grid[i][j] = 100*Math.sin(8*t*Math.PI);
			}
		}	
	//}
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
"use strict";


function createGrid(w,h,d)
{
	//grid.data = new Array(w);
	for(var i = 0; i < w; i++) {
		grid.push([]);
		for(var j = 0; j < h; j++) {
			grid[i].push([]);
			for(var k = 0; k < d; k++) {
				grid[i][j].push(0);
			}
		}
	}
}


function addSrc(x,y,z)
{
	sources.push({
		'x' : x,
		'y' : y,
		'z' : z
	});
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
	var dt = 0.001;
	var a = amplitude;

	// update amplitudes
	for(var i = 0; i < gridWidth; i++) {
		for(var j = 0; j < gridHeight; j++) {
			for (var k = 0; k < gridDepth; k++) {
				grid[i][j][k] = 0;
				for (var s = 0; s < sources.length; ++s)
				{
					var sensorLocation = new THREE.Vector3(i, j, k);
					var sourceLocation = new THREE.Vector3(sources[s].x, sources[s].y, sources[s].z);
					grid[i][j][k] += waveEq2D(a,sensorLocation,sourceLocation,f,t,c);
				}
			}
		}
	}
	currentTime += dt;
}
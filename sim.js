"use strict";

function createGrid(w,h)
{
	var grid = {}

	grid["width"] = w;
	grid["height"] = h;
	grid.data = new Array(grid.width);
	for(var i = 0; i < grid.width; i++) {
		grid.data[i] = new Array(grid.height);
		for(var j = 0; j < grid.height; j++) {
			grid.data[i][j] = {
				"amplitude": 0.0,
				"srcId": -1
			};
		}
	}

	return grid;
}

function addSrc(x,y,src,grid,sources)
{
	var id = sources.length;
	src.id = id;
	grid.data[x][y].srcId = id;
	sources.push(src);
}

function waveEq(y0, f, t, x, c)
{
	var w = 2*Math.PI*f;
	return y0 * Math.cos(w * (t - x/c));
}

function waveEq2D(x0,y0,x,y,f,t,c)
{
	var ampX = waveEq(x0, f, t, x, c);
	var ampY = waveEq(y0, f, t, y, c);
	var amp = new THREE.Vector2(ampX,ampY).length();
	return amp;
}

function tickSim(t, grid, sources)
{
	var f = 10;
	var c = 300;
	var dt = 0.01;
	var x0 = 1.0;
	var y0 = 1.0;

	// update amplitudes
	for(var i = 0; i < grid.width; i++) {
		for(var j = 0; j < grid.height; j++) {
			var x = i * grid.width;
			var y = j * grid.height;
			grid.data[i][j].amplitude = waveEq2D(x0,y0,x,y,f,t,c);
		}
	}

	t += dt;
}
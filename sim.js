"use strict";


function createGrid(w,h)
{
	//grid.data = new Array(w);
	for(var i = 0; i < w; i++) {
		grid.push([]);
		for(var j = 0; j < h; j++) {
			grid[i].push(0);
		}
	}
	sources = grid;
}

function addSrc(x,y,src)
{
	sources[x][y] = src;
}

function waveEq(y0, f, t, x, c)
{
	var w = 2*Math.PI*f;
	var cosResult = Math.cos(w * (t - x/c));

	return y0 * cosResult;
}

function waveEq2D(x0,y0,x,y,f,t,c)
{
	var amp = waveEq(x0, f, t, Math.sqrt(Math.pow(x,2) + Math.pow(y,2)), c);
	return amp;
}

function tickSim(t, grid, sources)
{
	var f = 20;
	var c = 300;
	var dt = 0.001;
	var x0 = 5.0;
	var y0 = 5.0;

	// update amplitudes
	for(var i = 0; i < gridWidth; i++) {
		for(var j = 0; j < gridHeight; j++) {
			grid[i][j] = waveEq2D(x0,y0,i,j,f,t,c);
		}
	}

	currentTime += dt;
}
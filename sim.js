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

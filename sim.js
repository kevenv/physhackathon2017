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

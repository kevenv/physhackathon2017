"use strict";

// GLOBALS ------------------------------------------------------------
var camera, scene, renderer, controls, axis, gridMesh;

var width = 800;
var height = 600;
var windowHalfX = width / 2;
var windowHalfY = height / 2

var grid = [], sources = [], gridMaterials;
var dotGeometry;
var currentTime = 0;
var gridWidth = 100, gridHeight = 100;
// GUI global variable -----------------------------------------------
var params = { 
	amplitude_m: 10, 
	frequency_hz: 10, 
	WaveSpeed_MperSec: 343, 
	GridSizeX: 100, 
	GridSizeY: 100,
	Sources:1};

// EVENTS ------------------------------------------------------------
document.addEventListener("load", onLoad());
function onLoad() {
	/*initControls();*/
	init();
}

document.addEventListener("keypress", function(e) {
	if(e.key == 'a') {
		axis[0].visible = !axis[0].visible;
		axis[1].visible = !axis[1].visible;
		axis[2].visible = !axis[2].visible;
	}
});

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize( event ) {
	renderer.setSize( width, height );

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}

function onRender()
{
	setTimeout( function() {
        requestAnimationFrame( onRender );
    }, 1000 / 15 );
	onUpdate();
	renderer.render(scene, camera);
}

// --------------------------------------------------------------------
function init()
{
	// camera
	var container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 40, windowHalfX / windowHalfY, 1, 3000 );
	camera.up.set(0,0,1);
	camera.position.x = 0;
	camera.position.y = -12;
	camera.position.z = 0;
	camera.lookAt(new THREE.Vector3(0,0,0));

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );
	renderer.autoClear = false;

	// controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	// 3D-axis
	var K = 10;
	var matX = new THREE.LineBasicMaterial({color:0xff0000});
	var matY = new THREE.LineBasicMaterial({color:0x00ff00});
	var matZ = new THREE.LineBasicMaterial({color:0x0000ff});
	var geometryX = new THREE.Geometry();
	geometryX.vertices.push(new THREE.Vector3(0, 0, 0));
	geometryX.vertices.push(new THREE.Vector3(K, 0, 0));
	var lineX = new THREE.Line(geometryX, matX);
	scene.add(lineX);
	var geometryY = new THREE.Geometry();
	geometryY.vertices.push(new THREE.Vector3(0, 0, 0));
	geometryY.vertices.push(new THREE.Vector3(0, K, 0));
	var lineY = new THREE.Line(geometryY, matY);
	scene.add(lineY);
	var geometryZ = new THREE.Geometry();
	geometryZ.vertices.push(new THREE.Vector3(0, 0, 0));
	geometryZ.vertices.push(new THREE.Vector3(0, 0, K));
	var lineZ = new THREE.Line(geometryZ, matZ);
	scene.add(lineZ);
	axis = [lineX, lineY, lineZ];

	createScene();
	gui_init();
	onRender();

	onWindowResize();
}

function createScene()
{
	var SCALE = 4.0;
	var SCALE_SRC = 1.0;

	// create grid
	var sources = [];
	createGrid(gridWidth, gridHeight);
	var src1 = {
		"x": 0,
		"y": 0
	};
	addSrc(src1.x,src1.y);

	var src2 = {
		"x": 50,
		"y": 50
	};
	addSrc(src2.x,src2.y);

	dotGeometry = new THREE.Geometry();

	for (var x = 0; x < grid.length; ++x)
	{
		for (var y = 0; y < grid[x].length; ++y)
		{
			dotGeometry.vertices.push(new THREE.Vector3( x, y, 0));
		}
	}

	var dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
	var dot = new THREE.Points( dotGeometry, dotMaterial );
	scene.add( dot );
}

function onUpdate()
{
	renderer.setClearColor(new THREE.Color(0,0,0));
	renderer.clear();

	controls.update();

	tickSim(currentTime, grid, sources, params.frequency_hz, params.WaveSpeed_MperSec, params.amplitude_m) ;

	for (var x = 0; x < grid.length; ++x)
	{
		for (var y = 0; y < grid[x].length; ++y)
		{
			dotGeometry.vertices[(x*gridHeight)+y].setZ(grid[x][y]);
		}
	}
	dotGeometry.verticesNeedUpdate = true;

	//SHIT SUCKS PLEASE IMPROVE!
	/*while(scene.children.length > 0){ 
	    scene.remove(scene.children[0]); 
	}
	Update(0.05);
	for (var i = 0; i < m_circleArr.length; ++i) {
		var element = m_circleArr[i];

		var geometry = new THREE.CircleBufferGeometry( element['radius'], 8 );
		var wireframe = new THREE.WireframeGeometry( geometry );
		var line = new THREE.LineSegments( wireframe );
		line.material.color.setHex( 0xffffff );
		line.material.depthTest = false;
		line.material.opacity = 1;
		line.material.transparent = true;
		line.position.copy(element['position']);
		scene.add( line );
	}*/
}

/*
function initControls()
{
	var sliderLightX = document.getElementById("slider_L_pos_x");
	sliderLightX.defaultValue = 0.0;
	sliderLightX.min = -4;
	sliderLightX.max = +4;
	sliderLightX.step = 0.1;
	sliderLightX.addEventListener("input", function() {
		light.position.x = parseFloat(sliderLightX.value);
	});

	var sliderLightY = document.getElementById("slider_L_pos_y");
	sliderLightY.defaultValue = 1.1;
	sliderLightY.min = -4;
	sliderLightY.max = +4;
	sliderLightY.step = 0.1;
	sliderLightY.addEventListener("input", function() {
		light.position.y = parseFloat(sliderLightY.value);
	});

	var sliderLightZ = document.getElementById("slider_L_pos_z");
	sliderLightZ.defaultValue = 2.0;
	sliderLightZ.min = 0;
	sliderLightZ.max = +8;
	sliderLightZ.step = 0.1;
	sliderLightZ.addEventListener("input", function() {
		light.position.z = parseFloat(sliderLightZ.value);
	});
}
*/

// UTILS ------------------------------------------------------------

var asyncLoop = function(o)
{
    var i=-1;

    var loop = function() {
        i++;
        if(i==o.length){o.callback(); return;}
        o.functionToLoop(loop, i);
    }
    loop();//init
}

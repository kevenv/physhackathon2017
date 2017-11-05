"use strict";

// GLOBALS ------------------------------------------------------------
var camera, scene, renderer, controls, axis, gridMesh, clock;

var width = 1500;
var height = 800;
var windowHalfX = width / 2;
var windowHalfY = height / 2

var grid = [], sources = [], gridMaterials;
var currentTime = 0;
var dotGeometry;

var gridWidth = 200, gridHeight = 200;
var spheres = [];
// GUI global variable -----------------------------------------------
var params = { 
	amplitude_m: 10, 
	frequency_hz: 0.1, 
	WaveSpeed_MperSec: 70, 
	GridSizeX: 100, 
	GridSizeY: 100,
	Freeze:false,
	Source:1,
	numSource:2,
	AddSource : function(){ addSource();}
};

function addSource(){
	params.numSource++;
	addSrc(Math.round(Math.random()*100),Math.round(Math.random()*100));
}


var sourceA = {
	x : 175,
	y : 25
}

var sourceB = {
	xa : 25,
	yb : 175
} 


//colors---------------------------------
var Config=function(input){
        this.color = input;
}

var colorsTop = new Config("#FF0000");
var colorsBot = new Config("#0000FF");


var rgbTop = {
	r: 255,
	g: 0,
	b: 0
}

var rgbBot = {
	r: 0,
	g: 0,
	b: 255
}

function ConvertRgb(r,g,b,rgb) {
	rgb.r = r;
	rgb.g = g;
	rgb.b = b;
}

//update color 
function updateColor(hex,rgb){
	var colorValue = parseInt ( hex.replace("#","0x"), 16 );
	var Cool = new THREE.Color(colorValue);
	ConvertRgb(Cool.r,Cool.g,Cool.b,rgb);
}


//----------------------------------

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
    }, 1000 / 90 );
    if(!params.Freeze){
    	onUpdate();
    }
	renderer.render(scene, camera);
}

// --------------------------------------------------------------------
function init()
{
	// camera
	var container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 40, windowHalfX / windowHalfY, 1, 3000 );
	camera.up.set(0,0,1);
	camera.position.x = 388;
	camera.position.y = 400;
	camera.position.z = 119;
	camera.lookAt(new THREE.Vector3(50,50,0));

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

	clock = new THREE.Clock();

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
	createGrid(gridWidth, gridHeight);

	addSrc(sourceA.x,sourceA.y);
	addSrc(sourceB.xa,sourceB.yb);
	
	dotGeometry = new THREE.BufferGeometry();

	var vertices = new Float32Array(3*gridWidth*gridHeight);
	var colors = new Float32Array(3*gridWidth*gridHeight);
	for (var x = 0; x < gridWidth; ++x)
	{
		for (var y = 0; y < gridHeight; ++y)
		{
			var index = (x*gridWidth) + y;
			vertices[index] = x;
			vertices[index+1] = y;
			vertices[index+2] = 0;
			colors[index] = 1;
			colors[index+1] = 1;
			colors[index+2] = 1;
		}
	}

	dotGeometry.addAttribute('position', new THREE.BufferAttribute( vertices, 3 ));
	dotGeometry.addAttribute('color', new THREE.BufferAttribute( colors, 3 ));
	var pointsMaterial = new THREE.PointsMaterial( { size: 2, sizeAttenuation: false, vertexColors: THREE.VertexColors } );
	var dot = new THREE.Points( dotGeometry, pointsMaterial );

	scene.add( dot);

	// add sphere to source point
    var geometry = new THREE.SphereGeometry(5);
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    /*for (var i = 0; i<sources.length;++i){

    	var sphere = new THREE.Mesh( geometry, material );
    	spheres.push(sphere);
        scene.add( sphere );
        sphere.position.set(sources[i].x, sources[i].y, 0);
        sphere.visible = true;
    }*/
}

function onUpdate()
{
	//update the sources
	updateSource(0,sourceA.x,sourceA.y);
	updateSource(1,sourceB.xa,sourceB.yb);
	for (var i = 2; i < sources.length; ++i)
	{
		updateSource(i,sources[i].x,sources[i].y);
	}
	updateColor(colorsTop.color,rgbTop);
	updateColor(colorsBot.color,rgbBot);

	renderer.setClearColor(new THREE.Color(0,0,0));
	renderer.clear();

	controls.update();

	tickSim(currentTime, grid, sources, params.frequency_hz, params.WaveSpeed_MperSec, params.amplitude_m) ;

	 for (var x = 0; x < grid.length; ++x)
    {
        for (var y = 0; y < grid[x].length; ++y)
        {
        	var ratio = (10+grid[x][y])/20;
            //var Red = rgbTop.r*(1.0)/255;
            //var Green = rgbTop.g*(1.0)/255;
            //var Blue = rgbTop.b*(1.0)/255;
            var Red =  (rgbBot.r + ((rgbTop.r - rgbBot.r)*ratio));
            var Green = (rgbBot.g + ((rgbTop.g - rgbBot.g)*ratio));
            var Blue = (rgbBot.b + ((rgbTop.b - rgbBot.b)*ratio));
            var index = 3*((x*gridHeight)+y);
            dotGeometry.attributes.position.set([x,y,grid[x][y]], index);
            dotGeometry.attributes.color.set([Red,Green,Blue], index);
        }
    }
    dotGeometry.attributes.position.needsUpdate = true;
    dotGeometry.attributes.color.needsUpdate = true;

    //shit something something 
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

//as advertised, we update the sources
function updateSource(index,NewX,NewY)
{
	sources[index].x = NewX;
	sources[index].y = NewY;
	spheres[index].position.set(NewX, NewY, grid[NewX][NewY]);
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

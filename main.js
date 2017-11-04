"use strict";

// GLOBALS ------------------------------------------------------------
var camera, scene, renderer, controls, sphere, light, bounds, axis;

var width = 800;
var height = 600;
var windowHalfX = width / 2;
var windowHalfY = height / 2;

// EVENTS ------------------------------------------------------------
document.addEventListener("load", onLoad());
function onLoad() {
	initControls();
	init();
}

document.addEventListener("keypress", function(e) {
	if(e.key == 'b') {
		bounds.visible = !bounds.visible;
	}
	else if(e.key == 'a') {
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
	renderer.render(scene, camera)
}

// --------------------------------------------------------------------
function init()
{
	var fileLoader = new THREE.FileLoader();

	var container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 40, windowHalfX / windowHalfY, 1, 3000 );
	camera.up.set(0,0,1);
	camera.position.x = 4.92;
	camera.position.y = -14;
	camera.position.z = 15.5;
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

	onWindowResize();
}

function addMesh()
{
	// create light
	var lightG = new THREE.SphereGeometry(0.1,16,16);
	var lightMat = new THREE.MeshBasicMaterial({color: new THREE.Color(1,1,1)});
	light = new THREE.Mesh(lightG, lightMat);
	light.position.y = 1.1;
	light.position.z = 2;
	scene.add(light);
	
	// create bounding sphere
	var boundsG = new THREE.SphereGeometry(5.0,16,16);
	var boundsM = new THREE.MeshBasicMaterial( {
		color: new THREE.Color(1,1,1,1),
		wireframe: true
	} );
	bounds = new THREE.Mesh(boundsG, boundsM);
	scene.add(bounds);

	onRender();
}

function onUpdate()
{
	renderer.setClearColor(new THREE.Color(0,0,0));
	renderer.clear();

	controls.update();

	//sphere.rotation.x += 0.005;
	//sphere.rotation.y += 0.005;
}

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

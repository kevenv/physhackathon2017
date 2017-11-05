"use strict";

// GUI global variable -----------------------------------------------
var ssaoPass = {};
var params = { 
	amplitude_m: 10, 
	frequency_hz: 1, 
	WaveSpeed_MperSec: 75, 
	GridSizeX: 100, 
	GridSizeY: 100,
	Freeze:false,
	Source:1,
	numSource:2,
	switch_Algorithm:false,
	soundCompressionMode:false,
	AddSource : function(){ addSource();},
	Reset: function (value) {
        for (var i = 0; i < sources.length; i++) {
        gui.removeFolder('Source'+i);
    }
        resetGrid();
        resetSource();

    }
};
var gui;

dat.GUI.prototype.removeFolder = function(name) {
    var folder = this.__folders[name];
    if (!folder) {
        return;
    }
    folder.close();
    this.__ul.removeChild(folder.domElement.parentNode);
    delete this.__folders[name];
    this.onResize();
}
function gui_init()
{
	// Init gui
	gui = new dat.GUI({ width: 500 });
	var WaveControls = gui.addFolder( 'WaveControls' );
	var ColorControls = gui.addFolder( 'Color');
	WaveControls.add(params, 'Freeze',false).onChange( function( value ) { ssaoPass.Freeze = value; } );
	WaveControls.add(params, 'amplitude_m' ).min( 0 ).max( 100 ).onChange( function( value ) { ssaoPass.amplitude_m = value; } );
	WaveControls.add(params, 'frequency_hz' ).min( 0 ).max( 2 ).onChange( function( value ) { ssaoPass.frequency_hz = value; } );
	// unit for WaveSpeed is m/s
	WaveControls.add(params, 'WaveSpeed_MperSec' ).min( 0 ).max(1000).onChange( function( value ) { ssaoPass.WaveSpeed_MperSec = value; } );
	WaveControls.add(params, 'switch_Algorithm',false).onChange( function( value ) {ssaoPass.switch_Algorithm = value; });
	WaveControls.add(params, 'soundCompressionMode',false).onChange( function( value ) {ssaoPass.soundCompressionMode = value; });
	WaveControls.add(params, 'AddSource');
	WaveControls.add(params, 'Reset')

	//handling color input 
	var Top = ColorControls.addColor(colorsTop, 'color');
	var Bot = ColorControls.addColor(colorsBot, 'color');
	
	Top.onChange( function(value)
	{ 
			value=value.replace( '#','0x' );
			colorsTop.color =  value;
	});
	Bot.onChange( function(value)
	{ 
			value=value.replace( '#','0x' );
			colorsBot.color =  value;
	});

	WaveControls.open();
}

function gui_addSource(sources)
{
	var i = sources.length - 1;
	var sourceControl = gui.addFolder( 'Source' + i );
	sourceControl.add(sources[i], 'x', 0,200,1).onChange( function(value){ ssaoPass.x = value; });
	sourceControl.add(sources[i], 'y', 0,200,1).onChange( function(value){ ssaoPass.y = value; });
	sourceControl.add(sources[i], 'phase').min(-2).max(2).onChange( function(value){ ssaoPass.phase = value; });
}

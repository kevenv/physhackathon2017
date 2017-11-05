function gui_init()
{

	//adding GUI
	// Initparams
	init_params();
	// Init gui
	var gui = new dat.GUI({ width: 500 });
	var WaveControls = gui.addFolder( 'WaveControls' );
	var SourceControlA = gui.addFolder( 'Source1' );
	var SourceControlB = gui.addFolder( 'Source2' );
	var GridControls = gui.addFolder( 'GridControls' );
	var ColorControls = gui.addFolder( 'Color');
	WaveControls.add(params, 'Freeze',false).onChange( function( value ) { ssaoPass.Freeze = value; } );
	WaveControls.add(params, 'amplitude_m' ).min( 0 ).max( 100 ).onChange( function( value ) { ssaoPass.amplitude_m = value; } );
	WaveControls.add(params, 'frequency_hz' ).min( 0 ).max( 2 ).onChange( function( value ) { ssaoPass.frequency_hz = value; } );
	// unit for WaveSpeed is m/s
	WaveControls.add(params, 'WaveSpeed_MperSec' ).min( 0 ).max(1000).onChange( function( value ) { ssaoPass.WaveSpeed_MperSec = value; } );
	WaveControls.add(params, 'AddSource');
	// how to add more sources is to be determined
	//WaveControls.add(params, 'Sources',1,10,1).onChange( function( value ) { ssaoPass.Sources = value; });
	//change position of sourceA
	SourceControlA.add(sourceA, 'x', 0,200,1).onChange( function(value){ ssaoPass.x = value; });
	SourceControlA.add(sourceA, 'y', 0,200,1).onChange( function(value){ ssaoPass.y = value; });
	//cange position of sourceB
	SourceControlB.add(sourceB, 'xa', 0,200,1).onChange( function(value){ ssaoPass.xa = value; });
	SourceControlB.add(sourceB, 'yb', 0,200,1).onChange( function(value){ ssaoPass.yb = value; });

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




	// grid size initially is 100*100
	GridControls.add(params, 'GridSizeX' ).min( 0 ).max( 1000).onChange( function( value ) {
		ssaoPass.GridSizeX = value;

	} );
	GridControls.add(params, 'GridSizeY' ).min( 0 ).max( 1000).onChange( function( value ) {
		ssaoPass.GridSizeY = value;

	} );

	WaveControls.open();

}

function init_params() 
{
	// Setup render pass
	var renderPass = new THREE.RenderPass( scene, camera );
	// Setup SSAO pass
	ssaoPass = new THREE.SSAOPass( scene, camera );
	ssaoPass.renderToScreen = true;
	// Add pass to effect composer
	effectComposer = new THREE.EffectComposer( renderer );
	effectComposer.addPass( renderPass );
	effectComposer.addPass( ssaoPass );
}
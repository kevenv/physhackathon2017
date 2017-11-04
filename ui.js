function gui_init()
{

	//adding GUI
	// Initparams
	init_params();
	// Init gui
	var gui = new dat.GUI({ width: 500 });
	var WaveControls = gui.addFolder( 'WaveControls' );
	var GridControls = gui.addFolder( 'GridControls' );
	WaveControls.add(params, 'Freeze',false).onChange( function( value ) { ssaoPass.Freeze = value; } );
	WaveControls.add(params, 'amplitude_m' ).min( 0 ).max( 1000 ).onChange( function( value ) { ssaoPass.amplitude_m = value; } );				
	WaveControls.add(params, 'frequency_hz' ).min( 0 ).max( 1000 ).onChange( function( value ) { ssaoPass.frequency_hz = value; } );
	// unit for WaveSpeed is m/s
	WaveControls.add(params, 'WaveSpeed_MperSec' ).min( 0 ).max( 1000 ).onChange( function( value ) { ssaoPass.WaveSpeed_MperSec = value; } );
	// how to add more sources is to be determined
	WaveControls.add(params, 'Sources',1,10,1).onChange( function( value ) { ssaoPass.Sources = value; });
	// grid size initially is 100*100
	GridControls.add(params, 'GridSizeX' ).min( 0 ).max( 1000).onChange( function( value ) { ssaoPass.GridSizeX = value; } );
	GridControls.add(params, 'GridSizeY' ).min( 0 ).max( 1000).onChange( function( value ) { ssaoPass.GridSizeY = value; } );

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
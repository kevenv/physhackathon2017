function gui_init()
{

	//adding GUI
	// Initparams
	init_params();
	// Init gui
	var gui = new dat.GUI({ width: 500 });
	var folderControls = gui.addFolder( 'controls' );
	//gui.add(params, 'onlyAO', false ).onChange( function( value ) { ssaoPass.onlyAO = value; } );
	folderControls.add(params, 'amplitude_m' ).min( 0 ).max( 1000 ).onChange( function( value ) { ssaoPass.amplitude_m = value; } );				
	folderControls.add(params, 'frequency_hz' ).min( 0 ).max( 1000 ).onChange( function( value ) { ssaoPass.frequency_hz = value; } );
	// unit for WaveSpeed is m/s
	folderControls.add(params, 'WaveSpeed_MperSec' ).min( 0 ).max( 1000 ).onChange( function( value ) { ssaoPass.WaveSpeed_MperSec = value; } );
	// grid size initially is 100*100
	folderControls.add(params, 'GridSizeX' ).min( 0 ).max( 1000 ).onChange( function( value ) { ssaoPass.GridSizeX = value; } );
	folderControls.add(params, 'GridSizeY' ).min( 0 ).max( 1000 ).onChange( function( value ) { ssaoPass.GridSizeY = value; } );
	// how to add more sources is to be determined
	folderControls.add(params, 'Sources' ).min( 0 ).max( 10 ).onChange( function( value ) { ssaoPass.Sources = value; } );
	folderControls.open();

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
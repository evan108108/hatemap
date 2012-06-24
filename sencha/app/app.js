/*========================================================
 *	App container
 *======================================================*/
Ext.Loader.setConfig({ enabled: true });
Ext.namespace('Hate');

Ext.application({
	name: 'app',
	phoneStartupScreen: '',
	appFolder: 'app',
	mapCenter: [37.788539, -122.401643],
	views: 	[
		//'Contacts',
		'HateList',
		'HateMap',
		'window.HateSubmit'
	],
	stores: [
		//'Contacts',
		'Hates'
	],
	controllers: [/*'Viewport',*/ 'HateMaster'],
	launch: function() {
		Hate.Viewport = Ext.create('app.view.Viewport', {
			
		});
		
		this.fireEvent('showHates');
		// Ext.Viewport.getLayout().setAnimation({
		// 	type: 'slide',
		// 	direction: 'left'
		// });
	}
});
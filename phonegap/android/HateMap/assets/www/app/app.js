/*========================================================
 *	App container
 *======================================================*/
Ext.Loader.setConfig({ enabled: true });
Ext.namespace('Hate');

Ext.application({
	name: 'app',

	phoneStartupScreen: 'assets/loading/Homescreen.jpg',
    tabletStartupScreen: 'assets/loading/Homescreen~ipad.jpg',

    glossOnIcon: false,
    icon: {
        57: 'assets/icons/icon.png',
        72: 'assets/icons/icon@72.png',
        114: 'assets/icons/icon@2x.png',
        144: 'assets/icons/icon@114.png'
    },

	appFolder: 'app',

	//
	mapCenter: [37.788539, -122.401643],

	views: 	[
		'HateList',
		'HateMap',
		'HateDetails',
		'form.HateSubmit',
		'carousel.Carousel',
		'carousel.CarouselSlide'
	],
	stores: [
		'Hates',
		'Tags'
	],
	controllers: [/*'Viewport',*/ 'HateMaster'],
	launch: function() {
		
		this.launched = true;
        this.mainLaunch();
        
		
	},
    mainLaunch: function() {
        if (!device || !this.launched) {return;}
        console.log('mainLaunch');
        this.mapCenter = [Hate.current_lat,Hate.current_long];
        
        /*Hate.Viewport = Ext.create('app.view.Viewport', {
		
		});*/
		Ext.Viewport.add({
            xclass: 'app.view.Main'
        });
		this.fireEvent('showHates');
		// Ext.Viewport.getLayout().setAnimation({
		// 	type: 'slide',
		// 	direction: 'left'
		// });
		//console.log(Ext.getVersion().major+' '+Ext.getVersion().minor+' '+Ext.getVersion().patch);
    }
});
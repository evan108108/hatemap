Ext.define('app.controller.Viewport', {
    extend: 'Ext.app.Controller',
	config: {
		refs: {
		
		}
	},

	init: function() {
		var me = this;
		this.app = this.getApplication();	//	short ref to our app
		this.app.vp = Ext.Viewport;			//	set app level ref to our viewport
		
		//	topNav interaction listeners
		this.control({
			
		});
		
		//	TODO: Fix this.  not predictable to use a timer to destroy, 
		//	but no afteritemchange event yet
		//	destroy the old card to clean up the interface
		this.app.vp.on('activeitemchange', function(layout, newCard, oldCard){
			if(oldCard){
				Ext.Function.defer(function(){ 
					oldCard.destroy();					
				}, 500);
			}
		});
	},
	launch: function(){
		console.log("Launched Viewport");
	}
});
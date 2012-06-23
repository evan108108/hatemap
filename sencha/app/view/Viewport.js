Ext.define('app.view.Viewport', {
	extend: 'Ext.TabPanel',
	
	
	config: {
		fullscreen: true,
		xtype: 'appviewport',
		tabBarPosition: 'bottom',
		
		items: [
			{
	            docked: 'top',
	            xtype : 'toolbar',
	            title: 'Hatemap',
	            items: [
	              {
	                xtype: 'button',
	                id: 'hate-button',
	                //ui: 'back',
	                itemId:'hateButton',
	                text: 'Hate'
	                
	              }
	            ]
	        },
			{
				xtype:'hateMap'
				
			},
			{ 	// Adding by xtype
				xtype: 'hateList'
			}
		]
	}
});

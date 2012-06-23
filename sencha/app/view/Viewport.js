Ext.define('app.view.Viewport', {
	extend: 'Ext.TabPanel',
	config: {
		fullscreen: true,
		xtype: 'appviewport',
		tabBarPosition: 'bottom'
	},
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
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
	                text: 'Hate',
	                listeners:{
	                	fn:me.onHateAction,
	                	scope:me
	                }
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
        });

        me.callParent(arguments);
    },
    onHateAction:function(){
    	alert('Some hate action')
    }
});

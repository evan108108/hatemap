Ext.define('app.view.HateDetails', {
    extend: 'Ext.Container',
	requires: ['app.view.template.HateDetails'],
	xtype: 'contactDetails',
	
	config: {
		layout: {
			type: 'vbox'
		},
		scrollable: {
		    direction: 'vertical',
		    directionLock: true
		},
		tpl: Ext.create('app.view.template.HateDetails')
	},

    constructor : function(config) {
		console.log(config);
//		this.setData(config.data);
		this.callParent([config]);
	}
});
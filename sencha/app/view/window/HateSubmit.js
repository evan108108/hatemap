Ext.define('app.view.window.HateSubmit', {

	extend: 'Ext.Container',
	xtype: 'hateSubmit',
  	
	requires: 'app.view.template.Hate',
	

	config: {
		title: 'Feed',
		iconCls: "team",
		emptyText: 'No Hates :-(',
		store: 'Hates',
		// layout: {
		// 	type: 'vbox'
		// },
		itemTpl: Ext.create('app.view.template.Hate')
	},

    constructor : function(config) {
		this.callParent([config]);
	}
});
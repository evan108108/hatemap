Ext.define('app.view.HateList', {
    extend: 'Ext.List',
	requires: 'app.view.template.Hate',
	xtype: 'hateList',

	config: {
		title: 'Hate Feed',
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
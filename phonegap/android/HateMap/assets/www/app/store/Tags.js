Ext.define('app.store.Tags', {
    extend: 'Ext.data.Store',
	requires: 'app.model.Tag',
	config: {
		storeId: 'Tags',	//	ref to bind inside views
		model: 'app.model.Tag',
		data: [
			{id:1, name:'food'},
			{id:2, name:'dick'},
			{id:3, name:'kaka'},
			{id:4, name:'yumbo'}
		]
	}
});

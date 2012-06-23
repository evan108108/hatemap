Ext.define('app.store.Hates', {
    extend: 'Ext.data.Store',
	requires: 'app.model.Hate',
	config: {
		storeId: 'Hates',	//	ref to bind inside views
		model: 'app.model.Hate',
		data: [
			{id:1, lat:'45.454545',long:'23.23232',weight:0,url:'http',desc:'Hate Tag Hate',address:''},
			{id:2, lat:'45.454545',long:'23.23232',weight:2,url:'http',desc:'More hate',address:''},
			{id:3, lat:'45.454545',long:'23.23232',weight:5,url:'http',desc:'I hate this Hate',address:''},
			{id:4, lat:'45.454545',long:'23.23232',weight:10,url:'http',desc:'Booo booo!',address:''}
		]
	}
});

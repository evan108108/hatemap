Ext.define('app.store.Hates', {
    extend: 'Ext.data.Store',
	requires: 'app.model.Hate',
	config: {
		storeId: 'Hates',	//	ref to bind inside views
		model: 'app.model.Hate',
		data: [
			{id:1, lat:'40.714269',long:'-74.004972',weight:0,url:'http',desc:'Hate Tag Hate',address:''},
			{id:2, lat:'40.704269',long:'-74.002972',weight:2,url:'http',desc:'More hate',address:''},
			{id:3, lat:'40.601269',long:'-74.015972',weight:5,url:'http',desc:'I hate this Hate',address:''},
			{id:4, lat:'41.714269',long:'-74.105972',weight:10,url:'http',desc:'Booo booo!',address:''}
		]
	}
});
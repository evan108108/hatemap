Ext.define('app.store.Hates', {
    extend: 'Ext.data.Store',
	requires: 'app.model.Hate',
	config: {
		storeId: 'Hates',	//	ref to bind inside views
		model: 'app.model.Hate',
		autoload:true
		/*data: [
			{id:1, lat:'45.454545',long:'23.23232',weight:0,url:'resources/photos/1.jpg',desc:'Hate Tag Hate',address:''},
			{id:2, lat:'45.454545',long:'23.23232',weight:2,url:'resources/photos/2.jpg',desc:'More hate',address:''},
			{id:3, lat:'45.454545',long:'23.23232',weight:5,url:'resources/photos/3.jpg',desc:'I hate this Hate',address:''},
			{id:4, lat:'45.454545',long:'23.23232',weight:10,url:'resources/photos/4.jpg',desc:'Booo booo!',address:''}
		]*/
	},
	getSlides:function(){
		var slides = [];
		this.each(function(item){
			console.log(item.raw.url)
			slides.push({
				xtype:'image',
				cls:'my-carousel-item-img',
				src:item.raw.url,
				fullscreen:true
			});
		});		
		return slides;
	}
});

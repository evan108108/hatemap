Ext.define('app.controller.HateMaster', {
    extend: 'Ext.app.Controller',
	config: {
		refs: {
			contacts: 'contactDetails'
		},
		xtype: 'hateMaster'
	},

	init: function() {
		var me = this;
		this.app = this.getApplication();	//	short ref to our app
		this.app.vp = Ext.Viewport;			//	set app level ref to our viewport
		
		//	event listener to show view
		this.app.on('showHates', function(){
			me.showHates();
		});

		this.control({
			'contactDetails': {
				itemtap: function(view, idx){
					var rec = Ext.getStore('Hates').getAt(idx);
					me.showHateDetail(rec);
				}
			}
		});

	},
	
	showHates: function() {
		var contacts = Ext.create('app.view.HateMap');
		// this.app.vp.add(contacts);
		console.log(this.app.vp)
		console.log('SHOW FUCKING CONTACTS')
		// this.app.vp.setActiveItem(contacts);
	},
	
	showHateDetail: function(rec){
		var details = Ext.create('app.view.HateDetail', {data: rec.data});
		this.app.vp.add(details);
		this.app.vp.setActiveItem(details);
		console.log(rec);
	}
});
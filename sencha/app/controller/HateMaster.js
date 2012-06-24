Ext.define('app.controller.HateMaster', {
    extend: 'Ext.app.Controller',
	config: {
		refs: {
			main: 'mainview',
			mapView:'mapView',
			hates: 'hateDetails',
			hateButton:'#hateButton',
			saveButton: '#saveButton',
			mapButton: '#mapButton',
			listButton: '#listButton',
			privateButton: '#privateButton',
			globalButton: '#globalButton',
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
			main: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
			hateDetails: {
				itemtap: function(view, idx){
					var rec = Ext.getStore('Hates').getAt(idx);
					me.showHateDetail(rec);
				}
			},
			hateButton:{
				tap:'onHateAction'
			},			
            saveButton: {
                tap: 'onContactSave'
            },
            mapButton:{
            	tap:'onUpdateView'
            },
            listButton:{
            	tap:'onUpdateView'
            },
            privateButton:{
            	tap:'onUpdateView'
            },
            globalButton:{
            	tap:'onUpdateView'
            }
		});
	},
	launch:function(){

	},
	onUpdateView:function(item){
		switch(item.id){
			case 'mapButton':
				/*var ref = 'app.view.HateMap';
				if(!this.mapView) this.mapView = Ext.create(ref);
				this.getMain().push(this.mapView);*/
				this.getMain().pop();
			break;

			case 'listButton':
				var ref = 'app.view.HateList';
				if(!this.listView) this.listView = Ext.create(ref);
				this.getMain().push(this.listView);
			break;
		}
		
	},
	onMainPush: function(view, item) {
		console.log('onMainPush')
        var hateButton = this.getHateButton();

        if (item.xtype == "contact-show") {
            //this.getContacts().deselectAll();

            this.showHateButton();
        } else {
            this.hideHateButton();
        }
    },

    onMainPop: function(view, item) {
    	console.log('onMainPop')
        if (item.xtype == "hateSubmit") {
            this.showHateButton();
        } else {
            this.hideHateButton();
        }
    },
	showHates: function() {
		var contacts = Ext.create('app.view.HateMap');
		// this.app.vp.add(contacts);
		console.log(this.app.vp)
		console.log('SHOW FUCKING CONTACTS')
		//this.app.vp.setActiveItem(contacts);
	},
	
	showHateDetail: function(rec){
		var details = Ext.create('app.view.HateDetail', {data: rec.data});
		this.app.vp.add(details);
		this.app.vp.setActiveItem(details);
		console.log(rec);
	},
	onHateAction:function(){
		console.log('on hate action');
		if (!this.hateForm) {
            this.hateForm = Ext.create('app.view.window.HateSubmit');
        }

        // Bind the record onto the edit contact view
        //this.hateForm.setRecord(this.getShowContact().getRecord());

        this.getMain().push(this.hateForm);
	},

	//BUTTON TOOLBAR HANDLING.
	showHateButton: function() {
        var hateButton = this.getHateButton();

        if (!hateButton.isHidden()) {
            return;
        }

        this.hideSaveButton();

        hateButton.show();
    },

    hideHateButton: function() {
        var hateButton = this.getHateButton();

        if (hateButton.isHidden()) {
            return;
        }

        hateButton.hide();
    },

    showSaveButton: function() {
        var saveButton = this.getSaveButton();

        if (!saveButton.isHidden()) {
            return;
        }

        saveButton.show();
    },

    hideSaveButton: function() {
        var saveButton = this.getSaveButton();

        if (saveButton.isHidden()) {
            return;
        }

        saveButton.hide();
    }
});
Ext.define('app.controller.HateMaster', {
    extend: 'Ext.app.Controller',
	config: {
		refs: {
			main: 'mainview',
			mapView:'mapView',
			hateList: 'hateList',
			hateForm:'hateSubmit',
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
            hateForm:{
            	change:me.onHateFormChange
            },
			hateList: {
				itemtap:'showHateDetail'
				/*itemtap: function(view, idx){
					var rec = Ext.getStore('Hates').getAt(idx);
					console.log(rec);
					me.showHateDetail(rec);
				}*/
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
				this.getMain().pop();
			break;

			case 'listButton':
				var ref = 'app.view.HateList';
				if(!this.listView) this.listView = Ext.create(ref);
				this.getMain().push(this.listView);
			break;
			case 'privateButton':
				console.log('Make private filtering');
			break;
			case 'globalButton':
				console.log('Make public filtering');
			break;
		}
		
	},
	onMainPush: function(view, item) {
		console.log('onMainPush')
        var hateButton = this.getHateButton();

        this.activeItem = this.getMain().getActiveItem();
       
        if (this.activeItem.xtype == "hateMap") {
            //this.getContacts().deselectAll();
           this.showHateButton();
           this.getMapButton().disable();
        } else {
            this.hideHateButton();
            this.getMapButton().enable();
        }
       
    },

    onMainPop: function(view, item) {
    	console.log('onMainPop')
    	
    	this.activeItem = this.getMain().getActiveItem();

        if (this.activeItem.xtype == "hateMap") {
            this.showHateButton();
             this.getMapButton().disable();
        } else {
            this.hideHateButton();
            this.getMapButton().enable();
        }

    },
	showHates: function() {
		console.log('SHOW FUCKING CONTACTS')
		//this.app.vp.setActiveItem(contacts);
	},
	
	showHateDetail: function(list, index, node, record) {
        
        if (!this.showHate) {
            this.showHate = Ext.create('app.view.HateDetails');
        }

        // Bind the record onto the show contact view
        this.showHate.setRecord(record);

        // Push the show contact view into the navigation view
        this.getMain().push(this.showHate);
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

	/**
	 * Fired when form changes.
	 */
	onHateFormChange: function() {
        this.showSaveButton();
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
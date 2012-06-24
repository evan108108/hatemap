Ext.define('app.controller.HateMaster', {
    extend: 'Ext.app.Controller',
	config: {
		refs: {
<<<<<<< HEAD
			contacts: 'contactDetails',
			hateButton:'button[id=hate-button]'
=======
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
>>>>>>> sencha
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
<<<<<<< HEAD
			'contactDetails': {
				itemtap: function(view, idx){
					var rec = Ext.getStore('Hates').getAt(idx);
					me.showHateDetail(rec);
				}
			},
			'button[id=hate-button]':{
				tap:'onHateAction'
			}
=======
			main: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            hateForm:{
            	change:'onHateFormChange'
            },
			hateList: {
				itemtap:'showHateDetail'
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
>>>>>>> sencha
		});
	},
	launch:function(){

	},
<<<<<<< HEAD
=======
	onUpdateView:function(item){
		switch(item.id){
			case 'mapButton':
				this.getMain().pop();
			break

			case 'listButton':
				var ref = 'app.view.HateList';
				if(!this.listView) this.listView = Ext.create(ref);
				this.getMain().push(this.listView);
			break
			case 'privateButton':
				console.log('Make private filtering');
			break
			case 'globalButton':
				console.log('Make public filtering');
			break
		}
		
	},
	onMainPush: function(view, item) {
		console.log('onMainPush')
        var hateButton = this.getHateButton();

        this.activeItem = this.getMain().getActiveItem();

       var type = this.activeItem.xtype;
       switch(type){
    		case 'hateMap':
    		case 'hateList':
    			this.enableFilters();
    		break
    		default:
    			this.disableFilters();
    		break
    	}

        if (this.activeItem.xtype == "hateMap") {
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
    	
    	var type = this.activeItem.xtype;

    	switch(type){
    		case 'hateMap':
    		case 'hateList':
    			this.enableFilters();
    		break;
    		default:
    			this.disableFilters();
    		break;
    	}

        if (this.activeItem.xtype == "hateMap") {
        	//This is the only thing that is not DRY.
        	this.getHateList().deselectAll();
            this.showHateButton();
             this.getMapButton().disable();
        } else {
            this.hideHateButton();
            this.getMapButton().enable();
        }

    },
>>>>>>> sencha
	showHates: function() {
		console.log('SHOW FUCKING CONTACTS')
		//this.app.vp.setActiveItem(contacts);
	},
	
<<<<<<< HEAD
	showHateDetail: function(rec){
		var details = Ext.create('app.view.HateDetail', {data: rec.data});
		this.app.vp.add(details);
		this.app.vp.setActiveItem(details);
		console.log(rec);
	},
	onHateAction:function(){
		
	}
=======
	showHateDetail: function(list, index, node, record) {
        
        if (!this.showHate) {
            //this.showHate = Ext.create('app.view.HateDetails');
            this.showHate = Ext.create('app.view.carousel.CarouselSlide');
        }

        // Bind the record onto the show contact view
        //this.showHate.setRecord(record);

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
    },
    //Filter state handling
    disableFilters:function(){
    	this.getPrivateButton().disable();
    	this.getGlobalButton().disable();
    },
    enableFilters:function(){
    	this.getPrivateButton().enable();
    	this.getGlobalButton().enable();
    }
>>>>>>> sencha
});
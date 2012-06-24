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
            navigationToolbar:'#navigationToolbar',

            formLat:'#formLat',
            formLong:'#formLong',
            formImagePreview:'#formImage',
            formImgUrl:'#formImgUrl'
        },
        xtype: 'hateMaster'
    },
    stores:['Hates'],
    init: function() {
        
        var me = this;
        this.app = this.getApplication();   //  short ref to our app
        this.app.vp = Ext.Viewport;         //  set app level ref to our viewport
        
        //  event listener to show view
        this.app.on('showHates', function(){
            me.showHates();
        });

        this.control({
            main: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            hateForm:{
                change:'onHateFormChange',
                onsubmitresult:'onHateFormResult'
            },
            hateList: {
                itemtap:'showHateDetail'
            },
            hateButton:{
                tap:'onHateAction'
            },          
            saveButton: {
                tap: 'onCreateHate'
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
        var me = this;
        Hate.devicePhotoFail = this.onDevicePhotoFailure;
        Hate.devicePhotoSuccess = this.onDevicePhotoSuccess;
        //REMOVE


        //me.getHatesStore().load();

        $.get("http://10.0.2.51:8008/api/" + Hate.device_uid +"/hate/limit/25/0", function(result){
            console.log(result.data);
            me.getHatesStore().setData(result.data);
       });
    },
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
        //var hateButton = this.getHateButton();

        this.activeItem = this.getMain().getActiveItem();

       var type = this.activeItem.xtype;
       switch(type){
            case 'hateMap':
            case 'hateList':
                this.enableFilters();
                this.getNavigationToolbar().show();
            break;
            case 'hateCarousel':
                this.getNavigationToolbar().hide();
            break;
            default:
                this.disableFilters();
                this.getNavigationToolbar().show();
            break
        }

        if (this.activeItem.xtype == "hateMap") {
           //this.showHateButton();
           this.getMapButton().disable();
        } else {
            //this.hideHateButton();
            //this.getMapButton().enable();
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
                this.getNavigationToolbar().show();
            break;
            case 'hateCarousel':
                this.getNavigationToolbar().hide();
            break;
            default:
                this.disableFilters();
                this.getNavigationToolbar().show();
            break;
        }

        if (this.activeItem.xtype == "hateMap") {
            //This is the only thing that is not DRY.
            this.getHateList().deselectAll();
            //this.showHateButton();
            // this.getMapButton().disable();
        } else {
           // this.hideHateButton();
           // this.getMapButton().enable();
        }

    },
    showHates: function() {
        console.log('SHOW FUCKING CONTACTS')
        
        //this.app.vp.setActiveItem(contacts);
    },
    
    showHateDetail: function(list, index, node, record) {
        
        if (!this.showHate) {
            //this.showHate = Ext.create('app.view.HateDetails');
            this.showHate = Ext.create('app.view.carousel.Carousel');
        }

        // Bind the record onto the show contact view
        var records = this.getHatesStore().getSlides();

        this.showHate.setItems(records);

        // Push the show contact view into the navigation view
        this.getMain().push(this.showHate);
    },

    onHateAction:function(){
        var me = this;
        //create modal.
        var isPhone = Ext.os.deviceType == 'Phone',
            overlay;

        overlay = Ext.Viewport.add({
            xtype: 'panel',

            // We give it a left and top property to make it floating by default
            left: 0,
            top: 0,

            // Make it modal so you can click the mask to hide the overlay
            modal: true,
            hideOnMaskTap: true,

            // Make it hidden by default
            hidden: true,

            // Set the width and height of the panel
            width: isPhone ? 260 : 400,
            height: isPhone ? '70%' : 400,

            // Here we specify the #id of the element we created in `index.html`
            contentEl: 'content',

            // Style the content and make it scrollable
            styleHtmlContent: true,
            scrollable: true,

            // Insert a title docked at the top with a title
            items: [
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    title: 'What do you hate?'
                },
                {
                    xtype:'container',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'button',
                            text:'Camera',
                            handler:function(){
                                if(typeof Hate.capturePhoto == 'function')
                                    Hate.capturePhoto();
                                
                            }
                            
                        },
                        {
                            xtype:'button',
                            text:'Photo Gallery',
                            handler:function(){
                                if(typeof Hate.getPhoto == 'function')
                                    Hate.getPhoto();
                                else {
                                    me.onShowHateForm('kkk')
                                }
                                overlay.hide();
                            }
                        }
                    ]
                }
               
            ]
        });

        var button = this.getHateButton();
        overlay.showBy(button);
    },

    
    onDevicePhotoFailure:function(){
        overlay.hide();
    },
    onDevicePhotoSuccess:function(url){
        this.onShowHateForm(url);
        overlay.hide();
    },
    onShowHateForm:function(url){

        if (!this.hateForm) {
            this.hateForm = Ext.create('app.view.form.HateSubmit');
        }

        // Bind the record onto the edit contact view
        //this.hateForm.setRecord(this.getShowContact().getRecord());
        //this.hateForm.setImageUrl('url');
        this.getFormLat().setValue(Hate.current_lat);
        this.getFormLong().setValue(Hate.current_long);
        this.getFormImgUrl().setValue(url);
        this.getFormImagePreview().setSrc(url);

        $("#image-url").val(url);
        this.getMain().push(this.hateForm);
    },
    /**
     * Fired when form changes.
     */
    onHateFormChange: function() {
        this.showSaveButton();
    },
    onHateFormResult:function(success, result){
    	//alert(2323);
    	var record = result.data;
    	//var hate = Ext.create
        this.getMain().pop();
        
    },
    onCreateHate:function(){
        this.hateForm.doSubmit();
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
});
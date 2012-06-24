Ext.define('app.view.form.HateSubmit', {
    extend: 'Ext.Container',
    xtype: 'hateSubmit',
    require:[
        'Ext.Ajax'
    ],
    config: {
        title: 'Create',
        layout: 'fit',

        items: [
            {
                xtype: 'formpanel',
                id:'new_hate_form',
                url:'http://10.0.2.51:8008/api/'+Hate.device_uid+'/hate',
                method:'POST',
                items: [
                    {
                        xtype: 'image',
                        itemId:'formImage',
                        src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
                        height:70,
                        width:120
                    },
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '35%'
                        },
                        title: 'Information',
                        items: [
                            {
                                xtype: 'textareafield',
                                maxRows: 6,
                                label: 'Description',
                                name: 'desc'
                            },
                            {
                                xtype: 'spinnerfield',
                                name: 'weight',
                                minValue: 0,
                                maxValue: 10,
                                increment: 1,
                                label: 'Hate Value'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '35%'
                        },
                        title: 'Geolocalization',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Current Lat',
                                 itemId:'formLong',
                                name: 'lat'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Current Long',
                                itemId:'formLat',
                                name: 'long'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Address',
                                name: 'address'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Image',                        
                        defaults: {
                            labelWidth: '35%'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Url',
                                id:'image-url',
                                itemId:'formImgUrl',
                                name: 'url'
                            }
                        ]
                    }
                ]
            }
        ],

        listeners: {
            delegate: 'textfield',
            keyup: 'onKeyUp'
        },

        record: null
    },
    doSubmit:function(){
        var me = this;
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Saving'
        });
        $.ajax({
            type: 'POST',
            url: "http://10.0.2.51:8008/api/"+Hate.device_uid+"/hate",
            data: $("#new_hate_form").serialize(),
            success: function(data){
                Ext.Viewport.setMasked(false);
                me.fireEvent('onsubmitresult',true,data);
            },
            error: function(error){
                Ext.Viewport.setMasked(false);
            },
            dataType: "json"
        });
    },
    
    setImageUrl:function(url){
        this.down('form').down('#imageUrl').setValue(url);
    },

    onKeyUp: function() {
        console.log('On fucking key up!')
        this.fireEvent('change', this);
    }
});
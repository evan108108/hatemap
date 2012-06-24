Ext.define('app.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',
    itemId:'main',
    requires: [
        'app.view.HateMap'
        //'AddressBook.view.contact.Show',
        //'AddressBook.view.contact.Edit'
    ],

    config: {
        autoDestroy: false,

        navigationBar: {
            //ui: 'sencha',
            cls: 'toolbars',
            items: [
               /* {
                    xtype: 'button',
                    id: 'hateButton',
                    text: 'Hate',
                    align: 'right',
                    hidden: false,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },*/
                {
                    xtype: 'button',
                    id: 'saveButton',
                    text: 'Save',
                    ui: 'confirm',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },

        items: [
            { xtype: 'hateMap' },
            {
                xtype: 'toolbar',
                id:'navigationToolbar',
                docked: 'bottom',
                centered:true,
                cls: 'toolbars',
                // Make the toolbar scrollable
                /*scrollable: {
                    direction: 'horizontal',
                    indicators: false
                },*/

                // Add several items into the toolbar
                items: [
                    { xtype: 'spacer' },
                    { xtype: 'segmentedbutton', items: [
                        { iconMask: true, id:'mapButton',ui: 'plain', iconCls: 'maps', data:'hateMap'/*, disabled:true*/ },
                        { iconMask: true, id:'listButton', ui: 'plain',iconCls:'list',data:'hateList' }
                    ]},
                    { iconMask: true, id:'hateButton', text:'BLOWS!', ui: 'plain',/*,iconCls: 'icon-haters',*/ data:'hateMap',  },
                    { xtype: 'segmentedbutton', items: [
                        { iconMask: true, id:'privateButton',ui: 'plain', iconCls: 'user',  data:'private' },
                        { iconMask: true, id:'globalButton',  ui: 'plain',iconCls: 'team', data:'global' }
                    ]},
                    { xtype: 'spacer' },
                   /*{ iconMask: true, text: 'Test', iconCls: 'action' },
                    { iconMask: true, text: 'Test', ui: 'plain', iconCls: 'bookmarks' },
                    { iconMask: true, ui: 'round', iconCls: 'download' },
                    { iconMask: true, ui: 'action', iconCls: 'settings', badgeText: '2' },
                    { iconMask: true, ui: 'confirm-round', iconCls: 'compose' },
                    { iconMask: true, ui: 'decline', iconCls: 'delete' },
                    { iconMask: true, iconAlign: 'right', ui: 'round', text: 'Home', iconCls: 'home' },
                    { iconMask: true, ui: 'action-round', iconCls: 'locate' },
                    { xtype: 'segmentedbutton', items: [
                    	{ iconMask: true, iconCls: 'maps' },
                    	{ iconMask: true, iconCls: 'organize', text: 'Sort' },
                    	{ iconMask: true, iconCls: 'refresh' }
                    ]},*/
                    
                ]
            }
        ]
    }
});

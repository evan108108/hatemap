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
            items: [
                {
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
                },
                {
                    xtype: 'button',
                    id: 'saveButton',
                    text: 'Save',
                    ui: 'sencha',
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

                // Make the toolbar scrollable
                scrollable: {
                    direction: 'horizontal',
                    indicators: false
                },

                // Add several items into the toolbar
                items: [
                    { iconMask: true, id:'mapButton', iconCls: 'action', data:'hateMap', disabled:true },
                    { iconMask: true, id:'listButton', /*ui: 'plain',*/ iconCls: 'add',data:'hateList' },
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
                    { iconMask: true, id:'privateButton', ui: 'back', iconCls: 'reply', data:'private' },
                    { iconMask: true, id:'globalButton', iconCls: 'x-icon-mask trash', data:'global' }
                ]
            }
        ]
    }
});

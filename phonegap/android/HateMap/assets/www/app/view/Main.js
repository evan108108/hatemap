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
                /*{
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
                // Make the toolbar scrollable
                /*scrollable: {
                    direction: 'horizontal',
                    indicators: false
                },*/

                // Add several items into the toolbar
                items: [
                    { xtype: 'spacer' },
                    { xtype: 'segmentedbutton', items: [
                        { iconMask: true, id:'mapButton', iconCls: 'icon-map', data:'hateMap', disabled:true },
                        { iconMask: true, id:'listButton', iconCls:'icon-list',data:'hateList' }
                    ]},
                    { iconMask: true, id:'hateButton', iconCls: 'icon-map', data:'hateMap' },
                    { xtype: 'segmentedbutton', items: [
                        { iconMask: true, id:'privateButton', iconCls: 'icon-user',  data:'private' },
                        { iconMask: true, id:'globalButton',  iconCls: 'icon-users', data:'global' }
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

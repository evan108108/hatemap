Ext.define('app.view.window.HateSubmit', {
    extend: 'Ext.Container',
    xtype: 'hateSubmit',

    config: {
        title: 'Create',
        layout: 'fit',

        items: [
            {
                xtype: 'formpanel',
                items: [
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '35%'
                        },
                        title: 'Information',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'First Name',
                                name: 'firstName'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Last Name',
                                name: 'lastName'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Title',
                                name: 'title'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '35%'
                        },
                        title: 'Contact Information',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Telephone',
                                name: 'telephone'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Address',
                        defaults: {
                            labelWidth: '35%'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'City',
                                name: 'city'
                            },
                            {
                                xtype: 'textfield',
                                label: 'State',
                                name: 'state'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Country',
                                name: 'country'
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

    updateRecord: function(newRecord) {
        this.down('formpanel').setRecord(newRecord);
    },

    saveRecord: function() {
        var formPanel = this.down('formpanel'),
            record = formPanel.getRecord();

        formPanel.updateRecord(record);

        return record;
    },

    onKeyUp: function() {
    	console.log('On fucking key up!')
        this.fireEvent('change', this);
    }
});
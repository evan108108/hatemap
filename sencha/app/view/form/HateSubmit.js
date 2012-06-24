Ext.define('app.view.form.HateSubmit', {
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
                                xtype: 'textareafield',
                                maxRows: 6,
                                label: 'Description',
                                name: 'description'
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
                                name: 'lat'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Current Long',
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
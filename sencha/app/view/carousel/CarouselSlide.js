Ext.define('app.view.carousel.CarouselSlide', {
	extend: 'Ext.Container',
	xtype: 'carouselSlide',

	config: {
        baseCls: 'x-show-carousel-slide',
        layout: 'vbox',
		items:[
			{
                id: 'content',
                tpl: [
                    '<div class="top">',
                        '<div class="headshot" style="background-image:url({url});"></div>',
                        '<div class="name">{description}</div>',
                    '</div>'
                ].join('')
            },
            {
                xtype: 'map',
                flex: 1,
                mapOptions: {
                    zoomControl: false,
                    panControl: false,
                    rotateControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoom: 13
                }
            }
		],

        record: null
	},

    updateRecord: function(newRecord) {
        if (newRecord) {
            this.down('#content').setData(newRecord.data);

            this.down('map').setMapCenter({
                latitude: newRecord.data.lat,
                longitude: newRecord.data.long
            });
        }
    }
});
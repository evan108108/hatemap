Ext.define('app.view.carousel.CarouselSlide', {
	extend: 'Ext.carousel.Carousel',
	xtype: 'carouselSlide',

	config: {

		direction: 'vertical',
		items:[
			{
                xtype: 'image',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/1.jpg'
            },
            {
                xtype: 'image',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/2.jpg'
            },
            {
                xtype: 'image',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/3.jpg'
            },
            {
                xtype: 'image',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/4.jpg'
            },
            {
                xtype: 'image',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/5.jpg'
            }
		]
	}
});
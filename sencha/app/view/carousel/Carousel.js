Ext.define('app.view.carousel.Carousel', {
	extend: 'Ext.carousel.Carousel',
	xtype: 'hateCarousel',

	config: {

		direction: 'vertical',
		items:[
			{
                xtype: 'carouselSlide',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/1.jpg'
            },
            {
                xtype: 'carouselSlide',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/2.jpg'
            },
            {
                xtype: 'carouselSlide',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/3.jpg'
            },
            {
                xtype: 'carouselSlide',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/4.jpg'
            },
            {
                xtype: 'carouselSlide',
                cls: 'my-carousel-item-img',
                src: 'assets/photos/5.jpg'
            }
		]
	}
});
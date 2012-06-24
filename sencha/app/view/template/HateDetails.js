Ext.define('app.view.template.HateDetails', {
    extend: 'Ext.XTemplate',
	config: {
		compiled: true
	},
	constructor: function (config) {
		var html = [
			'<tpl for=".">',
				'<div class="hate-detail-holder">',
					'<div class="hate-list-preivew"><img src="{url}"/></div>',
					'<p>{desc}</p>',
				'</div>',
			'</tpl>'];

		this.callParent(html);
	}
});
Ext.define('app.view.template.Hate', {
    extend: 'Ext.XTemplate',
	config: {
		compiled: true
	},
	constructor: function (config) {
		var html = [
			'<tpl for=".">',
				'<div class="hate-detail-holder">',
					'<div class="hate-list-preview"><img src="{url}" width="100" height="75"/></div>',
					'<div class="hate-list-desc"><p>{desc}</p></div>',
				'</div>',
			'</tpl>'];

		this.callParent(html);
	}
});
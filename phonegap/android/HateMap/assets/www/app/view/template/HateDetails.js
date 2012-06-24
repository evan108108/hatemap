Ext.define('app.view.template.HateDetails', {
    extend: 'Ext.XTemplate',
	config: {
		compiled: true
	},
	constructor: function (config) {
		var html = [
			'<tpl for=".">',
				'<div class="convo them">',
					'<p>{desc} {url}</p>',
				'</div>',
			'</tpl>'];

		this.callParent(html);
	}
});
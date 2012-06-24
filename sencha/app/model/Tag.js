Ext.define('app.model.Tag', {
    extend: 'Ext.data.Model',
	config: {
	    fields: [
	    	{ name:'id', type:'int' },
			{ name: 'name', type: 'string' },
			{ name: 'lud_dtm', type: 'date' },
            { name: 'crt_dtm', type: 'date' }
		]//,

		/*validations: [ 
            { type: 'format', field: 'active', matcher:/^\s*\d+\s*$/ },
         	{ type: 'format', field: 'id', matcher:/^\s*\d+\s*$/ },
         	{ type: 'length', field: 'author_first_name', max: 64 },
         	{ type: 'length', field: 'author_last_name', max: 64 },
         	{ type: 'length', field: 'isbn', max: 20 },
         	{ type: 'length', field: 'size', max: 20 },
         	{ type: 'length', field: 'price', max: 64 } 
        ],*/

        /*proxy: {
            type: 'rest',
            noCache:false,
            url: CONFIG.basePath + '/api/' + CONFIG.bizUnit + '/hate',
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success',
                totalProperty  : 'totalCount'
            }
        }*/	
	}
});

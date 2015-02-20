/* 
	author: @Manuel Birba
	last date modified : 
*/

Ext.define('MyApp.store.FbFriendsStore', {
    extend: 'Ext.data.Store',

    requires: ['MyApp.model.Test','Ext.data.proxy.JsonP','Ext.data.reader.Json'],
        

    config: {
        //model: 'MyApp.model.Test',
        storeId: 'FbFriendsStore',
        sorters: 'friendname',
        fields: [
					'friendid',
					'friendname'
         ],
        
		proxy: {
				type: 'jsonp',
				reader: {
					type: 'json',
					//rootProperty: 'friends'
			   }
		}
	}
        /*
Ext.define('Test', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'firstName', type: 'string'},
            {name: 'lastName',  type: 'string'},
            {name: 'age',       type: 'int'},
            {name: 'eyeColor',  type: 'string'}
        ]
    }
});
*/
});
/* 
	author: @Manuel Birba
	last date modified : 
*/

Ext.define('MyApp.store.MessagesStore', {
    extend: 'Ext.data.Store',

    //requires: ['MyApp.model.Test','Ext.data.proxy.JsonP','Ext.data.reader.Json'],
        

    config: {
        storeId: 'MessagesStore',
        //sorters: 'id',
        // fields: [
// 					'id',
// 					'message'
//          ],
        
		data: [
			{id: '1', messages: 'Salut' },
			{id: '2', messages: 'à' },
			{id: '3', messages: 'tous' },
		],
		
		proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                //rootProperty: 'messages'
            }
        }
	}
});
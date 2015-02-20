/* 
	author: @Manuel Birba
	last date modified : 
*/

Ext.define('MyApp.store.FbLikeStore', {
    extend: 'Ext.data.Store',

    requires: ['MyApp.model.Test','Ext.data.proxy.JsonP','Ext.data.reader.Json'],
        

    config: {
        storeId: 'FbLikeStore',
        sorters: 'likename', // sort like by likename
        fields: [
				   'likeid',
				   'likename',
				   'likecategory',
				   'likedate', 
				   'likedescription', 
				   'name',
				   'age', 
				   'storeid',
				   'id', // it's a property of a store, it will give you the record's index of the store
				   'likelink', 
				   'likewebsite', 
				   'liketalking_about_count'
				 ],
		listeners: {
			select: function(view, record) {
					Ext.Msg.alert('Selected!', 'You selected ' + record.get('likename'));
			}
		},
		proxy: {
				type: 'jsonp',
				reader: {
					type: 'json'
				}
		}
	}
});
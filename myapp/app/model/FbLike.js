/* 
	author: @Manuel Birba
	last date modified : 
*/

Ext.define('MyApp.model.FbLikes', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                name: 'id'
            },
            {
                name: 'name'
            },
            {
                name: 'category'
            },
            {
                name: 'created_time'
            },
            {
                name: 'description'
            }
        ]
    }
});
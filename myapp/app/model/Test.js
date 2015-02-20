/* 
	author: @Manuel Birba
	last date modified : 
*/

Ext.define('MyApp.model.Test', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: ['pseudo', 'messages'],
    }
});


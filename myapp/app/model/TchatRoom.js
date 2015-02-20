/* 
	author: @Manuel Birba
	last date modified : 
*/

Ext.define('MyApp.model.TchatRoom', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'address', type: 'string' },
            { name: 'status', type: 'int' }
        ]
    }
});

/*test to check if model is well created */
var myTchatRoom = Ext.create('MyApp.model.TchatRoom', {
            id: 1,
            name: 'Aubay Baby foot',
            address: '13 rue Louis Pasteur Boulogne Billancourt',
            status: 1
        });

        // Getting a field's value.
        console.log('On est dans le \'TchatRoom.js\' TchatRoom name is ' + myTchatRoom.get('name'));

        // Setting a field's value.
        myTchatRoom.set('status', 0);

        var statusMsg = 'Active';

        if (myTchatRoom.get('status') === 0) {
            statusMsg = 'Inactive';
        }

        console.log('TchatRoom : '+myTchatRoom.get('name')+ ' is ' + statusMsg);
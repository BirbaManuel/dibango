/* 
	author: @Manuel Birba
	last date modified : 
*/

Ext.define('MyApp.store.TchatRoomStore', {
    extend: 'Ext.data.Store',
    config: {
        //model: 'MyApp.model.TchatRoom',
        data: [
            { id: 1, name: 'Aubay accueil', address: '13 rue Louis Pasteur Boulogne Billancourt', status: 1 },
            { id: 2, name: 'Aubay DG', address: '13 rue Louis Pasteur Boulogne Billancourt', status: 0 },
            { id: 3, name: 'Aubay cafèt', address: '13 rue Louis Pasteur Boulogne Billancourt', status: 1 },
            { id: 4, name: 'Aubay CE', address: '13 rue Louis Pasteur Boulogne Billancourt', status: 0 }
        ],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                //rootProperty: 'rooms'
            }
        }
     }
});
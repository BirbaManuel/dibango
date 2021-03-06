/* 
	author: @Manuel Birba
	last date modified : 
*/
/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.Loader.setConfig({

});

Ext.application({
    name: 'MyApp',

    requires: [
        'Ext.MessageBox', //'sencha-touch-grid'
    ],
    //models: ['TchatRoom','FbLike','Test'],
   
	stores: ['TchatRoomStore','FbLikeStore', 'FbFriendsStore', 'MessagesStore'],
	
	views: ['Main'],
  
    controllers: ['GetFriends','GetLikes', 'Chat'/*,'LoginFacebook', 'Map'*/],
	
	/* This is the place for the home screen icon on IOS device
	    but I don't use this Icon for Mikutano rightnow
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
	*/ 
	
	/*isIconPrecomposed is the configuration to turn off the gloss effect that is automatically added to icons in iOS.*/
	
    isIconPrecomposed: true,
	
	/* startupImage is the configuration to provide the images that will be displayed while your application is starting upI 
	but I don't use this Image for Mikutano	
    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
	*/	
    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('MyApp.view.Main'));
        
        
        
        // Define 'roomsStore' a variable to contain the store'TchatRoomStore'
        var roomsStore = Ext.getStore('TchatRoomStore');
        console.log('\'fichier app.js \' These are the room saved:');
			roomsStore.each(function (record) {
				//Display all of the record in the roomsStore
				console.log('- ' + record.get('name'));
		});
		
		// Create room a variable to contain an instance (instance number 2) of roomStore
		var room = roomsStore.getAt(1);
		console.log("\nBEFORE UPDATE")
		// Use a model's get method to get the value of a property.
		console.log('The name of the second room is ' + room.get('name'));
		
		// set a room (instance of roomStore)
		room.set('name', 'Aubay OpenSpace');

		console.log("\nAFTER UPDATE")
		console.log('The updated name is ' + room.get('name'));

		// Confirm that the store has the correct copy of the model instance.
		console.log('These are the rooms after making changes:');
		roomsStore.each(function (record) {
			console.log('- ' + record.get('name'));
		});
		
		// A store's getUpdatedRecords method gives you an array with the updated records.
		//	The call to getUpdatedRecords will return an array containing the model instances
		//	that have been updated since the last call to the store’s sync method.
		//
		var updatedRecords = roomsStore.getUpdatedRecords();
		console.log('These are the updated records:');
		Ext.each(updatedRecords, function (record, index, length) {
			console.log('- ' + record.get('name'));
		});
		
		
		//	 Revert (recover)records to previous values.
		
		
		room.reject();
		console.log("\nAFTER REJECT")
		console.log('Name of the room after rejecting changes: ' + room.get('name'));

		// Confirm that the store has the correct copy of the model instance.
		console.log('These are the rooms after rejecting changes:');
		roomsStore.each(function (record) {
			console.log('- ' + record.get('name'));
		});
		
		room.set('name', ' \"modify app.js file line 117\" '); // name of second room to set after a log
		roomsStore.sync();
		//hotel.save();       // You can call the store's sync method or the model's save method if the model has a proxy.
		console.log("\nCHANGES COMMITTED");
		room.reject();  // Will not revert the name back because you already called sync.
		console.log("\nAFTER SAVE");
		// Confirm that the store has the correct copy of the model instance.
		console.log('These are the hotels after saving changes:');
		roomsStore.each(function (record) {
			console.log('- ' + record.get('name'));
		});
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});

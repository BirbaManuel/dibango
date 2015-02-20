/* 
	author: @Manuel Birba
	last date modified : 
*/

Ext.define('MyApp.controller.GetFriends', {
    extend: 'Ext.app.Controller',
    
    config:{
			refs: {
				mainView: 'mainview',
				FacebookFriends: 'mainview #FacebookFriendsButton'
			},
			control: {
				"mainview #FacebookFriendsButton": {
					tap: 'getFriends'
				}
			}
	},


getFriends:function () {
	var fbFriends = Ext.getCmp('dataFriendsList');
	fbFriends.getStore().add({ // this is a test to populate the database/store ''
								name: 'Elias',
								age: 20
	});
  	var nbFriends = 0; // create a counter to calculate the number of users's friends
  	var fbFriendsbadge = Ext.getCmp('FacebookFriendsButton');
  	fbFriendsbadge.getBadgeText();
  	//txt = null;
    FB.api('/me/friends', function(response) {
        if(response.data) {
        	$.each(response.data,function(index,friend) {
                //console.log(friend.name + ' has id:' + friend.id);
                //txt = txt + friend.name +' '+ friend.id;
                nbFriends = nbFriends + 1;
                console.log(nbFriends +' amis');
                fbFriendsbadge.setBadgeText(nbFriends);// add a notification to the "Friends button" to show the number of friends
        		console.log(fbFriendsbadge.getBadgeText());// display the number of the users'slike in the console
                fbFriends.getStore().add({
								friendid: friend.id,
								friendname: friend.name,
	});	
            });
        } else {
            Ext.Msg.alert('Error!', 'You aren\'t connected! to see youre Friends');
            
        }
    });
}

});
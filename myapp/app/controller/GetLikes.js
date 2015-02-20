/* 
	author: @Manuel Birba
	last date modified : 
*/

Ext.define('MyApp.controller.GetLikes', {
    extend: 'Ext.app.Controller',

	config:{
			refs: {
				mainView: 'mainview',
				likeButton: 'mainview #likeButton'
			},
			control: {
				"mainview #likeButton": {
					tap: 'getLikes'
				}
			}
	},	

getLikes:function () {
	var fbLikes = Ext.getCmp('dataLikesList');
	var NL = '\n';
	fbLikes.getStore().removeAll();
	fbLikes.getStore().add({
								name: 'first entry to test the store : FbLikeStore',
								storeid: 1,
								//id: 12,
	});
	var nbLikes = 0;
  	var fbLikesbadge = Ext.getCmp('likeButton');
  	fbLikesbadge.getBadgeText();
	
    FB.api('/me/likes?fields=id,name,'+'description'+',category,created_time,link,website,talking_about_count', function(response) {
        if(response.data) {
           $.each(response.data,function(index,like) {
				console.log( ' like name : ' + like.name + NL +
							 ' has id : ' + like.id + NL +
							 ' his category : ' + like.category + NL +
							 ' has been created on : ' + like.created_time + NL +
							 ' his description : ' + like.description + NL +
							 ' like link : ' + like.link + NL +
							 ' website : ' + like.website + NL + 
							 ' talking_about_count : ' + like.talking_about_count + NL 
				);
				nbLikes = nbLikes + 1;
                console.log(nbLikes +' likes');
                fbLikesbadge.setBadgeText(nbLikes);
        		console.log(fbLikesbadge.getBadgeText());
		
				fbLikes.getStore().add({
									likename: like.name,
									likeid: like.id,
									likecategory: like.category,
									likedate: like.created_time,
									likedescription: like.description,
									likelink: like.link,
									likewebsite: like.website,					
									liketalking_about_count: like.talking_about_count
				});	
            });
        } else {
         Ext.Msg.alert('Error!', 'You aren\'t connected! to see youre Likes');
        }
    });
}

});
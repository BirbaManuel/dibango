/* 
	author: @Manuel Birba
	last date modified : 14/09/14
*/
/* var socket = io.connect('http://dibango.fr:9000'); */
var socket = io.connect('http://127.0.0.1:9000');
var mikutaner_name = null;

Ext.define('MyApp.view.Main', { /* "MyApp" == APP's name ; "view" == subfolder of "app"; "Main" == file's name ".js" */
    extend: 'Ext.tab.Panel', /* MyApp.view.Main inherits of tab.Panel's class */
    alias: 'widget.mainview',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Map',
        'Ext.Img',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.Anim'
    ],
    initialize: function(){
						//alert("initialize");
						Ext.Msg.prompt(
							'Welcome on Mikutano!', // title
							'Please choose a pseudo to join a Room and log with Facebook if you have an account', // message
							function (buttonId, value) { // function to fire after the prompt
								//if(value.trim() == ''){// if the user send 
								//alert('value found :' + value);
								//}
								//console.log(value);
								mikutaner_name = value;
								Ext.Msg.alert('Your pseudo', value);
								//socket.emit('username', messagesToSend.getValue());
								socket.emit('username', messagesToSend.getValue());
							},
							null, // scope
							false, // multiLine
							null,
							//'anonyme', // the défault value of the prompt
							{
								autoCapitalize: true, // casse sensitive
								placeHolder: 'pseudo please...' // message 
							}
						);
							
    	this.callParent(arguments);
    },
    config: {
        tabBarPosition: 'bottom', /* this component will contain these following buttons : "Welcome", "Geolocation", "COI", "Room"*/

        items: [ 
					{ /* first item : Welcome screen */
		
					title: 'Welcome',
					iconCls: 'home',
					

					styleHtmlContent: true,
					scrollable: true,
					
					style: 'background:#C0DCF2', // bleu 

					items: [{
						docked: 'top',
						xtype: 'titlebar',
						title: 'Date your Neighbor',
						
					},
					{
						docked: 'top',
						xtype: 'image',
						src: 'resources/icons/aubaypng.png',
						height: 24,
						width: 24,
						flex: 2,
						listeners: {
									tap: function() {
										Ext.Msg.alert('Mikutano', 'sponsored by Aubay');
									}
						}
					},
				],

				html: [
					'<h3>Welcome to Mikutano </h3>',
					"It's a Dating mobile application Based on Geolocation & Center Of Interest (C.O.I) ",
					" Log with Facebook account",
					'<div id="fb-root"></div>',
					'<fb:login-button show-faces="true" width="300" max-rows="1" scope="user_likes" auto_logout_link="true" ></fb:login-button>',
				].join("")
				}, // end of first item
				{ /* seconde item : C.O.I screen */
			
					title: 'COI',
					iconCls: 'info',
					items: [{
								docked: 'top',
								xtype: 'titlebar',
								title: 'Your interests',
							},
							{
								xtype: 'container',
								height: '100%',
								style: 'background:#C0DCF2', //bleu
								layout: {
											type: 'hbox', // with 'hbox' each item are in the same line
											pack: 'center'
										},
								items: [
										{
											xtype: 'button', //please see getFriends.js file to improve the feature of this button
											text: 'Likes',
											margin: '20 0 20 0',
											width: '32%',
											maxWidth: 100,
											height: '5%',
											id: 'likeButton',
											style: 'background:#1985D0', //bleu sencha touch color
										},
										{
											xtype: 'spacer',
											width: 10
										},
										{
											xtype: 'button', //please see getTweets.js file to improve the feature of this button
											text: 'tweets',
											margin: '20 0 20 0',
											width: '32%',
											maxWidth: 100,
											height: '5%',
// 											id: 'tweetButton', 
											style: 'background:#1985D0', //bleu sencha touch color
											listeners: {
												tap: function() {
													Ext.Msg.alert('Tweets', 'function coming soon');
												}
											}
										},
										// {
// 											xtype: 'dataview',
// 													docked: 'bottom',
// 													style: 'background:yellow',
// 													margin: '0 5 5 5',
// 													height: '80%',
// 													store: 'TchatRoomStore',
// 													itemTpl: '{id}{name}{adress}{status}',
// 													listeners: {
// 														select: function(view, record) {
// 															Ext.Msg.alert('Selected!', 'You selected ' + record.get('name') + record.get('status'));
// 														}
// 													}
// 										 }
										{
											xtype: 'dataview',
											margin: '20 0 0 0',
											style: 'background:red',
											centered: true, // centered the mapItem inside the " xtype: 'container' "
											height: 300,
											width: '95%',
											id: 'dataLikesList',
											store: "FbLikeStore",
											itemTpl: [
												' <div>'+
												'storeid : {storeid}<br>'+
												'id : {id}<br>'+
												'<INPUT type="checkbox" id="checkbox-{likeid}" name="like" value="1">'+
												'likename : {likename}<br>'+
												'likeid : {likeid}<br>'+
												' category : {likecategory}<br>'+
												' date : {likedate}<br>'+
												' description : {likedescription}<br>'+
												' username : {name}<br>'+
												' age : {age}<br>'+
												' link of : <a href="{likelink}">{likename}</a><br>'+
												' website : {likewebsite}<br>'+
												' Mikutaners talking about this : {liketalking_about_count}<br>'+
												'<br> ***** ***** ***** *****  *****  *****  *****  *****  *****  ***** '+
												'<br> ***** ***** ***** *****  *****  *****  *****  *****  *****  *****<br> '+
												'</div>',
												'<!-- <div><INPUT type="checkbox" id="checkbox-{likeid}" name="like" value="1">'+
												'{likename}<br></div> -->',
											
											]
										}
									]
							},
						   ],
				},
				{ /* third item : Geolocation screen */
			
					title: 'Geolocation',
					iconCls: 'maps',
					style: 'background:#C0DCF2',
					
					items: [
								{
									docked: 'top',
									xtype: 'titlebar',
									title: 'Mikutano World',
								},
								{
									xtype: 'container',
									layout: {
												type: 'hbox',
												pack: 'center',
											},
									items: [
												{
													xtype: 'button',
													margin: '20 0 0 0',
													id: 'mylocation',
													width: 100,
													height: 20,
													style: 'background:#1985D0',
													text: 'Me',
													listeners: {
														tap: function() {
// 														var socket = io.connect('http://dibango.fr:9000'); // connect Mikutano mobile app on serveur chat listening on port 9000
														var message = " please check out the map ";
// 														socket.on('news', function (data) {
// // 															Ext.Msg.alert('Message serveur', + data);
// 															socket.emit('my other event', 'the user receive the news event from serveur chat');
// 														  });
// 														socket.emit('action button', 'user click on <Me>');
														Ext.Msg.alert('fetching position!', message); // dont put an " ' " before the object
														// var me = null;
// 																console.log('Your current position is : ');
// 																Ext.Msg.alert('Your current position is : ');
// 																setInterval(function(){alert("Me")},3000);
// 																 var socket = io.connect('http://dibango.fr:1988');
//   																console.log("user connected on server http://dibango.fr:1988 \'Mikutano Sencha App\'");
//   																console.log("user connected on server http://dibango.fr:1988 \'Mikutano Sencha App\'");
//   																console.log(socket);
														}
													}
												},
												{
													xtype: 'spacer',
													margin: '20 0 0 0',
													width: 10
												},
												{
													xtype: 'button',
													margin: '20 0 0 0',
													width: 100,
													height: 20,
													style: 'background:#1985D0',
													text: 'Users',
													listeners: {
														tap: function() {
															Ext.Msg.alert('Find users','Find Users underconstruction');
														}
													}
												},
												{// beginning of the Map component
													xtype: 'map',
													margin: '20 20 0 20', //'Up Right Down Left'
													title: 'Map',
													id: 'MikutanoMap',
													docked: 'bottom',
													centered: true, // centered the mapItem inside the " xtype: 'container' "
													height: 280,
													useCurrentLocation: true, // center the map on the user location every 10 secondes
													flex: 3,
													mapOptions: {
														zoom: 15,
														mapTypeId: google.maps.MapTypeId.ROADMAP,
														mapTypeControl : true,
														navigationControl : false,
														streetViewControl : false,
														backgroundColor: 'transparent',
														disableDoubleClickZoom: true,
														draggable: true,
														keyboardShortcuts: false,
														scrollwheel: true,
														// Center your map to see your first marker...
														center: new google.maps.LatLng (48.814801,2.378355) // center on Chatelet France 75001
													}
													,listeners: {
														// tap: function() {
// 															Ext.Msg.alert('I\'m here');
// 														}
														
														maprender: function() { // as soon as you display the map of user location, you display Markers and position user
															console.log("maprender " + this.userid, this.url);
																
															// Get a ref to the google map object (should be provided
															// as an argument to the listener but apparently there is
															// a bug...)
															var gMap = this.getMap();
															
															// Debut code Marker : We set some markers in some famous area ***************************************** 
															new google.maps.Marker({
																map: gMap,
																animation: google.maps.Animation.DROP,
																position: new google.maps.LatLng (48.814801,2.378355), //Position ESIEA France Ivry-Sur-Seine 94200
																title:"ESIEA"
															});
															new google.maps.Marker({
																map: gMap,
																animation: google.maps.Animation.DROP,
																position: new google.maps.LatLng (48.858706,2.347456), //Position Chatelet France Paris 75001
																title:"Chatelet"
															});
															// Fin code Marker ************************************************************************************* 
															var geo = Ext.create('Ext.util.Geolocation', {
																autoUpdate: true,
																listeners: {
																	locationupdate: function (geo) {//In this code bloc we update the current user location
																		var mikutanoUserLocation = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
																		console.log("my current position" + mikutanoUserLocation);
																		console.log('http://graph.facebook.com/'+userid+'/picture');
																		//console.log(this.userid, this.url);
																		//alert("position");
																		//If we dont have the picture of the Mikutano user We call the FB.api to create a Marker with the Facebook user picture
																		if (userid == null)
																			{
																				FB.api('/me', function(response) {
																				  console.log('Good to see you, ' + response.name + '.');
																				  username = response.name;
																				  userid = response.id;
																				  console.log('username, ' + username + '.');
																				  console.log('userid, ' + userid + '.');
																				});
																		}
																		//My facebook's Id is '604664361' for Manuel Birba
																		var url = 'http://graph.facebook.com/'+userid+'/picture'; // url to the facebook user
																		var usermarker = username; //variable to display the Mikutano's user name
																		
																		var infoWindow = new google.maps.InfoWindow({
																			content: 'this is where I work'
																		});
																		
																		// an other way: use Ext.get('id of an map xtype'), var gmap = Ext.getCmp('MikutanoMap').getMap();
																		var marker = new google.maps.Marker({
																			position: new google.maps.LatLng(37.0625,-95.67706),
																			map: gMap,
																			title: 'My office' //
																		});
																		
																		google.maps.event.addListener(marker,'click',
																			function() {infoWindow.open(gMap, marker);
																		});			
																		
																		var usermarker = new google.maps.Marker({
																			position: mikutanoUserLocation,
																			map: gMap,
																			icon : url,
																			title: usermarker
																		});
																		
																	},
																	locationerror: function (geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
																		if (bTimeout) {
																			Ext.Msg.alert('Timeout occurred.');
																		} else {
																			Ext.Msg.alert('Error occurred.');
																		}
																	}
																}
															});// end of Ext.util.Geolocation
															geo.updateLocation();
														}//end of maprender
													}// end of listeners
												}//end of xtype map 
										   ]// end of items of container
								},// end of container
						   ],// end of items of title geolocation
				},
				{ /* fourth item Room screen */
			
					title: 'Rooms',
					iconCls: 'star',
					style: 'background:#C0DCF2',

					/*styleHtmlContent: true,
					scrollable: true,*/
				
				   items: 
						   [
							   {
									docked: 'top',
									xtype: 'titlebar',
									layout: {
										type: 'vbox',
										pack:'center',
										align: 'center'
									},
									items: // beginning item of titlebar
										[
											{
												title: 'Welcome',
												iconCls: 'action',
												style: 'background:transparent; border:none',
												listeners: {
													tap: function() {
														Ext.Msg.alert('Share','share underconstruction');
														
													}
												}
											},
											// {
// 												xtype: 'spacer',
// 												width: 10
// 											},
											{
												xtype: 'button', // go Home
												text: 'Home',
												style: 'background:transparent; border:none',
												listeners: {
													tap: function() {
														Ext.Msg.alert('Home','home underconstruction');
														
													}
												}
											},
											// {
// 												xtype: 'spacer', 
// 												width: 10
// 											},
											{
												xtype: 'button', // go setting
												text: 'Parameter',
												style: 'background:transparent; border:none',
												listeners: {
													tap: function() {
														Ext.Msg.alert('Settings','setting underconstruction');
														
													}
												}
											},
											// {
// 												xtype: 'spacer',
// 												width: 10
// 											},
											{
												xtype: 'button', // go search
												text: 'Search',
												style: 'background:transparent; border:none',
												listeners: {
													tap: function() {
														Ext.Msg.alert('Searching','searching underconstruction');
														
													}
												}
											}
										]// fin item du titlebar
				
								},
								{
									xtype: 'container',
									layout: {
												type: 'hbox',
												pack: 'center',
									},
									items: [
											{
												xtype: 'button',
												width: 120,
												height: 20,
												id : 'FacebookFriendsButton',
												margin: '20 20 20 20', //'Up Right Down Left'
												text: 'Friends',
												style: 'background:#1985D0',
												listeners: {
													tap: function() {
															//Ext.Msg.alert('Slide DataFriendsList','Animation');
															var sliderFriends = Ext.getCmp('dataFriendsList');
															Ext.Anim.run(sliderFriends, 'slide', {
																out: true,
																direction : 'right',
																duration : 1000,
																autoClear: false
															});
														}
												}
											}
									]
								},
								{
									xtype: 'container',
									style: 'background:#98eb80', // pastel green
									margin: '0 5 0 5', //'Up Right Down Left'
									height: 280,
									layout: {
												type: 'hbox',
												pack: 'center'
									},
						
									items: [
											{
												xtype: 'panel',
												html: 'Room : ',
												style: 'background:#C0ACF2', //purple
												margin: '0 10 0 0', //'Up Right Down Left'
												flex: 3,
												height: 280,
												items: [{
													xtype: 'dataview',
													docked: 'bottom',
													style: 'background:yellow',
													margin: '0 5 5 5',
													height: '80%',
													store: 'TchatRoomStore',
													itemTpl: 'id : {id} name : {name} address : {address} status : {status}',
													listeners: {
														select: function(view, record) {
															Ext.Msg.alert('Selected!', 'You selected : ' + record.get('name') + ', status : ' + record.get('status'));
														}
													}
												}]
											},
											{
												xtype: 'panel',
												html: 'Friends following : ',
												style: 'background:#98eb80', // pastel green
												flex: 1,
												height: 280,
												items: [{
														xtype: 'dataview',
														docked: 'bottom',
														style: 'background:yellow',
														margin: '0 5 5 5',
														height: '80%',
														id: 'dataFriendsList',
														store: "FbFriendsStore",	
														itemTpl: [
															'<div> {friendname} </div>',
														]
												}]
											}
										],
										
									},
								],
				},// end of fourth item
				{ /* five item : trend room */
		
					title: 'Topic\'s trend',
					iconCls: 'home',
					style: 'background:#C0DCF2', // bleu
					
					//styleHtmlContent: true,
					//scrollable: true,
					
					items: [
						{
							docked: 'top',
							xtype: 'titlebar',
							layout: {
										type: 'vbox',
										pack:'center',
										align: 'center'
									},
							items: [ 
										{ 
											title: 'Settings',
											iconCls: 'settings',
											style: 'background:transparent; border:none',
											listeners: {
												tap: function() {
													Ext.Msg.alert('Settings','settings underconstruction');
												}
											}
										},
										{
											xtype: 'spacer',
											margin: '20 0 0 0',
											width: 69
										},
										{ 
											title: 'Welcome',
											iconCls: 'home',
											style: 'background:transparent; border:none',
											//centered : Boolean,
											listeners: {
												tap: function() {
													Ext.Msg.alert('Home','home underconstruction');
												}
											}
										},
										{
											xtype: 'spacer',
											margin: '20 0 0 0',
											width: 68
										},
										{ 
											title: 'Search',
											iconCls: 'search',
											style: 'background:transparent; border:none',
											listeners: {
												tap: function() {
													Ext.Msg.alert('Search','search underconstruction');
												}
											}
										},
							],
						},
						{
							xtype: 'panel',
							docked: 'top',
							height: 70,
							width: 320,
							style: 'background:#C0ACF2', // violet Donald
							items: [
								{
									xtype: 'image',
									margin: '10  10 5', // (70-50)/2
									src: 'resources/icons/donald.png',
									height: 50,
									width: 50,
									listeners: {
												tap: function() {
													//Ext.Msg.alert('Chat on', 'The chat is launched');
													//var socket = io.connect('http://dibango.fr:9000');
														socket.on('news', function (data) {
															//Ext.Msg.alert('Message serveur', 'data');
															socket.emit('my other event', 'the user receive the \'news\' event from serveur chat');
														  });
														socket.emit('action button', 'the user click on the chat rooms Picture !');
														socket.on('picture', function (data){
															console.log(data);
														});
												}
									}
								},
							],
						},
						{
							xtype: 'toolbar',
							dock: 'bottom',
							itemId: 'msgToolbar',
							layout: 'hbox',
							items: [
								{
									xtype: 'textfield',
									id : 'messageToSend',
									placeHolder: 'write something please...',
									flex:10, // please see controller Chat.js file to improve some functionality to the sending message
									
								},
								{ 
									title: 'Chat',
									iconCls: 'add',
									id : 'SendMessageButton',
									flex:1,
								}
							]
						},
						{
							xtype: 'panel',
							html: 'Room : ',
							style: 'background:#98eb80', // pastel green
							flex: 1,
							height: 260,
							layout: 'fit',
							items: [{
									xtype: 'dataview',
									docked: 'bottom',
									style: 'background:yellow',
									margin: '0 5 5 5',
									height: '80%',
									id: 'MessagesList',
									store: "MessagesStore",
									//scrollToTopOnRefresh : true,
									//scrollToTopOnRefresh : true,	
									itemTpl: [
										'<div>message numéro {id} : {messages} </div>',
									]
							}]
						},
					],
					// html: [
// 						'<h3>Let\'s talk about </h3>',
// 						'<h3>Mikutano test chat!</h3>',
// 							"<!-- le bloc d'affichage contennant le champ d'envoie des messages d'une chat-room -->",
// 							'<input type="text" value="Écrivez votre message" id="msg" size="25" autofocus />',
// 
// 		
// 						'<h4>Room : Open-Space </h4>',
// 		
// 						"<!-- le bloc d'affichage contennant la liste des utilisateurs d'une chat-room -->",
// 						'<div style="text-align:center; color:#1985D0; border:5px solid; width: 35%; float:right;"> utilisateurs connectés :',
// 							'<ol id ="usersliste">',
// 							'</ol>',
// 						'</div>',
// 		
// 						'<div id ="liste">',
// 						  '<div>auteur room : Mikutano', 
// 						  "<p>pour la liste des commandes taper :<br> '/cmd' </p>",
// 						  '<a href="https://www.youtube.com/watch?v=rs6HUT-SvyQ">Ace hood</a>',
// 						  '</div>',
// 						'</div>',
// 						'<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>',
// 						'<script src="/socket.io/socket.io.js"></script>',
// 						'<script>',
// 							'alert("initialize");',
// 							"var liste = $('#liste');", 
// 							"var socket = io.connect('http://dibango.fr:9000'); //  socket contenant l'adresse de connection au serveur de chat",
// 							"var pseudo = prompt('Quel est votre pseudo ?') || 'anonyme'; // variable contenant le nom du nouvel utilisateur",
// 							"var users = null; // la liste des utilisateurs du chat",
// 							'var DATA_KEYBOARD = {",',
// 								"ENTER: 13",
// 							"};",
// 							"var NL = '\n';",
// 
// 							"$('#msg').on('keypress', function(e) {",
// 								"console.info(e.keyCode);",
// 								"if (e.keyCode == DATA_KEYBOARD.ENTER) {",
// 									"validateForm ();",
// 								"}",
// 							"});",
// 
// 							// " On récupère la valeur du nom de l'utilisateur", 
// // 							"pour lui souhaiter la bienvenue sur le chat de Mikutano",
// // 							"",
// 							"$('#msg').val('Bienvenue sur Mikutano ' + pseudo);",
// 
// 							// " On envoie au serveur le pseudo de l'utilisateur qui vient de se connecter ",
// 							"socket.emit('connection-users', pseudo);",
// 
// 							"socket.on('message-join-room', function(res){",
// 								"alert('message : '  + res.message +NL+ ",
// 								"'expéditeur : '		+ res.expéditeur +NL+ ",
// 								"'destinataire : ' 	+ res.destinataire +NL+ ",
// 								"'position: '		+ res.position +NL+ ",
// 								"'room créées: '		+ res.roomcreees[0].name +  ' --> ' + res.roomcreees[0].link +NL",
// 													"+ res.roomcreees[1].name +  ' --> ' + res.roomcreees[1].link +NL",
// 								");",
// 							"});",
// 
// 							// " ",
// // 							"A chaque connection le serveur nous envoie la liste du dernier utilisateur.",
// // 							"on affiche cette liste dans la div '#usersliste' ",
// // 							"",
// 							"socket.on('listebroadcast', function(users){",
// 								"var $list = $('#usersliste');",
// 								"$('#usersliste').empty();",
// 								"for(var i in users){",
// 									"var $li = $('<li>').text(users[i]);",
// 									"$list.append($li);",
// 								"} ",
// 							"});",
// 
// 							"socket.on('notif-serveur', function(message, pseudo) {",
// 								"console.log('vous avez envoyer au serveur le message : ' + message + ' et votre pseudo est : ' + pseudo);",
// 								'var $li_emit = $("<div style="width: 50%" >");',
// 								"$li_emit.text(pseudo + ' dit: ' + message);",
// 								"$li_emit.css('background-color', '#58F682');",
// 								"liste.append($li_emit);",
// 							"})",
// 							// " ",
// // 							"Réception des messages de la part du serveur ",
// // 							"(il s'agit des messages qu'on lui envoie il nous les retournent) ",
// // 							"",
// 
// 							"socket.on('message-serveur', function(message, pseudo) {",
// 								"console.log('vous avez envoyer au serveur le message : ' + message + ' et votre pseudo est : ' + pseudo);",
// 								'var $li_emit = $("<div style="width: 50%" >");',
// 								"$li_emit.text(pseudo + ' dit: ' + message);",
// 								"$li_emit.css('background-color', '#99CCFF');",
// 								// " définit des couleurs aléatoirement comme back-ground",
// // 								"var color = '#' + Math.floor(Math.random()*16777215).toString(16);",
// // 								"$li_emit.css('background-color', color); ",
// // 								"",
// 								"liste.append($li_emit);",
// 							"})",
// 
// 							// " ",
// // 							"Réception des messages de la part des utilisateurs ",
// // 							"(le serveur renvoie ce que les utilisateurs lui ont envoyé ",
// // 							"",
// 
// 							"socket.on('msgbroadcast', function(message, pseudo) {",
// 								"console.log(pseudo + ' dit: ' + message);",
// 								'var $li_receive = $("<div style="width: 50%" >");',
// 								"$li_receive.text(pseudo + ' dit: ' + message);",
// 								"$li_receive.css('background-color', '#FF6600');",
// 								"liste.append($li_receive);",
// 							"})",
// 
// 							// " ",
// // 							"fonction qui récupère la valeur de l'input '#msg' et l'envoie au serveur", 
// // 							"",
// 
// 							"var validateForm = function ()",
// 								"{ ",
// 								"//$('#msg').next().click(function () {",
// 									"if($('#msg').val()!=''){",
// 										"socket.emit('msg', $('#msg').val(), pseudo);",
// 										"$('#msg').val('');",
// 									"}",
// 							"};",
// 						"</script>",
// 					].join(""),
				},/* end of five item : trend room */
				
        	   ]
			}
		});
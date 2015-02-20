/* 
	author: @Manuel Birba
	last date modified : 09/07/14 
*/
//var pos = null;
Ext.define('MyApp.controller.Map', {
    extend: 'Ext.app.Controller',
    
    config:{
			refs: {
				mainView: 'mainview',
				//MikutanoMap: 'mainview #MikutanoMap'
				mylocation: 'mainview #MikutanoMap'
			},
			control: {
				//"mainview #MikutanoMap": {
				"mainview #MikutanoMap": {
					tap: 'mapLaunch'
				}
			}
	},
mapLaunch: function mapLaunch(map) {
			// Get a ref to the google map object (should be provided
			// as an argument to the listener but apparently there is
			// a bug...)
			Ext.Msg.alert('Map Underconstruction');
			//Ext.Msg.alert('position : ' + mikutanoUserLocation);
			//alert('position : ' + mikutanoUserLocation);
			
			var gMap = Ext.getCmp('MikutanoMap');
			//gMap
			//var gMap = this.getMap();
			new google.maps.Marker({
				map: gMap,
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng (48.814801,2.378355), //Position ESIEA
				title:"ESIEA"
			});
			new google.maps.Marker({
				map: gMap,
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng (48.858706,2.347456), //Position Chatelet
				title:"Carte centrée sur : Chatelet"
			});

			var geo = Ext.create('Ext.util.Geolocation', {
				autoUpdate: true,
				listeners: {
					locationupdate: function (geo) {//update the curent location = center
						var mikutanoUserLocation = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
						pos = mikutanoUserLocation;
						//My facebook's Id is '604664361' 
						var url = 'http://graph.facebook.com/'+userid+'/picture';
						var usermarker = username; //variable to display the Mikutano's user name
						
						var infoWindow = new google.maps.InfoWindow({
							content: 'this is where I work'
						});
						
						/* an other way: use Ext.get('id of an map xtype')
						var gmap = Ext.getCmp('MikutanoMap').getMap();
						*/
						
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(37.0625,-95.67706),
							map: gMap,
							title: 'My office'
						});
						
						google.maps.event.addListener(marker,'click',
							function() {infoWindow.open(gMap, marker);
						});			
						
						var marker = new google.maps.Marker({
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
			});
			geo.updateLocation();
		}
});
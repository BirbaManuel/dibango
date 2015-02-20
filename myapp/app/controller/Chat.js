Ext.define('MyApp.controller.Chat', {
    extend: 'Ext.app.Controller',
    
    config:{
			refs: {
				mainView: 'mainview',
				AddMessage: 'mainview #SendMessageButton'
			},
			control: {
				"mainview #SendMessageButton": {
					tap: 'sendmessage'
				}
			}
	},
	
	sendmessage:function () {
					Ext.Viewport.scrollToTop(); // view the last element of the store
					var messagesToSend = Ext.getCmp('messageToSend'); // get a pointer to the field 'message'
	// 													Ext.Viewport.scrollToTop();
	// 													//Ext.Viewport.updateBodySize();
												// var messagesChat = Ext.getCmp('MessagesList'); //get a pointer to the dataview 'MessagesList'
// 												messagesChat.getStore().add({ // this is a test to populate the database/store 'MessagesStore'
// 																			messages: messagesToSend.getValue()
// 												});
												//messagesChat.refresh(); //refresh the store
												//messagesChat.scrollToTop(); try to scroll to top the dataview but it doesn't work
												socket.emit('messageTOServer', messagesToSend.getValue());
												messagesToSend.reset(); //clear the field of sending message
												//field.focus();
	}
});

socket.on('messageFromServer', function (data) {
										console.log('event received : ' + data);
										var messagesToReceive = data;
										var messagesChat = Ext.getCmp('MessagesList');
										messagesChat.getStore().add({ // this is a test to populate the database/store 'MessagesStore'
																	messages: messagesToReceive
										});
										//messagesChat.scroller.scrollTo({ x: 0, y: 0 });
										//messagesChat.scrollTo({ x: 0, y: 0 });
	});
//this file contain the NodeJS server of Mikutano 


// var http = require('http'); // on importe la librairie 'http' pour créer un serveur 
// var fs = require('fs'); // on importe la librairie 'fs' pour lire/écrire dans un fichier
// 
// /*
// 	1- On créer une variable contenant notre serveur
// 	2- Chargement du fichier index.html qui sera la page renvoyer par le serveur à chaque connection
// 	3- On écrit dans la callback de la création du serveur l'entête de chaque réponse
// //
// var server = http.createServer(function(req, res) {
//     fs.readFile('./index.html', 'utf-8', function(error, content) {
//         res.writeHead(200, {"Content-Type": "text/html"}); // chaque réponse a un header de type "text/html"
//         res.end(content); // on renvoie le contenu du fichier "index.html"
//     });
// });
// 
// var io = require('socket.io').listen(server); // on importe la librairie 'socket.io'
// var users = []; // on déclare une variable qui va contenir la liste des utilisateurs
// console.log(' aller à l\'adresse : dibango.fr:9000');
// 
// /* 
// 	on utilise la socket "io" pour créer une room dans laquelle on pourra discuter
// 	ensuite chaque message correspond à un évènement en JavaScript
// 	exemple le type 'msg' correspond aux messages envoyer par les clients au serveur
// 	le type 'message' correspond aux messages envoyer par le serveur aux clients
// //
// io.sockets.on('connection', function (socket, pseudo) {
// 	// On signale à l' utilisateur qu'il est bien connecté au chat
//     // socket.emit('message-join-room', 'l\' utilisateur : ' + pseudo + ' a rejoint le chat');
//     socket.emit('message-join-room', {
// 		message: 'Bonjour Mikutaners', 
// 		expéditeur: 'Vous êtes bien connecté !', 
// 		destinataire: '1', 
// 		position: '13 rue Louis Pasteur', 
// 		roomcreees: [
// 			{name: 'Open-Space', link: 'blablab'}, 
// 			{name: 'babyfoot', link: 'blabla2'}
// 		]
//     });
//     // On signale aux autres clients qu'il y a un nouvel utilisateur
//     socket.broadcast.emit('message-join-room', 'l\' utilisateur : ' + pseudo + ' a rejoint le chat');
//     
// 
//     // Dès qu'on nous donne un pseudo, on le stocke en variable de session
//     /*socket.on('petit_nouveau', function(pseudo) {
//         socket.set('pseudo', pseudo);
//     });
//    
// 
//     socket.on('msg', function (message, pseudo) {
//     // si le corps du message reçu par un client est 'babyfoot' le serveur envoie un message à ce client pour lui dire 'why not'
//     	if(message == '/cmd'){
//     		var serveur = 'serveur';
//         	socket.emit('notif-serveur', '- Vous pouvez supprimer des utilisateurs\n-faire un don à un utilisateur\n- Ou rencontrer des gens', serveur );
//         }
//         
//         else
// 			{// le serveur affiche dans sa console les messages qu'il reçoit des clients et les renvoie
// 			console.log(pseudo + ' me parle ! Il me dit : ' + message + ' : ' + Date()); //destinataire : console
// 			socket.emit('message-serveur', message +' le : ' + Date(), pseudo); // destinataire : émetteur du message reçu par serveur
// 			socket.broadcast.emit('msgbroadcast', message + ' le : ' + Date(), pseudo); // destinataire : tous les users sauf émetteur
// 			}
//     });
//     
//     /* 
//     Réception des noms utilisateurs à chaque nouvelle connection.
//    
//     socket.on('connection-users', function(pseudo){
//     	users.push(pseudo);
//     	socket.emit('listebroadcast', users);
//     	socket.broadcast.emit('listebroadcast', users);
//     });	
// });    
// server.listen(9000);
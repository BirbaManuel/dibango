var express = require('express'); // express '4.6.2'
var app = express(); // we create an express application

app.use(express.static(__dirname + '/')); // the server serve the current directory (Sencha is my 'middleware')
console.log("server run on dibango.fr:1988");
//var connexion = console.log("connected to dibango !");

// we launch the Mikutano app on this port : 1988
app.listen(1988); // my server is listening on the port '1988' at the adress 'dibango.fr'

//console.log("\'app.listen(1988)\' éxécuté ");

// test de socket.io : it's a module that enable you create bidirectional communication

var io = require('socket.io')(); // version": '1.0.6'
//console.log("var io = require(\'socket.io\')(); éxécuté ");
var log = null;

setInterval(
	function(){
		log = log + 1;
		console.log(log + " fois setInterval");
	},10000
);

//io.sockets.on('connection', function (socket, pseudo) {
io.sockets.on('connection', function (socket) { //  this even is listening when a user connect himself on the Mikutano socket 
		console.log(" io event \'connection\' listened : user connected on port (1988) \'Mikutano\'");
		// log = log + 1;
// 		console.log("log numéro : " + log);
// 		socket.emit('news', { hello: 'world' });
// 		socket.on('my other event', function (data) {
//     	console.log(data);
//   		});
});

// io.on('connection', function(socket){
// console.log(connexion);
// });
//va
// 
// 	1- On créer une variable contenant notre serveur
// 	2- Chargement du dossier /myapp contenant l'appli mobile sencha 
// 	3- On écrit dans la callback de la création du serveur l'entête de chaque réponse
// 
// var server = http.createServer(function(req, res) {
//     fs.readFile('./build/testing/MyApp/index.html', 'utf-8', function(error, content) {
//         res.writeHead(200, {"Content-Type": "text/html"}); // chaque réponse a un header de type "text/html"
//         res.end(content); // on renvoie le contenu du fichier "index.html"
//     });
// });
// 
// var io = require('socket.io').listen(server); // on importe la librairie 'socket.io'
// var users = []; // on déclare une variable qui va contenir la liste des utilisateurs
// 
// // 
// 	//on utilise la socket "io" pour créer une room dans laquelle on pourra discuter
// 	//ensuite chaque message correspond à un évènement en JavaScript
// 	//exemple le type 'msg' correspond aux messages envoyer par les clients au serveur
// 	//le type 'message' correspond aux messages envoyer par le serveur aux clients
// //
// io.sockets.on('connection', function (socket, pseudo) {
// 	// On signale à l' utilisateur qu'il est bien connecté au chat
//     socket.emit('message-join-room', 'l\' utilisateur : ' + pseudo + ' a rejoint le chat');
//     // On signale aux autres clients qu'il y a un nouvel utilisateur
//     socket.broadcast.emit('message-join-room', 'l\' utilisateur : ' + pseudo + ' a rejoint le chat');
//     
// 
//     // Dès qu'on nous donne un pseudo, on le stocke en variable de session
//     //socket.on('petit_nouveau', function(pseudo) {
//         //socket.set('pseudo', pseudo);
//     //});
//     //
// 
//     socket.on('msg', function (message, pseudo) {
//     // si le corps du message reçu par un client est 'babyfoot' le serveur envoie un message à ce client pour lui dire 'why not'
//     	if(message == '/cmd'){
//     		var serveur = 'serveur';
//         	socket.emit('notif-serveur', '- Vous pouvez supprimer des utilisateurs\n-faire un don à un utilisateur\n- Ou rencontrer des gens\n- ou acheter un fleshlight : http://www.fleshlight-international.eu/?link=281&gclid=Cj0KEQjw0POdBRCq3arGgYD05pMBEiQAmiUeThuqMt6F8XzLaQyooQjXb7bBCBzyZSa02HGXBNActMUaAm6U8P8HAQ&ad=24730420658', serveur );
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
//     // 
//     //Réception des noms utilisateurs à chaque nouvelle connection.
//     //
//     socket.on('connection-users', function(pseudo){
//     	users.push(pseudo);
//     	socket.emit('listebroadcast', users);
//     	socket.broadcast.emit('listebroadcast', users);
//     });		
// });

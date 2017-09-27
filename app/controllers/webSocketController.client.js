'use strict';

//GLOBALS for SOCKET use
var connected = 0;
var act = false;
//////////////////////////

var client = io.connect('/');
        client.on('stats', function(data) {
        	
        	connected = data.numClients;
            act = data.data.act;
            
            var count = document.querySelector('#count');
            if(act === true) {
            	count.innerHTML = 'Connected Clients: <kbd>'+connected/3+'</kbd>';
            	function updateChart(){
            	console.log('WEBSOCKETCLIENT->'+data.data);
            	//configFromServer = data.data;
            	console.log('Got data from server!');
        		}
        		document.getElementById('adddata').addEventListener('click', function() {
            		window.setTimeout(function(){socket.emit('event', { message: 'I did add a name to the array!' });},3000);
        		});
        		document.getElementById('deldata').addEventListener('click', function() {
            		window.setTimeout(function(){socket.emit('event', { message: 'I did remove a name to the array!' });},3000);
        		});
            }
        });
'use strict';

//GLOBALS for SOCKET use
var connected = 0;
var act = false;
var name = '';
//////////////////////////

var socket = io.connect('/');
var socket1 = io.connect('/');
    socket1.on('broadcast', function(data) {
        console.log('broadcast:', data);
        alert(data);
    });

var client = io.connect('/');
client.on('stats', function(data) {
        	
    connected = data.numClients;
    act = data.data.act;
    name = data.data.name;
            
    var count = document.querySelector('#count');
    var lastope = document.querySelector('#lastope');
    
    if(act === true) {
        count.innerHTML = 'Connected Clients: <kbd>'+connected/3+'</kbd>';
        lastope.innerHTML = 'Last data operation: <kbd>' + data.data.ope + '</kbd> <kbd>'+name+'</kbd>';
        function updateChart(){
            console.log('WEBSOCKETCLIENT->'+data.data);
            //configFromServer = data.data;
            console.log('Got data from server!');
        }
        	document.getElementById('adddata').addEventListener('click', function() {
        	    var name = document.querySelector('#name').value;
            	window.setTimeout(function(){socket.emit('event', { message: 'I did add a name to the array!', name: name, ope: 'add' });},1000);
        	});
        	document.getElementById('deldata').addEventListener('click', function() {
        	    var name = document.querySelector('input[name = "radioData"]:checked').value
            	window.setTimeout(function(){socket.emit('event', { message: 'I did remove a name to the array!', name: name, ope: 'del' });},1000);
        	});
    }
});
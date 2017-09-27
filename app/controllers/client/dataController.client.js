'use strict';

(function () {

   var addButton = document.querySelector('#adddata');
   var delButton = document.querySelector('#deldata');
   var grid = document.querySelector('#list');
   var name = document.querySelector('#name');
   //var image = document.querySelector('#image');
   var apiUrl = appUrl + '/api/:id/info';
   
   var cont = -1;//-1,3
   function colors(){
      //cont = min;
      var colors = ["list-group-item-info","list-group-item-warning","list-group-item-danger","list-group-item-success"];
      cont++;
      if(cont > -1 && cont < 2) return colors[cont];
      else{
         cont = 0;
         return colors[cont];
      } 
   }
   var cont1 = 1;
   function colors1(){
      //cont = min;
      var colors = ["list-group-item-info","list-group-item-warning","list-group-item-danger","list-group-item-success"];
      cont1++;
      if(cont1 > 0 && cont1 < 4) return colors[cont1];
      else{
         cont1 = 2;
         return colors[cont1];
      } 
   }

   function updateGrid (data) {
      var info = JSON.parse(data);
      console.log(info.data);
      grid.innerHTML = '';
      for(var a = 0; a < info.data.length; a++){
         grid.innerHTML = grid.innerHTML + '<li class="list-group-item '+colors1()+'"><input type="radio" value="?name=' +info.data[a].name+'" name="radioData" id="radioData'+a+'">'+info.data[a].name+'</li>'
      }
      
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid));

   addButton.addEventListener('click', function () {

      var query = "?name=" + name.value;
      ajaxFunctions.ajaxRequest('POST', apiUrl + 'add' + query, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
      });

   }, false);

   delButton.addEventListener('click', function () {

      var query = document.querySelector('input[name = "radioData"]:checked').value;
      ajaxFunctions.ajaxRequest('DELETE', apiUrl + 'del' + query, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
      });

   }, false);
   
})();

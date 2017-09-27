'use strict';

(function () {

   var login = document.querySelector('#login') || null;
   var create = document.querySelector('#create') || null;
   var reset = document.querySelector('#reset') || null;
   var authform = document.querySelector('#authform') || null;
   var message = document.querySelector('#message') || null;
   var apiUrl = appUrl + '/auth/localnew';

   function updateForm (ope) {
      if(ope == 'login') authform.innerHTML = '<form action="/auth/local" method="post">	<h3>LOGIN LOCAL USER</h3>	<div class="form-group">	<div>	<label>Username:</label>	<input type="text" name="username"class="form-control" placeholder="Username or Email"/><br/>	</div>	<div>	<label>Password:</label>	<input type="password" name="password" class="form-control" placeholder="Password"/>	</div>	</div>	<br>	<div class="form-group">	<div>	<input type="submit" class="btn btn-primary" value="Submit"/>	</div>	</div></form>';
      if(ope == 'create') authform.innerHTML = '<form action="/auth/localnew" method="post">	<h3>CREATE LOCAL USER</h3>	<div class="form-group">	<div>	<label>Username:</label>	<input type="text" name="username"class="form-control" placeholder="Username or Email"/><br/>	</div>	<div>	<label>Display Name:</label>	<input type="text" name="display"class="form-control" placeholder="Display Name"/><br/>	</div>	<div>	<label>Password:</label>	<input type="password" name="password" class="form-control" placeholder="Password"/>	</div>	</div>	<br>	<div class="form-group">	<div>	<input type="submit" class="btn btn-primary" value="Submit"/>	</div>	</div></form>';
      if(ope == 'reset') authform.innerHTML = '<p>Only valid if your username is a valid email!</p><br> Username:<input type="text" name="name" id="resetusername" class="form-control" placeholder="Email"><br>  <button type="submit" class="btn btn-add btn-primary" id ="resetaction">Reset!</button>';
   }
   
   function updateMess (data){
      var info = JSON.parse(data);
      if(info.message != null && info.message != undefined){
         message.innerHTML = '<div class="'+info.type+'"><h2>'+ info.message +'</h2></div>';
      }
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('login')));
   
   login.addEventListener('click', function () {

         ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('login'));
      
   }, false);
   
   create.addEventListener('click', function () {

         ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('create'));
      
   }, false);
   
   reset.addEventListener('click', function () {

         ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('reset'));
         
         document.querySelector('#resetaction').addEventListener('click', function(){
            var resetUsername = document.querySelector('#resetusername').value;
            ajaxFunctions.ajaxRequest('POST', apiUrl + 'reset?name=' + resetUsername, function () {
               ajaxFunctions.ajaxRequest('GET', apiUrl+'message', updateMess);
               ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('login'));
            });
         });
         
      
   }, false);
   
})();

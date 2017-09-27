'use strict';

(function () {

   var photoId = document.querySelector('#photoId') || null;
   var repo = document.querySelector('#repo') || null;
   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   //var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject, displayName, 'username');
      }

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }

      if(userObject.publicRepos !== undefined && repo !== null){
         if (userObject.publicRepos !== null) {
            repo.innerHTML =  '<p><span>Repositories: </span><span id="profile-repos" class="profile-value">'+ userObject.publicRepos +'</span></p>';
            //updateHtmlElement(userObject, profileRepos, 'publicRepos'); 
         }
      }else if(userObject.publicRepos === undefined && repo !== null){
         repo.innerHTML =  '<p><span>Repositories: </span><span id="profile-repos" class="profile-value">No Info!</span></p>'; 
      }
      
      if(userObject.photo !== undefined && photoId !== null){
         if (userObject.photo !== null && photoId !== null) {
            photoId.innerHTML =  '<img src='+userObject.photo+' class = "img-rounded">';
         }
      } else if(userObject.photo === undefined && photoId !== null) {
         photoId.innerHTML =  '<img src="/public/img/gh-mark-32px.png" alt="github logo" />';
      }
      

   }));
})();

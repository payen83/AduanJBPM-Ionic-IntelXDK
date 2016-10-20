angular.module('app.controllers', [])

.run(function($rootScope){
    
    $rootScope.aduan = [];
    
    firebase.database().ref('/senaraiAduan/').once('value').then(function(snapshot){
       
        $rootScope.$apply(function(){
            snapshot.forEach(function(aduanSnapshot){
               
                $rootScope.aduan.push({
                    id: $rootScope.aduan.length+1,
                    tajuk: aduanSnapshot.child('tajuk').val(),
                    pengadu: aduanSnapshot.child('pengadu').val(),
                    lat: aduanSnapshot.child('lat').val(),
                    long: aduanSnapshot.child('long').val(),
                    gambar: aduanSnapshot.child('gambar').val()  
                }); // end of properties.push
            });// end of for each
        });// end of apply  
       
    }); //end of .once function

    
//    $rootScope.aduan = [
//        {id: 1, tajuk: "Aduan Pertama", pengadu: "Ali bin Abu"},
//        {id: 2, tajuk: "Aduan Kedua", pengadu: "Salmah binti Ali"},
//        {id: 3, tajuk: "Aduan Ketiga", pengadu: "Henry Lee"}
//    ];
    
})

  
.controller('senaraiAduanCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
    
    $scope.aduanBaru = function(){
        $state.go('aduanBaru');
    }


}])
   
.controller('aduanBaruCtrl', ['$scope', '$stateParams', '$state', '$cordovaCamera', '$cordovaGeolocation',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $cordovaCamera, $cordovaGeolocation) {
    
    $scope.gambar = "";
    
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.lat  = position.coords.latitude;
          $scope.long = position.coords.longitude;
          $scope.latlong = $scope.lat + ", " + $scope.long;
        }, function(err) {
          // error
    });

    $scope.simpanAduan = function(){
        
        $scope.aduan.push({
            id: $scope.aduan.length+1,
            tajuk: $scope.tajuk,
            pengadu: $scope.pengadu,
            gambar: $scope.gambar,
            lat: $scope.lat,
            long: $scope.long
        });
        
        var postData = {
            tajuk: $scope.tajuk, 
            pengadu: $scope.pengadu, 
            lat: $scope.lat, 
            long: $scope.long, 
            gambar: $scope.gambar
        };
        
        var newPostKey = firebase.database().ref().child('senaraiAduan').push().key;
        
        var updates = {};
        updates['/senaraiAduan/' + newPostKey] = postData;
        
        firebase.database().ref().update(updates);
        
        
        
        $state.go('senaraiAduan'); 
    }
    
    $scope.btnCamera = function(){
        
        //navigator.notification.alert("Alert");
        
        document.addEventListener("deviceready", function () {

            var options = {
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: false,
              encodingType: 0,
              targetWidth: 800,
              targetHeight: 600,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation:true
            }; /*Camera.EncodingType.JPEG*/

            $cordovaCamera.getPicture(options).then(function(imageData) {
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageData;
              $scope.gambar = imageData;    
            }, function(err) {
              // error
            });

          }, false);
          
    } //end of btnCamera
    
    $scope.btnGaleri = function(){
        
        document.addEventListener("deviceready", function () {

            var options = {
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              allowEdit: false,
              encodingType: 1,
              targetWidth: 800,
              targetHeight: 600,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation:true
            }; /*Camera.EncodingType.JPEG*/

            $cordovaCamera.getPicture(options).then(function(imageData) {
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageData;
              $scope.gambar = imageData;
            }, function(err) {
              // error
            });

          }, false);
        
    } // end of btnGaleri*/
    
    
    
    
}])
   
.controller('butiranAduanCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    
    $scope.aduan = $scope.aduan.filter(function(aduan){
        return aduan.id==$stateParams.id;
    }).pop();
    
    function initMap() {
        var uluru = {lat: $scope.aduan.lat, lng: $scope.aduan.long};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
    
    initMap()
    

}])
 
/**

*  Module

*

* Description

*/

var app = angular.module('myApp', ['ngRoute']).config(['$routeProvider',function($routeProvider) {

	$routeProvider.when('/login',{

		templateUrl: 'login.html',

		controller: 'LoginController'

	});



	$routeProvider.when('/home',{

		templateUrl: 'home.html',

		controller: 'HomeController'

	});

	$routeProvider.otherwise({redirectTo:'login'})

}]);



app.controller('LoginController', ['$scope', '$location', function(s, l){

	s.out = {login: ""};



	s.login = function(){

		l.path('home');

		console.log(s.out);

	}

}]);



app.controller('HomeController', ['$scope', '$location', function(s, l){

	s.message = "Bad choice!";

	s.endMessage = "Good job man!";

	// s.logout = function(){

	// 	l.path('login');

	// }

}]);



app.directive('setInBoat', ['$document', function($document) {

  return function(scope, element, attrs) {

  	var boatChair = angular.element( document.querySelector( '#boatChair' ) );

  	var leftRiverside = angular.element( document.querySelector( '#leftBox' ) );

  	var rightRiverside = angular.element( document.querySelector( '#rightBox' ) );

  	var boat = angular.element( document.querySelector( '#boat' ) );



    element.on('click', function(event) {



    	var posElement = element.offset();

    	var coordBoard = boat.offset();

    	var inBoard = boatChair.get(0).firstChild;

    	if(coordBoard.left == 288 && posElement.left == 188){

    		

    		if(inBoard != null){

	        	angular.element(inBoard).css({

			       height: '70px'

		      	});

		        angular.element(inBoard).appendTo(leftRiverside);

		    }    

	        element.css({

		       height: '50px'

	      	});

	      	angular.element( document.querySelector( '#message' ) ).css({

	      	    display: 'none'   			

	      	});

	    

	    	element.appendTo(boatChair);



	        scope.$on('$destroy', function(){

	            element.remove();

	        });

    	}



    	if(coordBoard.left == 618 && posElement.left == 768){

    		if(inBoard != null){

	        	angular.element(inBoard).css({

			       height: '70px'

		      	});

	        	angular.element(inBoard).appendTo(rightRiverside);

		    }    

	        element.css({

		       height: '50px'

	      	});

	      	angular.element( document.querySelector( '#message' ) ).css({

	      	    display: 'none'   			

	      	});

	    

	    	element.appendTo(boatChair);



	        scope.$on('$destroy', function(){

	            element.remove();

	        });

    	}

        

    });

  };

}]);



app.directive('boatMove', ['$document', function($document) {

  return function(scope, element, attrs) {

  	var boatChair = angular.element( document.querySelector( '#boatChair' ) );

  	var leftRiverside = angular.element( document.querySelector( '#leftBox' ) );

  	var rightRiverside = angular.element( document.querySelector( '#rightBox' ) );

  	var boat = angular.element( document.querySelector( '#boat' ) );



  	

  	

  	element.on('click', function(event) {

  		var countElLeftRiverside = leftRiverside.children().length;

  		var countElrightRiverside = rightRiverside.children().length;

  		var firstElLeftSide = angular.element( document.querySelector( '#leftBox div' ) ).attr('id');

  		var secondElLeftSide = angular.element( document.querySelector( '#leftBox div ' ) ).next().attr('id');

  		var firstElRightSide = angular.element( document.querySelector( '#rightBox div' ) ).attr('id');

  		var secondElRightSide = angular.element( document.querySelector( '#rightBox div ' ) ).next().attr('id');

  		var coordBoard = boat.offset();

  		var inBoard = boatChair.get(0).firstChild;

    	element.css({

	       position: 'relative',

      	});

      	

      	



      	if(coordBoard.left == 288){

      		if(countElLeftRiverside == 2 && firstElLeftSide != "goat" && secondElLeftSide != 'goat' 

      			|| countElLeftRiverside == 1 

      				|| countElLeftRiverside == 0 ){

      			element.css({

			       display: 'none'

		      	});

	      		moveBoatLeft();

	      		

	      	}else{	

	      		angular.element( document.querySelector( '#message' ) ).css({

	      			position: 'relative',

	      			left: '58px',

	      			display: 'block'   			

	      		});

      		}

      		if(countElLeftRiverside == 0 && countElrightRiverside == 2){

      			setTimeout(function(){

	    				angular.element( document.querySelector( '#endMessage' ) ).css({

			      			position: 'relative',

			      			left: '358px',

			      			display: 'block'   			

			      		});

				}, 3200);

				setTimeout(function(){

	    				location="../../";

				}, 5000);

      		}

      	}

      	

      	if(coordBoard.left == 618){

      		if(countElrightRiverside == 2 && firstElRightSide != "goat" && secondElRightSide != 'goat' 

      			|| countElrightRiverside == 1 

      				|| countElrightRiverside == 0 ){

      			element.css({

			       display: 'none'

		      	});

	      		moveBoatRight();

	      	}else{	      		

	      		angular.element( document.querySelector( '#message' ) ).css({

	      			position: 'relative',

	      			left: '358px',

	      			display: 'block'   			

	      		});			

	      	}

      	}

	



      	function moveBoatLeft(){

      		if(coordBoard.left == 288){

	      		for (var i = 0; i <= 330; i+=5) {

					setTimeout((function(i){

						return function(){

								boat.css({ 

									position: 'relative',

			       					left: ''+i+'px'});

								}				

					})(i), i*8+10);

				}



	    		if(inBoard != null){

	    			setTimeout(function(){

	    				angular.element(inBoard).css({

				       		height: '70px'

			      		});

			        	angular.element(inBoard).appendTo(rightRiverside);

					}, 2600);

		        	

			    }

			      

      		}

      	}



	    function moveBoatRight(){

	      	if(coordBoard.left == 618){

	      		for (var i = 0; i <= 330; i+=5) {

					setTimeout((function(i){

						return function(){

								boat.css({ 

									position: 'relative',

			       					left: 330-i+'px'});

								}				

					})(i), i*8+10);

				}



				if(inBoard != null){

	    			setTimeout(function(){

	    				angular.element(inBoard).css({

				       		height: '70px'

			      		});

			        	angular.element(inBoard).appendTo(leftRiverside);

					}, 2600);

		        	

				} 	

	    	}  	

      	}



    });

      	

   }

}]);



app.directive('exitMenu', ['$document', function($document) {

  return function(scope, element, attrs) {

  	var boatChair = angular.element( document.querySelector( '#boatChair' ) );

  	

    element.on('click', function(event) {

    	location="../../";

    });

  };

}]);



app.directive('boatDisplay', ['$document', function($document) {

  return function(scope, element, attrs) {

  	var boatMoveShow = angular.element( document.querySelector( '#boatMove' ) );

  	

    element.on('mouseover', function(event) {

  		boatMoveShow.css({

		    display: 'block'

		}); 

  	});

  };

}]);
window.onload = (function(){	
 	
	var numbers = {}

		numbers.row = 4;

		numbers.parseNum = function(n,x) {			 		
	 		for (var i = 0; i < x.length; i++) { 			
	 			$('.r'+n+' .col'+i).html('<img src="images/'+x.charAt(i)+'.png">');
	 		}; 	
		}

		numbers.defaultParam = function(){
			$.ajax({url: "includes/getNum.php", success: function(result){        	
	        	for (var i = 0; i < numbers.row; i++) {
	        		numbers.parseNum(i,JSON.parse(result)[i].number);
	        	};         
	        }});
		} 

		numbers.rand = function() {
			$.ajax({url: "includes/getNum.php", success: function(result){
	        	var arr = [];
	        	for (var i = 0; i < numbers.row; i++) {
	        		arr[i] = rand(1,19);
	        	};

	        	for (var i = 0; i < numbers.row; i++) {
	        		numbers.parseNum(i,JSON.parse(result)[arr[i]].number);
	        	};           
	            
	        }});
		}

	 	function rand( min, max ) {

		    if( max ) {
		        return Math.floor(Math.random() * (max - min + 1)) + min;
		    } else {
		        return Math.floor(Math.random() * (min + 1));
		    }
		}


		numbers.defaultParam();

		$('.btn-primary').click(function(){		
	        numbers.defaultParam();
	    });

		$('.btn-info').click(function(){
	        numbers.rand();
	    });

		


			
});
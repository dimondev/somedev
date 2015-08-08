$(document).ready(function() {

	
	var SimpleRedactor = function() {};
	var Redactor = new SimpleRedactor();
	var Redactorfilters = Object.create(Redactor);
    
	SimpleRedactor.prototype.canvas = new fabric.Canvas('canvas');  
	
	SimpleRedactor.prototype.checkActivTools = {};

	SimpleRedactor.prototype.addImage = function(url) {
		var self = this;
		var imgFromUrl = fabric.Image.fromURL(url, function(oImg) {
			// oImg.left = canvas.width;
			// oImg.top = canvas.height;
    		self.canvas.setActiveObject(oImg);
    		oImg.clipTo = null;
		  	self.canvas.add(oImg);
		});
	};

	SimpleRedactor.prototype.addFilter = function(index, filtr) {
		var self = this;
		var img = self.canvas.getActiveObject();
	    var obj = self.checkActivTools["checkActiv"+index];
	    if(obj === undefined || obj === false) {
	     img.filters[index] = filtr;
	     self.checkActivTools["checkActiv"+index] = true;	     	
	    } else {
	     img.filters[index] = null;
	     self.checkActivTools["checkActiv"+index] = false;	     	
	 	}
  		// применяем фильтры и перерисовываем канвас после применения
		img.applyFilters(self.canvas.renderAll.bind(self.canvas));
	};

	SimpleRedactor.prototype.checkButton = function(){
		var self = this;
		$('#Refurbish').click(function() {
			document.getElementById("Refurbish").setAttribute("style","display:none");
			var url = "img/download.jpeg"
			self.addImage(url);
		});
	};

	SimpleRedactor.prototype.saveButton = function() {
		document.getElementById("saveChanges").setAttribute("style","display:block");
        document.getElementById("saveChanges").setAttribute("style","float:right");
        document.getElementById("download").setAttribute("style","display:none");
	};

	
    Redactorfilters.imgGrayscale = function() {
    	var self = this;
    	// изминения шкалы серости рисунка
		$('#grayscale').click(function() {
			self.addFilter(0, new fabric.Image.filters.Grayscale());
			self.saveButton();
		});
    };

    Redactorfilters.imgRemoveWhite = function() {
    	var self = this;
    	// убирание белого цвета с рисунка
		$('#removeWhite').click(function() {
			self.addFilter(1, new fabric.Image.filters.RemoveWhite({
				  threshold: 40,
				  distance: 140
			}));
			self.saveButton();
		});
    };

    Redactorfilters.pixelSize = 2;
    Redactorfilters.changeOptionsFilter = function (index, filtr) {
			var self = this;
			var img = self.canvas.getActiveObject();
			img.filters[index] = filtr;
	  		// применяем фильтры и перерисовываем канвас после применения
			img.applyFilters(self.canvas.renderAll.bind(self.canvas));
		};

	Redactorfilters.imgPixelate = function() {
		var self = this;
		// увеличение пикселей в изображении 
		$('#pixelate').click(function () {
			self.addFilter(2, new fabric.Image.filters.Pixelate({
				  blocksize: self.pixelSize
			}));
			self.saveButton();
			if (self.checkActivTools["checkActiv"+2] === true) {
				$('li#pix + div').css({ display: "block" });
				$('li#pix + div + div').css({ display: "block" });
			} else{
				$('li#pix + div').css({ display: "none" });
				$('li#pix + div + div').css({ display: "none" });
			};
		});		

		$('li#pix + div').click(function() {
			self.pixelSize +=1;
			self.changeOptionsFilter(2, new fabric.Image.filters.Pixelate({
				  blocksize: self.pixelSize
			}));
		});
		$('li#pix + div + div').click(function() {
			if (self.pixelSize > 1) {
				self.pixelSize -=1;
				self.changeOptionsFilter(2, new fabric.Image.filters.Pixelate({
					  blocksize: self.pixelSize
				}));
			} 
			
		});
	};

	Redactorfilters.imgSharpen = function() {
		var self = this;
		// увеличить резкость изображении
		$('#sharpen').click(function() {
			self.addFilter(3, new fabric.Image.filters.Convolute({
	        matrix: [  0, -1,  0,
	                  -1,  5, -1,
	                   0, -1,  0 ]
	    	}));
	    	self.saveButton();
		});
		
	};

	Redactorfilters.imgInvert = function() {
		var self = this;
		// увеличить резкость изображении
		$('#invert').click(function() {
			self.addFilter(4, new fabric.Image.filters.Invert());
	    	self.saveButton();
		});
		
	};	

	Redactorfilters.imgSepia = function() {
		var self = this;
		// увеличить резкость изображении
		$('#sepia').click(function() {
			self.addFilter(5, new fabric.Image.filters.Sepia());
	    	self.saveButton();
		});
		
	};
	Redactorfilters.noiseSize = 51;
	Redactorfilters.imgNoise = function() {
		var self = this;
		// увеличение пикселей в изображении 
		$('#noise').click(function () {
			self.addFilter(6, new fabric.Image.filters.Noise({
				  noise: self.noiseSize
			}));
			self.saveButton();
			if (self.checkActivTools["checkActiv"+6] === true) {
				$('li#nois + div').css({ display: "block" });
				$('li#nois + div + div').css({ display: "block" });
			} else{
				$('li#nois + div').css({ display: "none" });
				$('li#nois + div + div').css({ display: "none" });
			};
		});		

		$('li#nois + div').click(function() {
			self.noiseSize +=50;
			self.changeOptionsFilter(2, new fabric.Image.filters.Noise({
				  noise: self.noiseSize
			}));
		});
		$('li#nois + div + div').click(function() {
			if (self.noiseSize > 51) {
				self.noiseSize -=50;
				self.changeOptionsFilter(2, new fabric.Image.filters.Noise({
					  noise: self.noiseSize
				}));
			} 
			
		});
	};

	Redactorfilters.imgCrope = function() {
		var self = this;
		// обрезание изображении 
		$('#crop').click(function() {
			var img = self.canvas.getActiveObject();
			// var dataUrl = self.canvas.toDataURL('png');
			self.canvas.getActiveObject().clipTo = function (ctx) {
	          ctx.arc(0, 0, img.width/2, 0, Math.PI * 2, true);
	        };
	        // self.addImage(dataUrl);
	        img.applyFilters(self.canvas.renderAll.bind(self.canvas));
	        self.saveButton();
		});

	};


startRedactorTools();

function startRedactorTools() {
    Redactor.checkButton();
    Redactorfilters.imgGrayscale();
 	Redactorfilters.imgCrope();
 	Redactorfilters.imgSharpen();
 	Redactorfilters.imgInvert();
 	Redactorfilters.imgSepia();
 	Redactorfilters.imgPixelate();
 	Redactorfilters.imgRemoveWhite();
	Redactorfilters.imgNoise();
}
	
$('#saveChanges').click(function() {
	var canvas = Redactor.canvas;
    // create a dataUrl from the canvas
    var image = canvas.toDataURL();
	// Отсылаем паметры
	$.ajax({
		type: 'POST',
		url: 'download.php',
		data: {urlImg : image},
		success : function (data) {
		console.log(data);
		}
    });
    alert('Push download if all changes you done.');
    document.getElementById("saveChanges").setAttribute("style","display:none");
    document.getElementById("download").setAttribute("style","float:right");
   	document.getElementById("download").setAttribute("style","display:block");
    
});

});
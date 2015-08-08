$(document).ready(function() {

	$(function () {
	    canvas = window.__canvas = new fabric.Canvas('canvas');      
	});
// 	var image = document.getElementById('background');
// image.crossOrigin = 'anonymous';

	// var canvas = new fabric.Canvas('canvas');
	var checkActivTools = {};

	
	$('#checkButton').click(function() {
		var url = $('#formValue').val();
		addImage(url);			
	});

	function addImage(url) {
		var imgFromUrl = fabric.Image.fromURL(url, function(oImg) {
			oImg.url = url;
			oImg.left = canvas.width/2;
			oImg.top = canvas.height/2;
    		canvas.setActiveObject(oImg);
    		oImg.clipTo = null;
		  	canvas.add(oImg);
		});
	}
    
    // изминения шкалы серости рисунка
	$('#grayscale').click(function() {
		addFilter(0, new fabric.Image.filters.Grayscale());
	});

	// убирание белого цвета с рисунка
	$('#reoveWhite').click(function() {
		addFilter(1, new fabric.Image.filters.RemoveWhite({
			  threshold: 40,
			  distance: 140
		}));
	});

	// увеличение пикселей в изображении 
	$('#pixelate').click(function() {
		addFilter(2, new fabric.Image.filters.Pixelate({
			  blocksize: 4
		}));
	});

	// увеличить резкость изображении
	$('#sharpen').click(function() {
		addFilter(3, new fabric.Image.filters.Convolute({
        matrix: [  0, -1,  0,
                  -1,  5, -1,
                   0, -1,  0 ]
    	}));
	});

	// обрезание изображения по в кругу 
	$('#crop').click(function() {
		var img = canvas.getActiveObject();
		canvas.getActiveObject().clipTo = function (ctx) {
          ctx.arc(0, 0, img.width/2, 0, Math.PI * 2, true);
        };
        img.applyFilters(canvas.renderAll.bind(canvas));
	});

	$('#checkDownload').click(function() {
		Canvas2Image.saveAsPNG(canvas);
	});
	

	function addFilter(index, filtr) {
		var img = canvas.getActiveObject();
	     var obj = checkActivTools["checkActiv"+index];
	     if(obj === undefined || obj === false) {
	     	img.filters[index] = filtr;
	     	checkActivTools["checkActiv"+index] = true;	     	
	     } else {
	     	img.filters[index] = null;
	     	checkActivTools["checkActiv"+index] = false;	     	
	 	 }
  		// применяем фильтры и перерисовываем канвас после применения
		img.applyFilters(canvas.renderAll.bind(canvas));
	}





});
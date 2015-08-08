

<!DOCTYPE html>

<html>

    <head>

        <meta charset="utf-8">        

        <title>imgEditor</title>

        <link rel="stylesheet" href="css/bootstrap.min.css">

        <link rel="stylesheet" type="text/css" href="css/imgareaselect-default.css" />

        <script type="text/javascript" src="lib/jquery-2.1.0.js"></script>

        <script type="text/javascript" src="lib/fabric.js"></script>

        <script type="text/javascript" src="js/simpleRedactor.js"></script>

        <script type="text/javascript" src="lib/bootstrap.min.js"></script>

        

        </head>

        

    <body>



        <div class="navbar navbar-static-top">

            <nav class="navbar-inner" >

                <a class="brand span1 " ></a> 

                <a class="brand span3 " >Tools</a> 

                <a class="brand" >Url upload</a>

                <form class="navbar-form"  name="formName" method="POST" action="<?php $_SERVER['PHP_SELF']?>">

                    <input id="formValue" type="text" name="urlName" class="span6 search-query" value="" 

                    placeholder="Место для <<адекватной>> ссылки на картинку "/>

                    <input type="submit" value="Upload" name="upload" class="btn btn-success" id="upload" />

                    <input type="button" value="Refurbish Canvas" class="btn btn-warning"  id="Refurbish"  style="display:none"/>

                    <input type="button" value="Save changes" id="saveChanges" class="btn btn-success pull-right"  style="display:none"/>

                    <a href="downloadFile.php"><input type="button" id="download" value="download image"  class="btn btn-warning pull-right" style="display:none"  /></a>

                </form>

            </nav>            

        </div>

        <div class="navbar navbar-static-top">

            <div class="span3 ">

                <nav class="navbar-inner" >

                    <ul class="nav">

                        <li><a href="#" id="removeWhite" class="brand">Remove white</a></li><br>

                        <li><a href="#" id="grayscale" class="brand">Grayscale</a></li><br><br><br>

                        <li id="pix"><a href="#" id="pixelate" class="brand">Pixelate </a></li><div class="btn btn-success" style="display:none; float: left">+</div> <div class="btn btn-success" style="display:none; float: left; margin-left: 10px">-</div><br>

                        <li><a href="#" id="sharpen" class="brand">Sharpen</a></li><br>

                        <li><a href="#" id="sharpen" class="brand" style=" float: none"></a></li><br><br>

                        <li><a href="#" id="invert" class="brand" >Invert</a></li><br>

                        <li><a href="#" id="crop" class="brand">Crop Image</a></li><br>

                        <li><a href="#" id="sepia" class="brand">Sepia</a></li><br><br><br><br>

                        <li id="nois"><a href="#" id="noise" class="brand">Noise </a></li><div class="btn btn-success" style="display:none; float: left">+</div> <div class="btn btn-success" style="display:none; float: left; margin-left: 10px">-</div><br>

                        <li><a href="../../index.html" class="btn btn-warning " >Exit main Page</a></li>

                        

                    </ul>

                </nav>                

            </div>

            <div class="span9">

                <canvas id="canvas" style=" border:1px solid #c0c0c0;  " width="800" height="480" ></canvas>            

            </div>

        </div>                              

        

        <?php include'download.php'; ?>



    </body>

</html>


<?php
 
                if ( isset($_POST["urlImg"]) && !empty($_POST["urlImg"]) ) {    
                    // get the dataURL
                    $imageInfo = $_POST["urlImg"]; // Your method to get the data
                    $image = fopen($imageInfo, 'r');
                    
                    
                    if(!file_put_contents("img/fordownload.jpeg", $image)) {
                        echo'не удалось перезаписать картинку';
                    }
                                 
                } else {
                    // echo"убать";
                }
    

            if (isset($_POST['upload']) && !empty($_POST["urlName"]))
            {          
                $file = $_POST['urlName'];
                $newfile = 'img/download.jpeg';
                $check = copy($file, $newfile); 
                ?>
                <script>
                document.getElementById("upload").setAttribute("style","display:none");
                document.getElementById("Refurbish").setAttribute("style","display:block");
                document.getElementById("Refurbish").setAttribute("style","float:right");
                
                        alert("wait 10 second when you image has been upload and PUSH BUTTON REFURBISH CANVAS");
                </script>
                <?php
            }

 ?>
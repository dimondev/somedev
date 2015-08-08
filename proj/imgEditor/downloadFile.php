<?php
	$file = "img/fordownload.jpeg";            
    header('Content-Disposition:attachment; filename='.basename($file));
                header('Content-Type:application/octet-stream');
                header('Content-Length:'.filesize($file));
                readfile($file);    
 ?>
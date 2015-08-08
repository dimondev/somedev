<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$id = $_GET['id'];		
	$status = $_GET['status'];
	$time = date("Y-m-d H:i:s");

	if($id){
		if($status=='closed'){
			$query="UPDATE task SET status='$status', time_end='$time' WHERE id='$id'";
			$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		}else{
			$query="UPDATE task SET status='$status', time_update='$time' WHERE id='$id'";
			$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		}
		
	}

	
	

?>
<?php 
	require_once '../includes/db.php'; // The mysql database connection script
	$login = $_GET['login'];
	$password = $_GET['password'];
	$role = $_GET['role'];
	$password = md5($password);
	$query="INSERT INTO `user`( `login`, `password`, `role`) VALUES ('$login','$password','$role')";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	if(!$result){	
		echo "success";
	}


?>
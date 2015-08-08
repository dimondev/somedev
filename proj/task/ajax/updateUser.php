<?php 
require_once '../includes/db.php'; // The mysql database connection script
session_start();
if( $_SESSION['role'] == 'admin'){
	
	$login = $_GET['login'];
	$password = $_GET['password'];
	$role = $_GET['role'];

	// echo $password;
	if ($password) {
		$password = md5($password);
	}
	
	if($role && $password ){
		$query="UPDATE user SET role='$role', password='$password' WHERE login='$login'";
	}else{
		if($role){
			$query="UPDATE user SET role='$role' WHERE login='$login'";
		}else{			
			$query="UPDATE user SET password='$password' WHERE login='$login'";
		}
	}
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
	
}
?>
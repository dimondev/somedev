<?php 
require_once '../includes/db.php'; // The mysql database connection script
$login = $_GET['login'];
$password = $_GET['password'];
$password = md5($password);
$query="SELECT * FROM `user` WHERE `login` = '$login' AND `password` = '$password'";
$result = $mysqli->query($query)->fetch_assoc();

if($result != null){
	session_start();
	$_SESSION['login'] = $login;
	$_SESSION['role'] = $result['role'];
	echo 1;
}

?>


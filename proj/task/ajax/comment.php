<?php 
	require_once '../includes/db.php'; // The mysql database connection script
	session_start();

	$id = $_GET['id'];
	$text = $_GET['text'];
	$text =  mysql_escape_string($text);
	$login = $_SESSION['login'];
	$role = $_SESSION['role'];
	
	$query="INSERT INTO `comments`( `user`, `role`, `comment`, `task_number`) VALUES ('$login','$role','$text','$id')";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

?>
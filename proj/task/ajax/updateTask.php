<?php 
require_once '../includes/db.php'; // The mysql database connection script
session_start();
if(isset($_GET['id']) && $_SESSION['role'] == 'admin'){
	$id = $_GET['id'];	
	$name = $_GET['name'];
	$text =  $_GET['text'];
	$text =  mysql_escape_string($text);
	$prior = $_GET['prior'];
	$project = $_GET['project'];
	$user = $_GET['user'];
	$status = $_GET['status'];

	$query="UPDATE task SET name='$name', task_text='$text', priority='$prior', project='$project', status='$status', access='$user' WHERE id='$id'";
	// echo $query;
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
	
}
?>
<?php 

	require_once '../includes/db.php'; // The mysql database connection script
	$project = $_GET['project'];
	
	$query="INSERT INTO `project`( `name`) VALUES ('$project')";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
	
?>
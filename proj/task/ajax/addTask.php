<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$name = $_GET['name'];
	$name = mysql_escape_string($name);
	$text = $_GET['text'];
	$text =  mysql_escape_string($text);
	$prior = $_GET['prior'];
	$project = $_GET['project'];
	$user = $_GET['user'];
	$parent = $_GET['parent'];

if($parent){

	$query="INSERT INTO `task`( `name`, `task_text`, `priority`, `project`, `access`, `parent`) VALUES ('$name','$text','$prior','$project','$user',$parent)";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

}else{
	
	$query="INSERT INTO `task`( `name`, `task_text`, `priority`, `project`, `access`) VALUES ('$name','$text','$prior','$project','$user')";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

}


?>
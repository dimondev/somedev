<?php 
session_start();
if($_SESSION['login'] && $_SESSION['role']){
	$arr = array(
		0 => $_SESSION['role'],
		1 => $_SESSION['login']
	 );

	echo(json_encode($arr));
}

?>
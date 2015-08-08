<?php 
session_start();
if($_SESSION['login'] && $_SESSION['role']){
	if($_SESSION['role'] == "admin"){
		echo 1;
	}
}

?>
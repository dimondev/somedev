<?php 
session_start();
if($_SESSION['login'] && $_SESSION['role']){
	echo "success";
}

?>
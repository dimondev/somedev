<?php 
require_once '../includes/db.php'; // The mysql database connection script
session_start();

$id = $_GET['id'];
$role = $_SESSION['role'];
$login = $_SESSION['login'];
$parent = $_GET['parent'];

if($id != 'undefined'){	
	if($parent == 0){
		switch ($role) {
		    case "admin":
		        $query="SELECT * FROM `task` WHERE `id` = $id OR `parent` = $id";
		        break;
		    case "tester":
		        $query="SELECT * FROM `task` WHERE id = $id AND status IN ('done','verified','local verified') OR `parent` = $id";
		        break;
		    case "programmer":
		        $query="SELECT * FROM `task` WHERE id = $id AND status = 'open' OR `parent` = $id AND  `access` = '".$login."' ";
		        break;
		}
	}else{
		switch ($role) {
		    case "admin":
		        $query="SELECT * FROM `task` WHERE `id` = $parent OR `parent` = $parent";
		        break;
		    case "tester":
		        $query="SELECT * FROM `task` WHERE id = $parent AND status IN ('done','verified','local verified') OR `parent` = $parent";
		        break;
		    case "programmer":
		        $query="SELECT * FROM `task` WHERE id = $parent AND status = 'open' OR `parent` = $parent AND  `access` = '".$login."' ";
		        break;
		}
	}
	
}else{	
	switch ($role) {
	    case "admin":
	        $query="SELECT * FROM `task`";
	        break;
	    case "tester":
	        $query="SELECT * FROM `task` WHERE status IN ('done','verified','local verified')";
	        break;
	    case "programmer":
	        $query="SELECT * FROM `task` WHERE status = 'open' AND  `access` = '".$login."'";
	        break;
	}
}


$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();

if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);
?>
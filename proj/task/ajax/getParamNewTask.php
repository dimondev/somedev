<?php 
require_once '../includes/db.php'; // The mysql database connection script
session_start();
$role = $_SESSION['role'];

$query1="select name from prior ";
$result1 = $mysqli->query($query1) or die($mysqli->error.__LINE__);

$arr1 = array();
if($result1->num_rows > 0) {
	while($row1 = $result1->fetch_assoc()) {
		$arr1[] = $row1;	
	}
}

$query2="select name from project ";
$result2 = $mysqli->query($query2) or die($mysqli->error.__LINE__);

$arr2 = array();
if($result2->num_rows > 0) {
	while($row2 = $result2->fetch_assoc()) {
		$arr2[] = $row2;	
	}
}

$query3="select login from user ";
$result3 = $mysqli->query($query3) or die($mysqli->error.__LINE__);

$arr3 = array();
if($result3->num_rows > 0) {
	while($row3 = $result3->fetch_assoc()) {
		$arr3[] = $row3;	
	}
}

if($role == "admin"){
	$query4="select name from status ";
}else{
	$query4="select name from status WHERE id = 4";
}

switch ($role) {
    case "admin":
        $query4="select name from status WHERE id = 1 or id = 3";
        break;
    case "tester":
        $query4="select name from status WHERE id = 1 or id = 2 or id = 5";
        break;
    case "programmer":
        $query4="select name from status WHERE id = 4";
        break;
}

$result4 = $mysqli->query($query4) or die($mysqli->error.__LINE__);

$arr4 = array();
if($result4->num_rows > 0) {
	while($row4 = $result4->fetch_assoc()) {
		$arr4[] = $row4;	
	}
}

$arr = array(
    0 	 => json_encode($arr1),
    1    => json_encode($arr2),
    2    => json_encode($arr3),
    3    => json_encode($arr4)
    );


print_r(json_encode($arr));


?>
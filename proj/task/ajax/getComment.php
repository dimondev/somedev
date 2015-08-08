<?php 
require_once '../includes/db.php'; // The mysql database connection script
$id = $_GET['id'];
$query="SELECT * FROM comments WHERE `task_number` = $id";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}

# JSON-encode the response
echo json_encode($arr);
?>
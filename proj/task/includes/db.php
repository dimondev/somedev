<?php 
$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'taskmanager';
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// if (!$mysqli->set_charset("utf8")) {
//     print_r("Ошибка при загрузке набора символов utf8: %s\n", $mysqli->error);
// } else {
//     print_r("Текущий набор символов: %s\n", $mysqli->character_set_name());
// }
?>

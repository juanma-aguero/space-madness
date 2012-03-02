<?php
include "lib/fileAccess.php";

$username = $_GET['username'];
$points = $_GET['points'];

$rank = DataBase::savePoints($username, $points);

if( is_numeric($rank) ){
	echo $rank;
}else{
	echo "OK";
}


?>
<?php
    //get post parameter from javascript
    //$data = json_decode(file_get_contents("php://input"));
	//get action
	//$action = mysql_real_escape_string($data->action);
    
	//connect to database
    $con = @mysqli_connect("localhost","root", "usbw", "unleashed")
	or die("failed");
	
	//create json return object
	$json = array();
	
	//get monthly slaes from database
	//if($action == 'getMonthlySales'){
	    //run query in database	
	    $result = mysqli_query($con,"SELECT Order_Date as 'day', SUM(Sales) as 'sales' from sale GROUP BY Order_Date ORDER BY Order_Date");
		while($r = mysqli_fetch_array($result)){
			$json[] = array(@strtotime($r['day'])*1000,$r['sales']);
		}
		//set number of rows
		//$count = mysqli_num_rows($result);
		
		//fecth each row into json return object
		//if($count >= 1){
		//	while($row = mysqli_fetch_array($result)){
		//		$json[] = $row;
				
		//	}
			
		//}	
		
	//}
	//return sql result as json
	echo json_encode($json, JSON_NUMERIC_CHECK);
?>
<?php
    //get post parameter from javascript
    $data = json_decode(file_get_contents("php://input"));
	//get action
	$action = mysql_real_escape_string($data->action);
    
	//connect to database
    $con = @mysqli_connect("localhost","root", "usbw", "unleashed")
	or die("failed");
	
	//create json return object
	$json = array();
	
	//get monthly slaes from database
	if($action == 'getMonthlySales'){
	    //run query in database	
	    $result = mysqli_query($con,"select sum(Sales) as 'Total', Month(Order_Date) as 'Month' from sale Group by Month(Order_Date)");
		
		//set number of rows
		$count = mysqli_num_rows($result);
		
		//fecth each row into json return object
		if($count >= 1){
			while($row = mysqli_fetch_array($result)){
				$json[] = $row;
				
			}
			
		}	
		
	}
	//return sql result as json
	echo json_encode($json);
?>
<?php
	
	include('./_ddbb.php');

	$isDevelopment = _ENV_ISLOCAL_; //flags if environment is 'localhost' or not

	//Objects to return
	$response = array();
	$error = null;
	$trace = array();
	$trace['log'] = array();
	
	/**
	* Returns SQL query for this service
	* @private
	*/
	function _getSQLQuery($postParams=null)
	{
		return "SELECT `_id`, `key`, `title`, `genre`, `year`, `rating` FROM `movies`;";
	}

	function _parseResultSets(&$response, &$trace, &$error, $results, $params)
	{

		if ($results)
		{
			$nRows = mysql_num_rows($results);
			array_push($trace['log'], "[TRACE] # results: ".$nRows);
			if ($nRows >= 1)
			{
			
				$data = array();

				while($row = mysql_fetch_assoc($results)){

					array_push($data, $row);
				}

				$response['data'] = $data;
			}
			else
			{
				$error = "MOVIES_NOT_FOUND";
			}
		}
	}


	$ddbb = new _DDBB();
	
	//CONNECT TO DDBB
	if ($ddbb->createConnection($trace))
	{		
		_parseResultSets($response, $trace, $error, $ddbb->executeQuery(_getSQLQuery(), $trace));
		$ddbb->closeConnection();
	}
	else
	{
		$error = "NO_CONNECTION";
	}
		

	//BUILD RESPONSE
	//IF there was an error
	if (!empty($error))
	{
		$response['error'] = $error;
	}

	//IF is development
	if ($isDevelopment)
	{
		$response['trace'] = $trace;
	}

	//SET result code
	$response['code'] = !empty($error)?'error':'ok';

	//PRINT result as JSON
	header('Content-type: application/json');
	print_r (json_encode($response));
	exit();
?>
<?php
	
	include('./_ddbb.php');

	$isDevelopment = _ENV_ISLOCAL_; //flags if environment is 'localhost' or not

	//Objects to return
	$response = array();
	$error = null;
	$trace = array();
	$trace['log'] = array();
	
	/**
	* Retrieves POST body fields.
	* Returned array contains:
	* - {userName} :: Username (email)
	* - {userPass} :: Password
	* - {userRemember} :: Rembember login flag
	* - {appName} :: Application name
	*
	* param $debug {Boolean} Is debugmode?
	* param $trace {Array} For debugmode only
	* return postParams {Array}
	* @private
	*/
	function _getPOSTInformation($debug=0, &$trace)
	{
		$postParams = array();
		//Get POST information
		if ($debug)
		{
			$postParams['userName'] = $_POST["email"];
			$postParams['userPass'] = $_POST["password"];
			$postParams['appName'] = $_POST["appName"];
		}
		else
		{
			$postData = file_get_contents("php://input");
			$postData = json_decode($postData);
			$postParams['userName'] = $postData->email;
			$postParams['userPass'] = $postData->password;
			$postParams['appName'] = $postData->appName;
		}

		$trace['postParams'] = $postParams;
		//$postParams['userName'] = mysql_real_escape_string($postParams['userName']);
		//$postParams['userPass'] = mysql_real_escape_string($postParams['userPass']);

		return $postParams;
	}
	
	
	/**
	* Returns SQL query for this service
	* param $postParams {Array} POST params body
	* return {String}
	* @private
	*/
	function _getSQLQuery($postParams=null)
	{
		return "SELECT * FROM users u LEFT JOIN permissions p ON u.rights = p.perm_key WHERE ((u.email = '".$postParams['userName']."') AND (u.password = '".$postParams['userPass']."'));";
	}

	/**
	* Parses {$key} format to add permission flag to $response.data
	* param $data {Array} .permissions
	* param $matches {Array} Permission pattern matches
	* @private
	*/
	function _addDataPermission(&$data=null, $matches, $value)
	{
		if (!empty($matches))
		{
			//Divide word elements of current key match
			preg_match("/(.+)\_{1}(.+)/", $matches[1], $parts);
			if (!empty($parts))
			{
				//Joint parts into single camelized text
				$camelcase = $parts[1].ucfirst($parts[2]);
			}

			//Add permission
			if (!empty($camelcase))
			{
				$data['permissions'][$camelcase] = ($value == "1")?true:false;							
			}
			else
			{
				if ($matches[1] !== 'limit')
				{
					$data['permissions'][$matches[1]] = ($value == "1")?true:false;
				}
				else
				{
					$data['permissions'][$matches[1]] = intval($value);	
				}
			}
		}
	}

	/**
	* Evaluates if current {$key} is a persmission flag for current application
	* param $appName {String} Application name
	* param $key {String} Record column key
	* return {Array} Pattern matches
	* @private
	*/
	function _isPermission($appName='', $key='')
	{
		$matches = array();
		preg_match("/com_wolfchamane_".$appName."_(.+)/", $key, $matches);
		return $matches;

	}

	function _evalRowKey(&$data=null, $appName='', $key='', $value='')
	{
		//If is a permission
		$matchPermission = _isPermission($appName, $key);
		if (!empty($matchPermission))
		{
			_addDataPermission($data, $matchPermission, $value);
		}
		else
		{
			//If not, add registry
			if (!preg_match("/com.wolfchamane_.+/", $key))
			{
				$data[$key] = $value;
			}
		}
	}

	function _removeRecords(&$data=array()){
		$recordsToRemove = array('perm_key', 'rights', 'password');
		
		foreach($recordsToRemove as $record){
			if (isset($data[$record]))
			{
				unset($data[$record]);
				//$data = array_values($data);
			}
		}
	}

	
	function _parseResultSets(&$response, &$trace, &$error, $results, $params)
	{

		if ($results)
		{
			$nRows = mysql_num_rows($results);
			array_push($trace['log'], "[TRACE] # results: ".$nRows);
			if ($nRows == 1)
			{
			
				$row = mysql_fetch_assoc($results);
				$data = array();
				$data['permissions'] = array();
			
				foreach($row as $key => $value)
				{
					_evalRowKey($data, $params['appName'], $key, $value);
				}

				_removeRecords($data);

				$response['data'] = $data;
			}
			else
			{
				$error = "USER_NOT_FOUND";
			}
		}
	}



	$params = _getPOSTInformation($isDevelopment, $trace);
	$ddbb = new _DDBB();
	
	//CONNECT TO DDBB
	if ($ddbb->createConnection($trace))
	{		
		_parseResultSets($response, $trace, $error, $ddbb->executeQuery(_getSQLQuery($params), $trace), $params);
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
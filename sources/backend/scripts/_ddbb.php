<?php
	/**
	* Interface for DDBB connection
	* @author Arturo Martínez <arturo.mart.diaz@gmail.com>
	* @since 2015/06/27
	* @version 1.0.00
	*/
	class _DDBB {

		/**
		* Stores current connection
		* @property conn
		* @type     {Connection|null}
		*/
		private static $conn	= null;
		/**
		* Stores DDBB url end point
		* @property url
		* @type     {String}
		* @NOTICE: DO NOT MODIFY // GENERATED WITH GRUNT
		*/
		private static $url		= '_ENV_HOST_';
		/**
		* Stores DDBB username
		* @property usr
		* @type     {String}
		* @NOTICE: DO NOT MODIFY // GENERATED WITH GRUNT
		*/
		private static $usr		= '_ENV_USR_';
		/**
		* Stores DDBB user password
		* @property pwd
		* @type     {String}
		* @NOTICE: DO NOT MODIFY // GENERATED WITH GRUNT
		*/
		private static $pwd		= '_ENV_PWD_';
		/**
		* Stores DDBB data origin
		* @property org
		* @type     {String}
		* @NOTICE: DO NOT MODIFY // GENERATED WITH GRUNT
		*/
		private static $org		= '_ENV_ORG_';

		/**
		* Creates a connection to DDBB
		* param $trace {Array|null} Log trace
		* return {Connection|false}
		*/
		public function createConnection (&$trace=null){
			array_push($trace['log'], "[TRACE] Connecting to [".self::$usr.":".self::$pwd."]@[".self::$url."/".self::$org."]");
			self::$conn = mysql_connect(self::$url, self::$usr, self::$pwd);
			if (self::$conn){
				array_push($trace['log'], "[TRACE] Connected!");
				mysql_select_db(self::$org, self::$conn);
				mysql_query("SET NAMES 'utf8'", self::$conn);
			}

			return self::$conn;
		}

		/**
		* Closes current connection
		* return {Boolean}
		*/
		public function closeConnection (){
			return mysql_close(self::$conn);
		}

		/**
		* Executes a query on current connection
		* param $query {String} Query to be executed
		* return {ResultSet|false|null} Query results
		*/
		public function executeQuery ($query="", &$trace){
			array_push($trace['log'], "[TRACE] Quering: \"".$query."\"");
			return mysql_query($query, self::$conn);			
		}

	}
?>
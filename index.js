#!/usr/bin/env node

let fs = require('fs');
let os = require('os');
let npm = require('./package.json');
let exec = require('child_process').exec;
let program = require('commander');

//   _____   ______   _______   _______   _____   _   _    _____    _____
//  / ____| |  ____| |__   __| |__   __| |_   _| | \ | |  / ____|  / ____|
// | (___   | |__       | |       | |      | |   |  \| | | |  __  | (___
//  \___ \  |  __|      | |       | |      | |   | . ` | | | |_ |  \___ \
//  ____) | | |____     | |       | |     _| |_  | |\  | | |__| |  ____) |
// |_____/  |______|    |_|       |_|    |_____| |_| \_|  \_____| |_____/
//

//
//	The CLI options for this app.
//
program
	.version(npm.version)
	.parse(process.argv);

//
//	React when the user needs help
//
program.on('--help', function() {

	//
	//	Just add an empty line at the end of the help to make the text more
	//	clear to the user
	//
	console.log("");

});

//
//	Pass the user input to the commander module
//
program.parse(process.argv);

//	 __  __              _____   _   _
//	|  \/  |     /\     |_   _| | \ | |
//	| \  / |    /  \      | |   |  \| |
//	| |\/| |   / /\ \     | |   | . ` |
//	| |  | |  / ____ \   _| |_  | |\  |
//	|_|  |_| /_/    \_\ |_____| |_| \_|
//

//
//	1. 	Create a container that will hold all the data for the chained
//		promises.
//
let container = {};

//
//	2.	Since we need root privileges, we need to check for that
//
check_if_we_are_root(container)
	.then(function(container){

		//
		//	1.	Make sure systemD is present
		//
		return check_if_systemd_is_present(container);

	}).then(function(container){

		return check_if_package_is_present(container);

	}).then(function(container){

		return read_necessary_data(container);

	}).then(function(container){

		return check_if_something_is_missing(container);

	}).then(function(container){

		return get_os_settings(container);

	}).then(function(container){

		return create_the_service_file(container);

	}).then(function(container){

		return save_the_file(container);

	}).then(function(container){

		return reaload_systemd_daemon(container);

	}).then(function(container){

		return start_the_new_service(container);

	}).then(function(container){

		return enable_autostart(container);

	}).then(function(container){

		//
		//	1.	Let the user know all went well
		//
		console.log("\n");
		console.log("\tDone!");
		console.log("\n");

		//
		//	->	Exit the app
		//
		process.exit(0);

	}).catch(function(error){

		//
		//	1.	Show the error message
		//
		console.log("\n");
		console.log(error.message);
		console.log("\n");

		//
		//	-> Exit the app
		//
		process.exit(0);

	});

//	 _____    _____     ____    __  __   _____    _____   ______    _____
//	|  __ \  |  __ \   / __ \  |  \/  | |_   _|  / ____| |  ____|  / ____|
//	| |__) | | |__) | | |  | | | \  / |   | |   | (___   | |__    | (___
//	|  ___/  |  _  /  | |  | | | |\/| |   | |    \___ \  |  __|    \___ \
//	| |      | | \ \  | |__| | | |  | |  _| |_   ____) | | |____   ____) |
//	|_|      |_|  \_\  \____/  |_|  |_| |_____| |_____/  |______| |_____/
//

//
//	Before we do anything we need to make sure this app is running as root.
//
//	We need root to be able to:
//
//	- save the file in to the systemD directory
//	- Restart systemD
//	- Start the new service
//	- Mark it as bootable
//
function check_if_we_are_root(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Check if the SystemD directory exists
		//
		let username = os.userInfo().username;

		//
		//	2.	Warn the user that the directory is not present
		//
		if(username != "root")
		{
			return reject(new Error("Run the command as root"));
		}

		//
		//	-> Move to the next chain
		//
		return resolve(container);

	});
}

//
//	Make sure the systemD folder exists and is preset so we can save our
//	config file.
//
function check_if_systemd_is_present(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Check if the SystemD directory exists
		//
		let is_present = fs.existsSync("/etc/systemd/system");

		//
		//	2.	Warn the user that the directory is not present
		//
		if(!is_present)
		{
			return reject(new Error("SystemD directory not found"));
		}

		//
		//	-> Move to the next chain
		//
		return resolve(container);

	});
}

//
//	Make sure package.json file exists
//
function check_if_package_is_present(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Check if the package.json file exists
		//
		let is_present = fs.existsSync("package.json");

		//
		//	2.	Warn the user that the package.json is missing
		//
		if(!is_present)
		{
			return reject(new Error("package.json is missing"));
		}

		//
		//	-> Move to the next chain
		//
		return resolve(container);

	});
}

//
//	Get all the necessary data from the project folder so we can create
//	the correct config file.
//
function read_necessary_data(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	Open the app.json file.
		//
		fs.readFile('package.json', 'utf8', function(error, data) {

			//
			//	1.	Display Error if any
			//
			if(error)
			{
				return reject(new Error(error.message));
			}

			//
			//	2.	Convert the content of the file in to a JS Object
			//
			let parsed = JSON.parse(data);

			//
			//	3.	Prepare the variables that will hold the data
			//
			let description = "";
			let documentation = "";

			//
			//	4.	Get the name if it is possible
			//
			if(parsed.name)
			{
				description = parsed.name;
			}

			//
			//	5.	Get the repo URL if possible
			//
			if(parsed.repository)
			{
				//
				//	1.	Make sure the URL repo is present also
				//
				if(parsed.repository.url)
				{
					documentation = parsed.repository.url;
				}
			}

			//
			//	6.	Add the data to the container
			//
			container.service_data = {
				name: description,
				description,
				documentation
			}

			//
			//	-> Move to the next chain
			//
			return resolve(container);

		});
	});
}

//
//	Generate the right error if something is missing
//
function check_if_something_is_missing(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Crate the array that will hold all the errors
		//
		let errors = [];

		if(!container.service_data.name)
		{
			errors.push(new Error("Name is missing"));
		}

		if(!container.service_data.description)
		{
			errors.push(new Error("Description is missing"));
		}

		if(!container.service_data.documentation)
		{
			errors.push(new Error("Repo URL is missing"));
		}

		//
		//	2.	Check if we got some errors
		//
		if(errors.length > 0)
		{
			//
			//	1.	Combine all the errors in to one string
			//
			let error_message = errors.join("\n");

			//
			//	->	Stop everything and let the user know what is missing
			//
			return reject(new Error(error_message));
		}

		//
		//	-> Move to the next chain
		//
		return resolve(container);

	});
}

//
//	Get OS specific settings
//
function get_os_settings(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1. Get the path to the project
		//
		container.service_data.cwd = process.cwd();

		//
		//	2.	Get the user name of the loged in user
		//
		container.service_data.user = os.userInfo().username;

		//
		//	-> Move to the next chain
		//
		return resolve(container);

	});
}

//
//	After we have all the data we can create the config file for the service.
//
function create_the_service_file(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	An array where I'm going to store the whole file before saving it
		//
		let file = [];

		//
		//	2.	Add data to the array, which in the end will be used to create
		//		the .service file
		//
		file.push("[Unit]");
		file.push("Description=" + container.service_data.description);
		file.push("Documentation=" + container.service_data.documentation);
		file.push("After=network.target");

		file.push("");

		file.push("[Service]");
		file.push("EnvironmentFile=" + container.service_data.cwd + "/.env");
		file.push("Type=simple");
		file.push("User=" + container.service_data.user);
		file.push("Group=" + container.service_data.user);
		file.push("WorkingDirectory=" + container.service_data.cwd);
		file.push("ExecStart=/usr/bin/node workers/server");
		file.push("StandardOutput=journal");
		file.push("StandardError=journal");
		file.push("SyslogIdentifier=" + container.service_data.name);
		file.push("Restart=on-failure");
		file.push("RestartSec=3");
		file.push("KillMode=process");
		file.push("ExecReload=/bin/kill -HUP $MAINPID");

		file.push("");

		file.push("[Install]");
		file.push("WantedBy=multi-user.target");

		//
		//	Join each element of the array in to one big file where each element
		//	is in its own line
		//
		let service_file = file.join("\n");

		//
		//	4.	Save the file in to memory
		//
		container.service_file = service_file;

		//
		//	-> Move to the next chain
		//
		return resolve(container);

	});

}

//
//	Save the config file in the right place
//
function save_the_file(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Create the path for the config file
		//
		let file = "/etc/systemd/system/"
				   + container.service_data.name
				   + ".service";

		//
		//	2.	Save the service file
		//
		fs.writeFile(file, container.service_file, function(error) {

			//
			//	1.	Display Error if any
			//
			if(error)
			{
				return reject(new Error(error.message));
			}

			//
			//	-> Move to the next chain
			//
			return resolve(container);

		});

	});
}

//
//	Tell SystemD to reload and get any new service file
//
function reaload_systemd_daemon(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Create the command to tell SystemD to reload the config files.
		//
		let cmd = 'systemctl daemon-reload';

		//
		//	2.	Execute the command
		//
		exec(cmd, function(error, stdout, stderr) {

			//
			//	1.	Make sure we show any error
			//
			if(error)
			{
				return reject(new Error(error))
			}

			//
			//	-> Move to the next chain
			//
			return resolve(container);

		});

	});
}

//
//	Start the newly created site
//
function start_the_new_service(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Create the command that will start the new services that
		//		 we made.
		//
		let cmd = 'systemctl start ' + container.service_data.name;

		//
		//	2.	Execute the command.
		//
		exec(cmd, function(error, stdout, stderr) {

			//
			//	1.	Make sure we show any error
			//
			if(error)
			{
				return reject(new Error(error))
			}

			//
			//	-> Move to the next chain
			//
			return resolve(container);

		});

	});
}

//
//	Tell SystemD to start our server every time the system boots
//
function enable_autostart(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Create the command that will enable autostart.
		//
		let cmd = 'systemctl enable ' + container.service_data.name;

		//
		//	2.	Execute the command.
		//
		exec(cmd, function(error, stdout, stderr) {

			//
			//	1.	Make sure we show any error
			//
			if(error)
			{
				return reject(new Error(error))
			}

			//
			//	-> Move to the next chain
			//
			return resolve(container);

		});

	});
}
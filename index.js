#!/usr/bin/env node

let fs = require('fs');
let os = require('os');

//
//	Check if the SystemD directory exists
//
let is_systemd = fs.existsSync("/etc/systemd/system");

//
//	Warn the user that the directory is not present
//
if(!is_systemd)
{
	return console.log("SystemD directory not found")
}

//
//	Open the app.json file.
//
fs.readFile('package.json', 'utf8', function(err, data) {

	//
	//	1.	Display Error if any
	//
	err && console.log(err.message)

	//
	//	2.	Convert the content of the file in to a JS Object
	//
	let parsed = JSON.parse(data);

	//
	//	3.	Get all the necessary data
	//
	let description = parsed.name;
	let documentation = parsed.repository.url;
	let cwd = process.cwd();
	let user = os.userInfo().username;

	//
	//	4.	An array where I'm going to store the whole file before saving it
	//
	let file = [];

	//
	//	5.	Add data to the array, which in the end will be used to create
	//		the .service file
	//
	file.push("[Unit]");
	file.push("Description=" + description);
	file.push("Documentation=" + documentation);
	file.push("After=network.target");

	file.push("");

	file.push("[Service]");
	file.push("EnvironmentFile=" + cwd + "/.emv");
	file.push("Type=simple");
	file.push("User=" + user);
	file.push("Group=" + user);
	file.push("WorkingDirectory=" + cwd);
	file.push("ExecStart=/usr/bin/node workers/server");
	file.push("StandardOutput=journal");
	file.push("StandardError=journal");
	file.push("SyslogIdentifier=" + parsed.name);
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
	//	6.	Save the data in to the .env file.
	//
	fs.writeFile(parsed.name + ".service", service_file, (error) => {

		//
		//	1.	Display Error if any
		//
		if(error)
		{
			console.log(error.message);
		}

		console.log("");

		//
		//	Show the user what happened
		//
		console.log("\tThe Service file was created.");

		console.log("");

		//
		//	Tell the user what to do next
		//
		console.log("\t1. sudo cp " + parsed.name + ".service /etc/systemd/system");
		console.log("\t2. sudo systemctl daemon-reload");
		console.log("\t3. sudo systemctl start " + parsed.name);
		console.log("\t4. sudo systemctl enable " + parsed.name);

		console.log("");
	});

});




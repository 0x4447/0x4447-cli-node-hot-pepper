# 🌶 Hot Pepper

We created this tool to quickly add a NodeJS server to SystemD by creating a custom configuration file based on the content of the `package.json` file and the location in which the CLI was executed.

We prefer to use SystemD because it is build in to Debian, it takes care of the life time of the process, and it uses less resources than other solutions on the market. Thus you get more CPU and RAM for your app. Not to mention that all the server will be set to auto start, this way when you start your linux box everything is there and waiting.

Plus you'll save time by not creating a `.service` by hand for all the dozens of micro services a project might have.

# How to Install

```
] sudo npm install -g @0x4447/hotpepper
```

# How to Use

```
] sudo hotpepper
```

# Where to get Help

```
] hotpepper -h
```

# What to Expect

Run the command in the directory where you project is located, and if all the necessary data is present in the `package.json` file, the tool will

- generate a `.service` file which will be saved in the right SystemD directory.
- Then the app will force SystemD to reload the service files.
- it will then start your server.
- finally it will tell SystemD to start your server every time the system boots.

# Example of a .service file

```
[Unit]
Description=example.com
Documentation=https://github.com/user/example.com
After=network.target

[Service]
EnvironmentFile=/home/admin/example.com/.env
Type=simple
User=admin
Group=admin
WorkingDirectory=/home/admin/example.com
ExecStart=/usr/bin/node bin/server
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=example.com
Restart=on-failure
RestartSec=3
KillMode=process
ExecReload=/bin/kill -HUP $MAINPID

[Install]
WantedBy=multi-user.target
```

Once complete this app will let you know if the process was successful or not.

# Where are the logs?

To see the logs of your servers, just run this command: `sudo tail -f /var/log/syslog`. Each log entry have the name of the project attached to it.

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where you'll find additional resources you might find useful or interesting.

## Sponsor 🎊

This project is brought to you by 0x4447 LLC, a software company specializing in building custom solutions on top of AWS. Follow this link to learn more: https://0x4447.com. Alternatively, send an email to [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.).

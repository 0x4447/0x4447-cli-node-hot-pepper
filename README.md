# 🌶 Hot Pepper

If you work with NodeJS projects and prefer to run them on a Linux box using SystemD as the process manager. Then this small project will help you save a lot of time by creating the `.service` file for you, based on the content of the `package.json` file and the location in which the CLI was executed.

# How to Install

```
] sudo npm install -g @0x4447/hotpepper
```

# How to Use

```
] sudo hotpepper
```

# What to Expect

Run the command in the directory where you project is located, and if all the necessary data is present in the `package.json` file, the tool will

- generate a .service file which will be saved in the right systemD directory.
- Then it will force systemD to reload the service files.
- it will the start your server.
- finally it will tell systemD to start your server every time the system boots.

# Example .service file

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

# Benefits of using SystemD

When you work on a project that has many micro-services you run in a situation that you have to start many servers just to work on a single one. Using SystemD you know that all the necessary servers are always running in the background. Another key benefit is that this servers will start automatically when you restart the system. So know you don't have to spend time starting everything all over gain.

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where we have additional resources that you might find useful or interesting.

## Sponsor 🎊

This project is brought to you by 0x4447 LLC, a software company specializing in build custom solutions on top of AWS. Find out more by following this link: https://0x4447.com or, say [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.).

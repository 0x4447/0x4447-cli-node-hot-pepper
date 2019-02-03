# 🌶 Hot Pepper

We created Hot Pepper to quickly add a NodeJS server to SystemD by setting up a custom configuration file based on the content of the `package.json` file and the location in which the CLI was executed.

We prefer to use SystemD, because it's built into Debian, takes care of the lifetime of the process, and uses fewer resources than other solutions on today's market. Thus, you get more CPU and RAM for your app. Not to mention that the entire server will be set to Auto Start. In this way, everything's there and waiting when you start your Linux box.

In addition, you'll save time because you won't be hand-creating a `.service` for the dozens of micro services within a given project.

# How to install

```
] sudo npm install -g @0x4447/hotpepper
```

# How to use

```
] sudo hotpepper
```

# Where to get help

```
] hotpepper -h
```

# What to Expect

Run the command in the directory that contains your project. If all necessary data is present in the `package.json` file, the tool...

- Generates a `.service` file saved in the correct SystemD directory
- The app forces SystemD to reload the service files
- The app starts your server
- The app tells SystemD to start your server every time the system boots

# Sample of a .service file:

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

Once complete, the app lets you know whether the process was successful.

# Where are the logs?

Run this command to view the server logs: `sudo tail -f /var/log/syslog`. Each log entry has the name of the project attached.

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), which contains additional resources you might find useful or interesting.

## Sponsor 🎊

This project is brought to you by 0x4447 LLC, a software company specializing in building custom solutions on top of AWS. Follow this link to learn more: https://0x4447.com. Alternatively, send an email to [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.).

# toSystemD

If you work with NodeJS projects and prefer to run them on a Linux box using SystemD as the process manager. Then this small project will help you save a lot of time by creating the `.service` file for you, based on the content of the `package.json` file and the location in which the CLI was executed.

# How to run

Run the `tosystemd` command in the directory where you project is located, and if all the necessary data is present in the `package.json` file, the tool will

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

When you work on a project that has many micro-services you run in a situation that you have to start many servers just to work on a single one. Using SystemD I know that all the necessary servers are always running in the background. Another key benefit is that this servers will start automatically when you restart the system. So know you don't have to spend time starting everything all over gain.

# The End

If you've enjoyed this article/project, please consider giving it a 🌟 or donate.

- [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/gattidavid/25)
- [![Star on GitHub](https://img.shields.io/github/stars/davidgatti/toSystemD.svg?style=social)](https://github.com/davidgatti/toSystemD/stargazers)
- [![Watch on GitHub](https://img.shields.io/github/watchers/davidgatti/toSystemD.svg?style=social)](https://github.com/davidgatti/toSystemD/watchers)

Also check out my [GitHub account](https://github.com/davidgatti), where I have other articles and apps that you might find interesting.

## Where to follow

You can follow me on social media 🐙😇, at the following locations:

- [GitHub](https://github.com/davidgatti)
- [Twitter](https://twitter.com/dawidgatti)
- [Instagram](https://www.instagram.com/gattidavid/)

## More about me

I don’t only live on GitHub, I try to do many things not to get bored 🙃. To learn more about me, you can visit the following links:

- [Podcasts](http://david.gatti.pl/podcasts)
- [Articles](http://david.gatti.pl/articles)
- [Technical Articles](http://david.gatti.pl/technical_articles)
- [Software Projects](http://david.gatti.pl/software_projects)
- [Hardware Projects](http://david.gatti.pl/hardware_projects)

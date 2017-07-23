# toSystemD

If you work with NodeJS projects and prefer to run them on a Linux box using SystemD as the process manager. Then this small project will help you save time by creating the .service file for you based on the content of the `package.json` file and the location in which the CLI was executed.

# How to run

Run the `tosystemd` command in the directory where you project is located, and in the end you'll get a new file with the correct SystemD configuration, for example:

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
WorkingDirectory=/home/admin/example.com/david.gatti.pl
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

This App will also output all the commands that you need to run to make the service working.

# The End

If you've enjoyed this article/project, please consider giving it a 🌟 or donate.

- [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/gattidavid/25)
- [![Star on GitHub](https://img.shields.io/github/stars/davidgatti/toSystemD.svg?style=social)](https://github.com/davidgatti/toSystemD/stargazers)
- [![Watch on GitHub](https://img.shields.io/github/watchers/davidgatti/toSystemD.svg?style=social)](https://github.com/davidgatti/toSystemD/watchers)

Also check out my [GitHub account](https://github.com/davidgatti), where I have other articles and apps that you might find interesting.

---

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

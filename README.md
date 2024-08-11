
# LeNotes

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/plaseo/lenotes?include_prereleases)](https://img.shields.io/github/v/release/plaseo/lenotes?include_prereleases)
[![GitHub last commit](https://img.shields.io/github/last-commit/plaseo/lenotes)](https://img.shields.io/github/last-commit/plaseo/lenotes)
[![GitHub issues](https://img.shields.io/github/issues-raw/plaseo/lenotes)](https://img.shields.io/github/issues-raw/plaseo/lenotes)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/plaseo/lenotes)](https://img.shields.io/github/issues-pr/plaseo/lenotes)
[![GitHub](https://img.shields.io/github/license/plaseo/lenotes)](https://img.shields.io/github/license/plaseo/lenotes)

Capstone project for a fullstack developer program
An awesome note-taking applicatione!

-Spring Boot back-end <br/>
-Spring Authentication implemented with Okta's API
-React front-end <br/>

![Demo Preview](https://raw.githubusercontent.com/plaseo/lenotes/main/app/src/lenotesScfreen.png)

# Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

# Installation
> Create a developer account at:  
https://developer.okta.com  
Install the Octa CLI:
https://cli.okta.com/   
This requires MySQL installed but you can change the driver to H2

1. Clone repo:
```shell
git clone https://github.com/plaseo/lenotes
```
2. Login to Okta CLI and create an app:
```shell
okta login
okta apps create
```

3. Create secrets.properties in root of project   
Make sure to update with your own values:
```shell
okta.oauth2.issuer=https\://"my.okta.url"/oauth2/default
okta.oauth2.client-id="myOktaClientID"
okta.oauth2.client-secret=-"myOktaClientSecret"
spring.datasource.url= jdbc:mysql://localhost:3306/"mySQLDatabase"
spring.datasource.username= root
spring.datasource.password= "mySQLPassword"
```
# Usage
```shell
./mvnw spring-boot:run -Pprod
```
> If browser doesn't open, navigate to:
http://localhost:8080
You can login with your Okta dev account or create a new one

# Contribute
Pull requests welcome! </br>
(I'd be giddy if I got a real life pull reqest)

# License
[GPL-3.0 license](./LICENSE)
# Mifos Self Service App

## Getting started

Clone the project:

    $ git clone https://github.com/gauravsaini03/self-service.git

Install dependencies:
Globally make sure you have the following node v8.9.4 this comes with npm 5.5.1 or above then run commmand below
For exampla Do this by installing npm using nvm
    $ nvm install v8.9.4
   
Make sure you are running npm v8.9.4 ( you might want to run command below to be sure)
    $ nvm use 8.9.4 
    $ nvm alias default 8.9.4

Once you are sure then run command below to globally install gulp-cli 
    $ npm install -g gulp-cli 

CD into the root of the repo
### Then get into the root of the project and run the following commands


    $ cd self-service

Make sure there is no folder called node_modules and no file called package-lock.json (delete them)
### Then run the following command to install npm in the root of the directory

    $ npm install

### Install npm gulp cli in the folder by running command below 
    $ npm install --save-dev gulp


Make sure that you have '''ruby''' installed (if not goto https://www.ruby-lang.org/en/documentation/installation/ ).
You can then install gem 'sass'

    $ sudo gem install sass

Run development web-server:

    $ gulp serve

## Features

* AngularJS
* Angular UI Router
* Angular Material
* Sass styles
* Gulp build
* Stylish, clean, responsive layout with original design
* BrowserSync for the ease of development

## Deploy to Github pages  

    $ gulp build
    $ gulp deploy

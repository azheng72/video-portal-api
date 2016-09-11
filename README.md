# Crossover Video Portal backend
This is the backend API code that needs to be consumed by front-end applications. 

## All front-end related files are located in ```/client``` folder.

## Front-end application introduction
This is a single page app that is developed mainly base on AngularJS 1, Masonry.js, and Bootstrap. 

* User may need to login to view the contents. Authenticated user will see video listings on index page. 
 
* The three default ```username``` are ```'ali'```, ```'tom'```, and ```'harry'```, with the same ```password```: ```'password'```.

* Only 10 videos will be loaded initially, more videos will be loaded when scrolling down. 

* Maximum 50 videos for one page, click ```Next page``` for more videos.

* Click ```Logout``` before leaving the page.

## Install
Under Node.js environment, first we need to install all node modules by command 
```
npm install
```
then open up MongoDB server, 
```
mongod [some command attributes]
```
and run 
```
npm start
```

## Unit test
This project use ```Jasmine``` and ```Karma```, and browser```Phantomjs``` for unit testing. 
Unit test file is located in ```/client/test/test.js```
Before running the test, ```phantomjs``` need to be installed
```
npm install phantomjs
```
then, run
```
karma start
```
*Since the test is developing and running on ```C9 Cloud```, ```Karma```configuration will be slightly [different](https://karma-runner.github.io/0.8/plus/Cloud9.html).

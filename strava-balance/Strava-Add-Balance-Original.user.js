// ==UserScript==
// @name         lrbalance4strava
// @description  Loads the lrbalance4strava module to display left/right power balance on Strava activity pages
// @version      1
// @match        https://www.strava.com/activities/*
// ==/UserScript==

var q = document.createElement('script');
q.type = 'module';
//q.src="https://dmwnz.github.io/lrbalance4strava/addbal.js";

const req = new XMLHttpRequest();
req.open('GET', 'https://dmwnz.github.io/lrbalance4strava/addbal.js', true);
req.onload = (_event) => {
	q.text = req.response;
};
req.send();

document.body.appendChild(q);

console.log('bye !');

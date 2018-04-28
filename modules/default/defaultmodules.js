/* Magic Mirror
 * Default Modules List
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

// Modules listed below can be loaded without the 'default/' prefix. Omitting the default folder name.

var defaultModules = [
	"alert",
	"birthdays",
	"calendar",
	"clock",
	"compliments",
	"crypto",
	"currentweather",
	"helloworld",
	"newsfeed",
	"stocks",
	"quote",
	"weatherforecast",
	"updatenotification"
];

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = defaultModules;}

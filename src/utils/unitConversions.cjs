/**
 * Unit conversion utility functions.
 * Pure functions with no DOM dependencies — safe to unit-test in Node.
 *
 * @module unitConversions
 */

'use strict';

/**
 * Convert metres to feet, returning a two-decimal-place string.
 * Returns `0` for invalid input (NaN, null, or empty string).
 *
 * @param {number|string|null} meters - Distance in metres.
 * @returns {string|number} The feet value as a fixed-precision string, or `0`.
 */
function metersToFeet(meters) {
	if (
		isNaN(/** @type {number} */ (meters)) ||
		meters === null ||
		meters === ''
	) {
		return 0;
	}
	return /** @type {number} */ (meters * 3.28084).toFixed(2);
}

/**
 * Convert kilometres to miles, two decimal places.
 *
 * @param {number} km - Distance in kilometres.
 * @returns {string} Miles as a fixed-precision string.
 */
function kmToMiles(km) {
	return (km * 0.621371).toFixed(2);
}

/**
 * Convert miles to kilometres, two decimal places.
 *
 * @param {number} miles - Distance in miles.
 * @returns {string} Kilometres as a fixed-precision string.
 */
function milesToKm(miles) {
	return (miles / 0.621371).toFixed(2);
}

/**
 * Calculate elapsed time in hours between a start and end time string.
 *
 * @param {string} startTime - HH:MM time string.
 * @param {string} endTime - HH:MM time string (must be after start).
 * @returns {number} Elapsed hours, or `NaN` / negative if invalid.
 */
function calcElapsedHours(startTime, endTime) {
	const start = new Date('1970-01-01T' + startTime + 'Z');
	const end = new Date('1970-01-01T' + endTime + 'Z');
	return (end.getTime() - start.getTime()) / 1000 / 60 / 60;
}

module.exports = { metersToFeet, kmToMiles, milesToKm, calcElapsedHours };

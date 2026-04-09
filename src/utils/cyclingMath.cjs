/**
 * Pure cycling mathematics utility functions.
 * Extracted from cyclingCalculators.js — no DOM dependencies, fully testable.
 *
 * @module cyclingMath
 */

'use strict';

/**
 * Calculate speed given distance and time.
 *
 * @param {number} distance - Distance in km.
 * @param {number} time - Time in hours.
 * @returns {string} Speed in km/h, two decimal places.
 */
function calcSpeed(distance, time) {
	return (distance / time).toFixed(2);
}

/**
 * Estimate power output (simplified model).
 *
 * @param {number} weight - Rider weight in kg.
 * @param {number} speed - Cycling speed in km/h.
 * @returns {string} Power in Watts, two decimal places.
 */
function calcPower(weight, speed) {
	return (weight * speed * 0.2).toFixed(2);
}

/**
 * Estimate calories burned using the MET model for moderate cycling (MET=8).
 *
 * @param {number} weight - Rider weight in kg.
 * @param {number} duration - Duration in hours.
 * @returns {string} Calories in kcal, two decimal places.
 */
function calcCalories(weight, duration) {
	const MET = 8;
	return (MET * weight * duration).toFixed(2);
}

/**
 * Calculate cadence (revolutions per minute).
 *
 * @param {number} revolutions - Total crank revolutions.
 * @param {number} time - Elapsed time in minutes.
 * @returns {string} Cadence in RPM, two decimal places.
 */
function calcCadence(revolutions, time) {
	return (revolutions / time).toFixed(2);
}

/**
 * Calculate distance from time and speed.
 *
 * @param {number} time - Time in hours.
 * @param {number} speed - Speed in km/h.
 * @returns {string} Distance in km, two decimal places.
 */
function calcDistance(time, speed) {
	return (time * speed).toFixed(2);
}

/**
 * Calculate average speed from total distance and total time.
 *
 * @param {number} totalDistance - Total distance in km.
 * @param {number} totalTime - Total time in hours.
 * @returns {string} Average speed in km/h, two decimal places.
 */
function calcAverageSpeed(totalDistance, totalTime) {
	return (totalDistance / totalTime).toFixed(2);
}

/**
 * Estimate climbing speed (simplified model).
 *
 * @param {number} power - Power output in Watts.
 * @param {number} gradient - Gradient percentage (e.g. 5 for 5 %).
 * @param {number} distance - Climb distance in km.
 * @returns {string} Climbing speed in km/h, two decimal places.
 */
function calcClimbingSpeed(power, gradient, distance) {
	return (power / (gradient * distance)).toFixed(2);
}

/**
 * Calculate gear ratio from chainring and rear cog teeth counts.
 *
 * @param {number} chainring - Front chainring tooth count.
 * @param {number} cog - Rear cog tooth count.
 * @returns {string} Gear ratio, two decimal places.
 */
function calcGearRatio(chainring, cog) {
	return (chainring / cog).toFixed(2);
}

/**
 * Calculate heart-rate training zones from a maximum heart rate.
 *
 * Zones use the common percentage-of-max approach:
 *   Zone 1: 50–60 %, Zone 2: 60–70 %, Zone 3: 70–80 %,
 *   Zone 4: 80–90 %, Zone 5: 90–100 %.
 *
 * @param {number} maxHeartRate - Maximum heart rate in bpm.
 * @returns {{ zone1: string, zone2: string, zone3: string, zone4: string, zone5: string }}
 *   Each zone as a "min - max bpm" string.
 */
function calcHeartRateZones(maxHeartRate) {
	return {
		zone1: `${(maxHeartRate * 0.5).toFixed(0)} - ${(maxHeartRate * 0.6).toFixed(0)} bpm`,
		zone2: `${(maxHeartRate * 0.6).toFixed(0)} - ${(maxHeartRate * 0.7).toFixed(0)} bpm`,
		zone3: `${(maxHeartRate * 0.7).toFixed(0)} - ${(maxHeartRate * 0.8).toFixed(0)} bpm`,
		zone4: `${(maxHeartRate * 0.8).toFixed(0)} - ${(maxHeartRate * 0.9).toFixed(0)} bpm`,
		zone5: `${(maxHeartRate * 0.9).toFixed(0)} - ${maxHeartRate.toFixed(0)} bpm`,
	};
}

/**
 * Estimate VO₂ max (simplified speed/weight model).
 *
 * @param {number} speed - Cycling speed in km/h.
 * @param {number} weight - Rider weight in kg.
 * @returns {string} Estimated VO₂ max in mL/kg/min, two decimal places.
 */
function calcVO2Max(speed, weight) {
	return (speed / weight).toFixed(2);
}

/**
 * Calculate weight impact on climbing (simplified).
 *
 * @param {number} riderWeight - Rider weight in kg.
 * @param {number} bikeWeight - Bike weight in kg.
 * @param {number} slope - Gradient percentage.
 * @returns {string} Impact in kg, two decimal places.
 */
function calcWeightImpact(riderWeight, bikeWeight, slope) {
	return (((riderWeight + bikeWeight) * slope) / 100).toFixed(2);
}

/**
 * Estimate wind resistance as the effective headwind speed.
 *
 * @param {number} windSpeed - Wind speed in km/h.
 * @param {number} cyclingSpeed - Cycling speed in km/h.
 * @returns {string} Combined speed in km/h, two decimal places.
 */
function calcWindResistance(windSpeed, cyclingSpeed) {
	return (cyclingSpeed + windSpeed).toFixed(2);
}

/**
 * Calculate rolling resistance force.
 *
 * @param {number} rollingCoefficient - Rolling resistance coefficient (e.g. 0.005).
 * @param {number} weight - Total weight (rider + bike) in kg.
 * @returns {string} Resistance in kg, two decimal places.
 */
function calcRollingResistance(rollingCoefficient, weight) {
	return (rollingCoefficient * weight).toFixed(2);
}

/**
 * Calculate cycling speed from cadence and wheel diameter (simplified).
 *
 * @param {number} cadence - Cadence in RPM.
 * @param {number} wheelDiameter - Wheel diameter (arbitrary units matching the 0.002 factor).
 * @returns {string} Speed in km/h, two decimal places.
 */
function calcCadenceAndGear(cadence, wheelDiameter) {
	return (cadence * wheelDiameter * 0.002).toFixed(2);
}

module.exports = {
	calcSpeed,
	calcPower,
	calcCalories,
	calcCadence,
	calcDistance,
	calcAverageSpeed,
	calcClimbingSpeed,
	calcGearRatio,
	calcHeartRateZones,
	calcVO2Max,
	calcWeightImpact,
	calcWindResistance,
	calcRollingResistance,
	calcCadenceAndGear,
};

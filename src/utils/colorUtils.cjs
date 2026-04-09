/**
 * Color utility functions for hex-to-rgba conversion.
 * Pure functions with no DOM dependencies — safe to unit-test in Node.
 *
 * @module colorUtils
 */

'use strict';

/**
 * Replace all 8-digit hex colours in a CSS string with rgba() notation.
 *
 * @param {string} data - Raw CSS text that may contain #RRGGBBAA colours.
 * @param {'percentage'|'decimal'} format - How to express the alpha channel.
 * @returns {string} CSS text with hex colours replaced by rgba().
 */
function convertHexToRgba(data, format) {
	return data.replace(/#([0-9A-Fa-f]{8})/g, (match) =>
		hexToRgba(match, format),
	);
}

/**
 * Convert a single 8-digit hex colour to an rgba() string.
 *
 * @param {string} hex - A 9-character string of the form `#RRGGBBAA`.
 * @param {'percentage'|'decimal'} format - How to express the alpha channel.
 * @returns {string} An rgba() CSS colour string.
 */
function hexToRgba(hex, format) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const rawAlpha = parseInt(hex.slice(7, 9), 16) / 255;

	let a;
	if (format === 'percentage') {
		a = (rawAlpha * 100).toFixed(0) + '%';
	} else {
		a = rawAlpha.toFixed(2);
	}

	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

module.exports = { convertHexToRgba, hexToRgba };

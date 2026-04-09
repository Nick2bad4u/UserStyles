'use strict';

const {
	metersToFeet,
	kmToMiles,
	milesToKm,
	calcElapsedHours,
} = require('../src/utils/unitConversions.cjs');

// ─── metersToFeet ─────────────────────────────────────────────────────────────

describe('metersToFeet', () => {
	it('converts 1 metre to ~3.28 feet', () => {
		expect(metersToFeet(1)).toBe('3.28');
	});

	it('converts 0 metres to "0.00"', () => {
		expect(metersToFeet(0)).toBe('0.00');
	});

	it('converts 100 metres correctly', () => {
		expect(metersToFeet(100)).toBe('328.08');
	});

	it('converts 1000 metres to 3280.84 feet', () => {
		expect(metersToFeet(1000)).toBe('3280.84');
	});

	it('handles decimal metres', () => {
		expect(metersToFeet(1.5)).toBe('4.92');
	});

	it('converts negative values (descents)', () => {
		expect(metersToFeet(-10)).toBe('-32.81');
	});

	it('returns 0 for NaN', () => {
		expect(metersToFeet(NaN)).toBe(0);
	});

	it('returns 0 for null', () => {
		expect(metersToFeet(null)).toBe(0);
	});

	it('returns 0 for empty string', () => {
		expect(metersToFeet('')).toBe(0);
	});

	it('returns 0 for a non-numeric string', () => {
		expect(metersToFeet('abc')).toBe(0);
	});
});

// ─── kmToMiles ────────────────────────────────────────────────────────────────

describe('kmToMiles', () => {
	it('converts 1 km to ~0.62 miles', () => {
		expect(kmToMiles(1)).toBe('0.62');
	});

	it('converts 10 km', () => {
		expect(kmToMiles(10)).toBe('6.21');
	});

	it('converts 100 km', () => {
		expect(kmToMiles(100)).toBe('62.14');
	});

	it('converts 0 km', () => {
		expect(kmToMiles(0)).toBe('0.00');
	});

	it('converts a marathon distance (42.195 km)', () => {
		expect(kmToMiles(42.195)).toBe('26.22');
	});
});

// ─── milesToKm ────────────────────────────────────────────────────────────────

describe('milesToKm', () => {
	it('converts 1 mile to ~1.61 km', () => {
		expect(milesToKm(1)).toBe('1.61');
	});

	it('converts 10 miles', () => {
		expect(milesToKm(10)).toBe('16.09');
	});

	it('converts 100 miles', () => {
		expect(milesToKm(100)).toBe('160.93');
	});

	it('converts 0 miles', () => {
		expect(milesToKm(0)).toBe('0.00');
	});

	it('is approximately the inverse of kmToMiles', () => {
		// Round-trip: 100 km → miles → km should be close to 100
		const miles = kmToMiles(100);
		const backToKm = milesToKm(parseFloat(miles));
		expect(parseFloat(backToKm)).toBeCloseTo(100, 0);
	});
});

// ─── calcElapsedHours ──────────────────────────────────────────────────────────

describe('calcElapsedHours', () => {
	it('calculates 1 hour between 08:00 and 09:00', () => {
		expect(calcElapsedHours('08:00', '09:00')).toBe(1);
	});

	it('calculates 0.5 hours between 08:00 and 08:30', () => {
		expect(calcElapsedHours('08:00', '08:30')).toBe(0.5);
	});

	it('calculates 2 hours between 10:00 and 12:00', () => {
		expect(calcElapsedHours('10:00', '12:00')).toBe(2);
	});

	it('returns 0 for the same start and end time', () => {
		expect(calcElapsedHours('09:00', '09:00')).toBe(0);
	});

	it('returns a negative value when end is before start', () => {
		expect(calcElapsedHours('12:00', '11:00')).toBe(-1);
	});
});

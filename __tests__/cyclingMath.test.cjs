'use strict';

const {
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
} = require('../src/utils/cyclingMath.cjs');

// ─── calcSpeed ────────────────────────────────────────────────────────────────

describe('calcSpeed', () => {
	it('calculates 40 km/h from 40 km in 1 hour', () => {
		expect(calcSpeed(40, 1)).toBe('40.00');
	});

	it('calculates 20 km/h from 10 km in 0.5 hours', () => {
		expect(calcSpeed(10, 0.5)).toBe('20.00');
	});

	it('handles fractional results', () => {
		expect(calcSpeed(100, 3)).toBe('33.33');
	});
});

// ─── calcPower ────────────────────────────────────────────────────────────────

describe('calcPower', () => {
	it('calculates power for 70 kg rider at 30 km/h', () => {
		// 70 * 30 * 0.2 = 420
		expect(calcPower(70, 30)).toBe('420.00');
	});

	it('calculates power for 80 kg rider at 25 km/h', () => {
		// 80 * 25 * 0.2 = 400
		expect(calcPower(80, 25)).toBe('400.00');
	});

	it('returns 0.00 when speed is 0', () => {
		expect(calcPower(70, 0)).toBe('0.00');
	});
});

// ─── calcCalories ─────────────────────────────────────────────────────────────

describe('calcCalories', () => {
	it('calculates calories for 70 kg rider for 1 hour (MET 8)', () => {
		// 8 * 70 * 1 = 560
		expect(calcCalories(70, 1)).toBe('560.00');
	});

	it('calculates calories for 60 kg rider for 2 hours', () => {
		// 8 * 60 * 2 = 960
		expect(calcCalories(60, 2)).toBe('960.00');
	});

	it('returns 0.00 for 0 duration', () => {
		expect(calcCalories(70, 0)).toBe('0.00');
	});
});

// ─── calcCadence ──────────────────────────────────────────────────────────────

describe('calcCadence', () => {
	it('calculates 90 RPM from 90 revolutions in 1 minute', () => {
		expect(calcCadence(90, 1)).toBe('90.00');
	});

	it('calculates 80 RPM from 400 revolutions in 5 minutes', () => {
		expect(calcCadence(400, 5)).toBe('80.00');
	});

	it('handles fractional RPM', () => {
		expect(calcCadence(100, 3)).toBe('33.33');
	});
});

// ─── calcDistance ─────────────────────────────────────────────────────────────

describe('calcDistance', () => {
	it('calculates 40 km from 1 hour at 40 km/h', () => {
		expect(calcDistance(1, 40)).toBe('40.00');
	});

	it('calculates 60 km from 2 hours at 30 km/h', () => {
		expect(calcDistance(2, 30)).toBe('60.00');
	});

	it('returns 0.00 for 0 time', () => {
		expect(calcDistance(0, 40)).toBe('0.00');
	});
});

// ─── calcAverageSpeed ─────────────────────────────────────────────────────────

describe('calcAverageSpeed', () => {
	it('calculates 40 km/h average', () => {
		expect(calcAverageSpeed(80, 2)).toBe('40.00');
	});

	it('handles fractional results', () => {
		expect(calcAverageSpeed(100, 3)).toBe('33.33');
	});
});

// ─── calcClimbingSpeed ────────────────────────────────────────────────────────

describe('calcClimbingSpeed', () => {
	it('calculates climbing speed for 200W, 5% grade, 1 km', () => {
		// 200 / (5 * 1) = 40.00
		expect(calcClimbingSpeed(200, 5, 1)).toBe('40.00');
	});

	it('calculates climbing speed for 300W, 10% grade, 2 km', () => {
		// 300 / (10 * 2) = 15.00
		expect(calcClimbingSpeed(300, 10, 2)).toBe('15.00');
	});
});

// ─── calcGearRatio ────────────────────────────────────────────────────────────

describe('calcGearRatio', () => {
	it('calculates 3.00 for 39/13', () => {
		expect(calcGearRatio(39, 13)).toBe('3.00');
	});

	it('calculates 2.50 for 50/20', () => {
		expect(calcGearRatio(50, 20)).toBe('2.50');
	});

	it('calculates 1.00 for equal teeth', () => {
		expect(calcGearRatio(20, 20)).toBe('1.00');
	});
});

// ─── calcHeartRateZones ───────────────────────────────────────────────────────

describe('calcHeartRateZones', () => {
	const zones = calcHeartRateZones(200);

	it('zone 1 is 100 - 120 bpm', () => {
		expect(zones.zone1).toBe('100 - 120 bpm');
	});

	it('zone 2 is 120 - 140 bpm', () => {
		expect(zones.zone2).toBe('120 - 140 bpm');
	});

	it('zone 3 is 140 - 160 bpm', () => {
		expect(zones.zone3).toBe('140 - 160 bpm');
	});

	it('zone 4 is 160 - 180 bpm', () => {
		expect(zones.zone4).toBe('160 - 180 bpm');
	});

	it('zone 5 is 180 - 200 bpm', () => {
		expect(zones.zone5).toBe('180 - 200 bpm');
	});

	it('returns all 5 zone keys', () => {
		expect(Object.keys(zones)).toHaveLength(5);
	});

	it('calculates zones for a lower max HR (150 bpm)', () => {
		const z150 = calcHeartRateZones(150);
		expect(z150.zone1).toBe('75 - 90 bpm');
		expect(z150.zone5).toBe('135 - 150 bpm');
	});
});

// ─── calcVO2Max ───────────────────────────────────────────────────────────────

describe('calcVO2Max', () => {
	it('calculates VO2max for speed 40, weight 70', () => {
		// 40 / 70 ≈ 0.57
		expect(calcVO2Max(40, 70)).toBe('0.57');
	});

	it('calculates VO2max for speed 30, weight 60', () => {
		expect(calcVO2Max(30, 60)).toBe('0.50');
	});
});

// ─── calcWeightImpact ─────────────────────────────────────────────────────────

describe('calcWeightImpact', () => {
	it('calculates impact for 80 kg rider, 10 kg bike, 5% slope', () => {
		// (80 + 10) * 5 / 100 = 4.50
		expect(calcWeightImpact(80, 10, 5)).toBe('4.50');
	});

	it('calculates impact at 0% slope', () => {
		expect(calcWeightImpact(80, 10, 0)).toBe('0.00');
	});
});

// ─── calcWindResistance ───────────────────────────────────────────────────────

describe('calcWindResistance', () => {
	it('adds wind speed and cycling speed', () => {
		expect(calcWindResistance(10, 30)).toBe('40.00');
	});

	it('handles head and tail wind symmetrically', () => {
		expect(calcWindResistance(5, 25)).toBe('30.00');
	});
});

// ─── calcRollingResistance ────────────────────────────────────────────────────

describe('calcRollingResistance', () => {
	it('calculates rolling resistance for Crr=0.005, weight=90 kg', () => {
		expect(calcRollingResistance(0.005, 90)).toBe('0.45');
	});

	it('returns 0 for zero coefficient', () => {
		expect(calcRollingResistance(0, 90)).toBe('0.00');
	});
});

// ─── calcCadenceAndGear ───────────────────────────────────────────────────────

describe('calcCadenceAndGear', () => {
	it('calculates speed for cadence 90, wheel 700', () => {
		// 90 * 700 * 0.002 = 126.00
		expect(calcCadenceAndGear(90, 700)).toBe('126.00');
	});

	it('returns 0 for zero cadence', () => {
		expect(calcCadenceAndGear(0, 700)).toBe('0.00');
	});

	it('returns 0 for zero wheel diameter', () => {
		expect(calcCadenceAndGear(90, 0)).toBe('0.00');
	});
});

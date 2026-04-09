'use strict';

const { hexToRgba, convertHexToRgba } = require('../src/utils/colorUtils.cjs');

// ─── hexToRgba ───────────────────────────────────────────────────────────────

describe('hexToRgba', () => {
	describe('decimal alpha format (default)', () => {
		it('converts fully-opaque white #ffffffff', () => {
			expect(hexToRgba('#ffffffff', 'decimal')).toBe(
				'rgba(255, 255, 255, 1.00)',
			);
		});

		it('converts fully-transparent black #00000000', () => {
			expect(hexToRgba('#00000000', 'decimal')).toBe('rgba(0, 0, 0, 0.00)');
		});

		it('converts a mid-grey semi-transparent colour #808080ff', () => {
			expect(hexToRgba('#808080ff', 'decimal')).toBe(
				'rgba(128, 128, 128, 1.00)',
			);
		});

		it('converts a 50 % alpha value correctly', () => {
			// 0x80 / 255 ≈ 0.502 → toFixed(2) = '0.50'
			expect(hexToRgba('#ff000080', 'decimal')).toBe('rgba(255, 0, 0, 0.50)');
		});

		it('handles lowercase hex digits', () => {
			expect(hexToRgba('#aabbccdd', 'decimal')).toBe(
				'rgba(170, 187, 204, 0.87)',
			);
		});

		it('handles uppercase hex digits', () => {
			expect(hexToRgba('#AABBCCDD', 'decimal')).toBe(
				'rgba(170, 187, 204, 0.87)',
			);
		});
	});

	describe('percentage alpha format', () => {
		it('converts fully-opaque white #ffffffff with percentage alpha', () => {
			expect(hexToRgba('#ffffffff', 'percentage')).toBe(
				'rgba(255, 255, 255, 100%)',
			);
		});

		it('converts fully-transparent black #00000000 with percentage alpha', () => {
			expect(hexToRgba('#00000000', 'percentage')).toBe('rgba(0, 0, 0, 0%)');
		});

		it('converts ~50% alpha correctly', () => {
			// 0x80 = 128; 128/255 * 100 ≈ 50.2 → toFixed(0) = '50'
			expect(hexToRgba('#ff000080', 'percentage')).toBe('rgba(255, 0, 0, 50%)');
		});
	});
});

// ─── convertHexToRgba ────────────────────────────────────────────────────────

describe('convertHexToRgba', () => {
	it('replaces a single 8-digit hex in a CSS rule', () => {
		const input = 'color: #ff0000ff;';
		expect(convertHexToRgba(input, 'decimal')).toBe(
			'color: rgba(255, 0, 0, 1.00);',
		);
	});

	it('replaces multiple 8-digit hex values in one string', () => {
		const input = 'background: #00000080; border-color: #ffffffff;';
		const result = convertHexToRgba(input, 'decimal');
		expect(result).toBe(
			'background: rgba(0, 0, 0, 0.50); border-color: rgba(255, 255, 255, 1.00);',
		);
	});

	it('leaves 6-digit hex colours untouched', () => {
		const input = 'color: #ff0000;';
		expect(convertHexToRgba(input, 'decimal')).toBe('color: #ff0000;');
	});

	it('leaves 3-digit hex colours untouched', () => {
		const input = 'color: #f00;';
		expect(convertHexToRgba(input, 'decimal')).toBe('color: #f00;');
	});

	it('returns an empty string unchanged', () => {
		expect(convertHexToRgba('', 'decimal')).toBe('');
	});

	it('uses percentage format when requested', () => {
		const input = 'opacity: #ffffff80;';
		expect(convertHexToRgba(input, 'percentage')).toBe(
			'opacity: rgba(255, 255, 255, 50%);',
		);
	});

	it('replaces hex in a multi-line CSS block', () => {
		const input = `.foo {\n  color: #ff000080;\n  background: #00000080;\n}`;
		const expected = `.foo {\n  color: rgba(255, 0, 0, 0.50);\n  background: rgba(0, 0, 0, 0.50);\n}`;
		expect(convertHexToRgba(input, 'decimal')).toBe(expected);
	});
});

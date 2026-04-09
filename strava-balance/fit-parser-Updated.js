'use strict';

import { calculateCRC, getArrayBuffer, readRecord } from './binary.js';

/**
 * Parses FIT files with various options for customization.
 */
class FitParser {
	static EVENT_TYPE_STOP_ALL = 'stop_all';

	constructor(options = {}) {
		this.options = {
			force: options.force !== undefined ? options.force : true,
			speedUnit: options.speedUnit ?? 'm/s',
			lengthUnit: options.lengthUnit ?? 'm',
			temperatureUnit: options.temperatureUnit ?? 'celsius',
			elapsedRecordField: options.elapsedRecordField ?? false,
			mode: options.mode ?? 'list',
		};
	}

	/**
	 * Parses the FIT file content.
	 * @param {ArrayBuffer} content - The FIT file content.
	 * @param {Function} callback - The callback function.
	 */
	parse(content, callback) {
		const blob = new Uint8Array(
			content instanceof ArrayBuffer ? content : getArrayBuffer(content),
		);

		if (blob.length < 12) {
			return callback('FIT file is too small to be valid', {});
		}
		const headerLength = blob[0];
		if (![12, 14].includes(headerLength)) {
			return callback('Invalid FIT file header size', {});
		}
		const fileTypeString = String.fromCharCode.apply(null, blob.slice(8, 12));
		if (fileTypeString !== '.FIT') {
			return callback('FIT file header does not contain ".FIT"', {});
		}

		if (headerLength === 14) {
			const crcHeader = blob[12] + (blob[13] << 8);
			const crcHeaderCalc = calculateCRC(blob, 0, 12);
			if (crcHeader !== crcHeaderCalc) {
				if (!this.options.force) {
					return callback('FIT file header CRC mismatch', {});
				}
			}
		}

		const protocolVersion = blob[1];
		const profileVersion = blob[2] + (blob[3] << 8);
		const dataLength =
			blob[4] + (blob[5] << 8) + (blob[6] << 16) + (blob[7] << 24);
		const crcStart = dataLength + headerLength;
		const crcFile = blob[crcStart] + (blob[crcStart + 1] << 8);
		const crcFileCalc = calculateCRC(
			blob,
			headerLength === 12 ? 0 : headerLength,
			crcStart,
		);

		if (crcFile !== crcFileCalc) {
			if (!this.options.force) {
				return callback('FIT file CRC check failed', {});
			}
		}

		const fitObj = {
			protocolVersion,
			profileVersion,
		};

		const collections = {
			sessions: [],
			laps: [],
			records: [],
			events: [],
			hrv: [],
			devices: [],
			applications: [],
			fieldDescriptions: [],
			dive_gases: [],
			course_points: [],
			sports: [],
			monitors: [],
			stress: [],
			definitions: [],
			file_ids: [],
			monitor_info: [],
			lengths: [],
		};

		let tempRecords = [];
		let tempLaps = [];
		let tempLengths = [];

		let loopIndex = headerLength;
		const messageTypes = [];
		const developerFields = [];

		const isCascadeNeeded =
			this.options.mode === 'cascade' || this.options.mode === 'both';

		let startDate = null;
		let lastStopTimestamp = null;
		let pausedTime = 0;

		while (loopIndex < crcStart && loopIndex < blob.length) {
			const { nextIndex, messageType, message } = readRecord(
				blob,
				messageTypes,
				developerFields,
				loopIndex,
				this.options,
				startDate,
				pausedTime,
			);
			if (
				nextIndex === undefined ||
				nextIndex === null ||
				nextIndex <= loopIndex
			) {
				return callback('Error: nextIndex did not increment', {});
			}
			loopIndex = nextIndex;

			switch (messageType) {
				case 'lap':
					if (isCascadeNeeded) {
						message.records = tempRecords;
						tempRecords = [];
						tempLaps.push(message);
						message.lengths = tempLengths;
						tempLengths = [];
					}
					collections.laps.push(message);
					break;
				case 'session':
					if (isCascadeNeeded) {
						message.laps = tempLaps;
						tempLaps = [];
					}
					collections.sessions.push(message);
					break;
				case 'event':
					if (message.event === 'timer') {
						if (
							message.event_type === FitParser.EVENT_TYPE_STOP_ALL &&
							typeof message.timestamp === 'number'
						) {
							lastStopTimestamp = message.timestamp;
						} else if (
							message.event_type === 'start' &&
							typeof message.timestamp === 'number' &&
							typeof lastStopTimestamp === 'number'
						) {
							pausedTime += (message.timestamp - lastStopTimestamp) / 1000;
						}
					}
					collections.events.push(message);
					break;
				case 'length':
					if (isCascadeNeeded) {
						tempLengths.push(message);
					}
					collections.lengths.push(message);
					break;
				case 'hrv':
					collections.hrv.push(message);
					break;
				case 'record':
					if (!startDate) {
						startDate = message.timestamp;
						message.elapsed_time = 0;
						message.timer_time = 0;
					}
					collections.records.push(message);
					if (isCascadeNeeded) {
						tempRecords.push(message);
					}
					break;
				case 'field_description':
					collections.fieldDescriptions.push(message);
					break;
				case 'device_info':
					collections.devices.push(message);
					break;
				case 'developer_data_id':
					collections.applications.push(message);
					break;
				case 'dive_gas':
					collections.dive_gases.push(message);
					break;
				case 'course_point':
					collections.course_points.push(message);
					break;
				case 'sport':
					collections.sports.push(message);
					break;
				case 'file_id':
					collections.file_ids.push(message);
					break;
				case 'definition':
					collections.definitions.push(message);
					break;
				case 'monitoring':
					collections.monitors.push(message);
					break;
				case 'monitoring_info':
					collections.monitor_info.push(message);
					break;
				case 'stress_level':
					collections.stress.push(message);
					break;
				case 'software':
					fitObj.software = message;
					break;
				default:
					if (messageType) {
						fitObj[messageType] = message;
					}
					break;
			}
		}

		if (isCascadeNeeded) {
			fitObj.activity = {
				sessions: collections.sessions,
				events: collections.events,
				hrv: collections.hrv,
				device_infos: collections.devices,
				developer_data_ids: collections.applications,
				field_descriptions: collections.fieldDescriptions,
				sports: collections.sports,
			};
		} else {
			Object.assign(fitObj, collections);
		}

		callback(null, fitObj);
	}
}

export default FitParser;

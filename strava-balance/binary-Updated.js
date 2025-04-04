'use strict';

// Object.defineProperty(exports, "__esModule", {
//     value: true
// });
const _addEndian = addEndian;
export { _addEndian as addEndian };
const _readRecord = readRecord;
export { _readRecord as readRecord };
const _getArrayBuffer = getArrayBuffer;
export { _getArrayBuffer as getArrayBuffer };
const _calculateCRC = calculateCRC;
export { _calculateCRC as calculateCRC };

import { FIT } from './fit.js';

import { getFitMessage, getFitMessageBaseType } from './messages.js';

import { Buffer } from './buffer-5.6.1/index.js';

function addEndian(littleEndian, bytes) {
	var result = 0;
	if (!littleEndian) bytes.reverse();
	for (var i = 0; i < bytes.length; i++) {
		result += (bytes[i] << (i << 3)) >>> 0;
	}

	return result;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var timestamp = 0;
var lastTimeOffset = 0;
var CompressedTimeMask = 31;
var CompressedLocalMesgNumMask = 0x60;
var CompressedHeaderMask = 0x80;
var GarminTimeOffset = 631065600000;
var monitoring_timestamp = 0;

function readData(blob, fDef, startIndex, options) {
	if (fDef.endianAbility === true) {
		var temp = [];
		for (var i = 0; i < fDef.size; i++) {
			temp.push(blob[startIndex + i]);
		}

		var buffer = new Uint8Array(temp).buffer;
		var dataView = new DataView(buffer);

		try {
			switch (fDef.type) {
				case 'sint16':
					return dataView.getInt16(0, fDef.littleEndian);
				case 'uint16':
				case 'uint16z':
					return dataView.getUint16(0, fDef.littleEndian);
				case 'sint32':
					return dataView.getInt32(0, fDef.littleEndian);
				case 'uint32':
				case 'uint32z':
					return dataView.getUint32(0, fDef.littleEndian);
				case 'float32':
					return dataView.getFloat32(0, fDef.littleEndian);
				case 'float64':
					return dataView.getFloat64(0, fDef.littleEndian);
				case 'uint32_array':
					var array32 = [];
					for (var _i = 0; _i < fDef.size; _i += 4) {
						array32.push(dataView.getUint32(_i, fDef.littleEndian));
					}
					return array32;
				case 'uint16_array':
					var array = [];
					for (var _i2 = 0; _i2 < fDef.size; _i2 += 2) {
						array.push(dataView.getUint16(_i2, fDef.littleEndian));
					}
					return array;
			}
		} catch (e) {
			if (!options.force) {
				throw e;
			}
		}

		return addEndian(fDef.littleEndian, temp);
	}

	if (fDef.type === 'string') {
		var _temp = [];
		for (var _i3 = 0; _i3 < fDef.size; _i3++) {
			if (blob[startIndex + _i3]) {
				_temp.push(blob[startIndex + _i3]);
			}
		}
		return new Buffer(_temp).toString('utf-8');
	}

	if (fDef.type === 'byte_array') {
		var _temp2 = [];
		for (var _i4 = 0; _i4 < fDef.size; _i4++) {
			_temp2.push(blob[startIndex + _i4]);
		}
		return _temp2;
	}

	return blob[startIndex];
}

function formatByType(data, type, scale, offset) {
	switch (type) {
		case 'date_time':
		case 'local_date_time':
			return new Date(data * 1000 + GarminTimeOffset);
		case 'sint32':
			return data * FIT.scConst;
		case 'uint8':
		case 'sint16':
		case 'uint32':
		case 'uint16':
			return scale ? data / scale + offset : data;
		case 'uint32_array':
		case 'uint16_array':
			return data.map(function (dataItem) {
				return scale ? dataItem / scale + offset : dataItem;
			});
		default:
			if (!FIT.types[type]) {
				return data;
			}
			// Quick check for a mask
			var values = [];
			for (var key in FIT.types[type]) {
				if (Object.prototype.hasOwnProperty.call(FIT.types[type], key)) {
					values.push(FIT.types[type][key]);
				}
			}
			if (values.indexOf('mask') === -1) {
				return FIT.types[type][data];
			}
			var dataItem = {};
			for (var innerKey in FIT.types[type]) {
				if (Object.prototype.hasOwnProperty.call(FIT.types[type], innerKey)) {
					if (FIT.types[type][innerKey] === 'mask') {
						dataItem.value = data & innerKey;
					} else {
						dataItem[FIT.types[type][innerKey]] = !!((data & innerKey) >> 7); // Not sure if we need the >> 7 and casting to boolean but from all the masked props of fields so far this seems to be the case
					}
				}
			}
			return dataItem;
	}
}

function isInvalidValue(data, type) {
	switch (type) {
		case 'enum':
			return data === 0xff;
		case 'sint8':
			return data === 0x7f;
		case 'uint8':
			return data === 0xff;
		case 'sint16':
			return data === 0x7fff;
		case 'uint16':
			return data === 0xffff;
		case 'sint32':
			return data === 0x7fffffff;
		case 'uint32':
			return data === 0xffffffff;
		case 'string':
			return data === 0x00;
		case 'float32':
			return data === 0xffffffff;
		case 'float64':
			return data === BigInt("0xffffffffffffffff");
		case 'uint8z':
			return data === 0x00;
		case 'uint16z':
			return data === 0x0000;
		case 'uint32z':
			return data === 0x000000;
		case 'byte':
			return data === 0xff;
		case 'sint64':
			return data === BigInt("0x7fffffffffffffff");
		case 'uint64':
			return data === BigInt("0xffffffffffffffff");
		case 'uint64z':
			return data === 0x0000000000000000;
		default:
			return false;
	}
}

function convertTo(data, unitsList, speedUnit) {
	var unitObj = FIT.options[unitsList][speedUnit];
	return unitObj ? data * unitObj.multiplier + unitObj.offset : data;
}

function applyOptions(data, field, options) {
	switch (field) {
		case 'speed':
		case 'enhanced_speed':
		case 'vertical_speed':
		case 'avg_speed':
		case 'max_speed':
		case 'speed_1s':
		case 'ball_speed':
		case 'enhanced_avg_speed':
		case 'enhanced_max_speed':
		case 'avg_pos_vertical_speed':
		case 'max_pos_vertical_speed':
		case 'avg_neg_vertical_speed':
		case 'max_neg_vertical_speed':
			return convertTo(data, 'speedUnits', options.speedUnit);
		case 'distance':
		case 'total_distance':
		case 'enhanced_avg_altitude':
		case 'enhanced_min_altitude':
		case 'enhanced_max_altitude':
		case 'enhanced_altitude':
		case 'height':
		case 'odometer':
		case 'avg_stroke_distance':
		case 'min_altitude':
		case 'avg_altitude':
		case 'max_altitude':
		case 'total_ascent':
		case 'total_descent':
		case 'altitude':
		case 'cycle_length':
		case 'auto_wheelsize':
		case 'custom_wheelsize':
		case 'gps_accuracy':
			return convertTo(data, 'lengthUnits', options.lengthUnit);
		case 'temperature':
		case 'avg_temperature':
		case 'max_temperature':
			return convertTo(data, 'temperatureUnits', options.temperatureUnit);
		default:
			return data;
	}
}

function readRecord(
	blob,
	messageTypes,
	developerFields,
	startIndex,
	options,
	startDate,
	pausedTime,
) {
	var recordHeader = blob[startIndex];
	var localMessageType = recordHeader & 15;

	if ((recordHeader & CompressedHeaderMask) === CompressedHeaderMask) {
		//compressed timestamp

		var timeoffset = recordHeader & CompressedTimeMask;
		timestamp += (timeoffset - lastTimeOffset) & CompressedTimeMask;
		lastTimeOffset = timeoffset;

		localMessageType = (recordHeader & CompressedLocalMesgNumMask) >> 5;
	} else if ((recordHeader & 64) === 64) {
		// is definition message
		// startIndex + 1 is reserved

		var hasDeveloperData = (recordHeader & 32) === 32;
		var lEnd = blob[startIndex + 2] === 0;
		var numberOfFields = blob[startIndex + 5];
		var numberOfDeveloperDataFields = hasDeveloperData
			? blob[startIndex + 5 + numberOfFields * 3 + 1]
			: 0;

		var mTypeDef = {
			littleEndian: lEnd,
			globalMessageNumber: addEndian(lEnd, [
				blob[startIndex + 3],
				blob[startIndex + 4],
			]),
			numberOfFields: numberOfFields + numberOfDeveloperDataFields,
			fieldDefs: [],
		};

		var _message = (0, getFitMessage)(mTypeDef.globalMessageNumber);

		for (var i = 0; i < numberOfFields; i++) {
			var fDefIndex = startIndex + 6 + i * 3;
			var baseType = blob[fDefIndex + 2];

			var _message$getAttribute = _message.getAttributes(blob[fDefIndex]),
				field = _message$getAttribute.field,
				type = _message$getAttribute.type;

			var fDef = {
				type: type,
				fDefNo: blob[fDefIndex],
				size: blob[fDefIndex + 1],
				endianAbility: (baseType & 128) === 128,
				littleEndian: lEnd,
				baseTypeNo: baseType & 15,
				name: field,
				dataType: (0, getFitMessageBaseType)(baseType & 15),
			};

			mTypeDef.fieldDefs.push(fDef);
		}

		// numberOfDeveloperDataFields = 0 so it wont crash here and wont loop
		for (var _i5 = 0; _i5 < numberOfDeveloperDataFields; _i5++) {
			// If we fail to parse then try catch
			try {
				var _fDefIndex = startIndex + 6 + numberOfFields * 3 + 1 + _i5 * 3;

				var fieldNum = blob[_fDefIndex];
				var size = blob[_fDefIndex + 1];
				var devDataIndex = blob[_fDefIndex + 2];

				var devDef = developerFields[devDataIndex][fieldNum];

				var _baseType = devDef.fit_base_type_id;

				var _fDef = {
					type: FIT.types.fit_base_type[_baseType],
					fDefNo: fieldNum,
					size: size,
					endianAbility: (_baseType & 128) === 128,
					littleEndian: lEnd,
					baseTypeNo: _baseType & 15,
					name: devDef.field_name,
					dataType: (0, getFitMessageBaseType)(_baseType & 15),
					scale: devDef.scale || 1,
					offset: devDef.offset || 0,
					developerDataIndex: devDataIndex,
					isDeveloperField: true,
				};

				mTypeDef.fieldDefs.push(_fDef);
			} catch (e) {
				if (options.force) {
					continue;
				}
				throw e;
			}
		}

		messageTypes[localMessageType] = mTypeDef;

		var nextIndex = startIndex + 6 + mTypeDef.numberOfFields * 3;
		var nextIndexWithDeveloperData = nextIndex + 1;

		return {
			messageType: 'definition',
			nextIndex: hasDeveloperData ? nextIndexWithDeveloperData : nextIndex,
		};
	}

	var messageType = messageTypes[localMessageType] || messageTypes[0];

	// TODO: handle compressed header ((recordHeader & 128) == 128)

	// uncompressed header
	var messageSize = 0;
	var readDataFromIndex = startIndex + 1;
	var fields = {};
	var message = (0, getFitMessage)(messageType.globalMessageNumber);

	for (var _i6 = 0; _i6 < messageType.fieldDefs.length; _i6++) {
		var _fDef2 = messageType.fieldDefs[_i6];
		var data = readData(blob, _fDef2, readDataFromIndex, options);

		if (!isInvalidValue(data, _fDef2.type)) {
			if (_fDef2.isDeveloperField) {
				// eslint-disable-next-line no-redeclare
				var field = _fDef2.name;
				// eslint-disable-next-line no-redeclare
				var type = _fDef2.type;
				var scale = _fDef2.scale;
				var offset = _fDef2.offset;

				fields[_fDef2.name] = applyOptions(
					formatByType(data, type, scale, offset),
					field,
					options,
				);
			} else {
				var _message$getAttribute2 = message.getAttributes(_fDef2.fDefNo),
					_field = _message$getAttribute2.field,
					_type = _message$getAttribute2.type,
					_scale = _message$getAttribute2.scale,
					_offset = _message$getAttribute2.offset;

				if (_field !== 'unknown' && _field !== '' && _field !== undefined) {
					fields[_field] = applyOptions(
						formatByType(data, _type, _scale, _offset),
						_field,
						options,
					);
				}
			}

			if (message.name === 'record' && options.elapsedRecordField) {
				fields.elapsed_time = (fields.timestamp - startDate) / 1000;
				fields.timer_time = fields.elapsed_time - pausedTime;
			}
		}

		readDataFromIndex += _fDef2.size;
		messageSize += _fDef2.size;
	}

	if (message.name === 'field_description') {
		developerFields[fields.developer_data_index] =
			developerFields[fields.developer_data_index] || [];
		developerFields[fields.developer_data_index][
			fields.field_definition_number
		] = fields;
	}

	if (message.name === 'monitoring') {
		//we need to keep the raw timestamp value so we can calculate subsequent timestamp16 fields
		if (fields.timestamp) {
			monitoring_timestamp = fields.timestamp;
			fields.timestamp = new Date(fields.timestamp * 1000 + GarminTimeOffset);
		}
		if (fields.timestamp16 && !fields.timestamp) {
			monitoring_timestamp +=
				(fields.timestamp16 - (monitoring_timestamp & 0xffff)) & 0xffff;
			//fields.timestamp = monitoring_timestamp;
			fields.timestamp = new Date(
				monitoring_timestamp * 1000 + GarminTimeOffset,
			);
		}
	}

	var result = {
		messageType: message.name,
		nextIndex: startIndex + messageSize + 1,
		message: fields,
	};

	return result;
}

function getArrayBuffer(buffer) {
	if (buffer instanceof ArrayBuffer) {
		return buffer;
	}
	var ab = new ArrayBuffer(buffer.length);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return ab;
}

function calculateCRC(blob, start, end) {
	var crcTable = [
		0x0000, 0xcc01, 0xd801, 0x1400, 0xf001, 0x3c00, 0x2800, 0xe401, 0xa001,
		0x6c00, 0x7800, 0xb401, 0x5000, 0x9c01, 0x8801, 0x4400,
	];

	var crc = 0;
	for (var i = start; i < end; i++) {
		var byte = blob[i];
		var tmp = crcTable[crc & 0xf];
		crc = (crc >> 4) & 0x0fff;
		crc = crc ^ tmp ^ crcTable[byte & 0xf];
		tmp = crcTable[crc & 0xf];
		crc = (crc >> 4) & 0x0fff;
		crc = crc ^ tmp ^ crcTable[(byte >> 4) & 0xf];
	}

	return crc;
}

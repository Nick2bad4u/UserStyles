'use strict';

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
const _getFitMessage = getFitMessage;
export { _getFitMessage as getFitMessage };
const _getFitMessageBaseType = getFitMessageBaseType;
export { _getFitMessageBaseType as getFitMessageBaseType };

import { getMessageName, getFieldObject } from './fit.js';

function getFitMessage(messageNum) {
	return {
		name: (0, getMessageName)(messageNum),
		getAttributes: function getAttributes(fieldNum) {
			return (0, getFieldObject)(fieldNum, messageNum);
		},
	};
}

// TODO
function getFitMessageBaseType(foo) {
	return foo;
}

/**
 * Validates the sanity of a FIT file by inspecting its header.
 *
 * The function ensures:
 * - The file is long enough to be a valid FIT file.
 * - The header length is either 12 or 14 bytes.
 * - The header contains the ".FIT" string.
 *
 * @param {ArrayBuffer} buffer - The binary data of the FIT file.
 * @throws {Error} Throws an error if the file is too small, has an incorrect header size, or the header does not contain ".FIT".
 */

/**
 * Parses a FIT file after performing basic sanity checks.
 *
 * This function first validates the FIT file's header using checkFitSanity.
 * It then utilizes the FitParser to parse the ArrayBuffer asynchronously.
 *
 * @param {ArrayBuffer} arrayBuffer - The binary data of the FIT file.
 * @returns {Promise<Object>} A promise that resolves with the parsed FIT file data.
 * @throws {Error} Propagates any error encountered during parsing.
 */

/**
 * Extracts left/right balance values from parsed FIT file data.
 *
 * Iterates over each record in the FIT file data to extract the left_right_balance field.
 * If the left_right_balance value is not set (i.e., equals 127), a default value of 50 is used.
 * If no record contains left/right balance data, an error is thrown.
 *
 * @param {Object} fitData - The FIT file data parsed by the FitParser.
 * @returns {number[]} An array of left/right balance percentages.
 * @throws {Error} Throws an error if none of the records include left/right balance data.
 */

/**
 * Fetches the original FIT file for an activity, parses it, and loads the left/right balance data.
 *
 * This async function performs several steps:
 * - Verifies that the current user owns the activity.
 * - Fetches the FIT file from a predefined URL.
 * - Parses the file and extracts the left/right balance stream.
 * - Attaches the extracted balance data to the pageView's streams.
 *
 * @param {Object} pageView - The Strava page view object representing the activity.
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if the activity does not belong to the logged-in athlete, or if fetching/parsing fails.
 */

/**
 * Custom formatter for displaying left/right power balance.
 *
 * Extends the Strava I18n ScalarFormatter to format the left/right balance
 * as a percentage ratio (e.g., "left/right" balance).
 */

/**
 * Overrides the default handleStreamsReady method to integrate left/right balance stream processing.
 *
 * The overridden function waits for the left/right balance data to be fetched,
 * then augments the streams context with:
 * - A custom getIntervalAverage method when processing the leftrightbalance stream.
 * - Addition of the leftrightbalance stream to the available streams.
 * - Association of a custom formatter for the left/right balance display.
 *
 * After augmenting the data, it calls the original handleStreamsReady method.
 *
 * @async
 */
/* global Strava */
import { default as FitParser } from 'https://cdn.jsdelivr.net/gh/Nick2bad4u/UserStyles@refs/heads/main/strava-balance/strava-fit-parser.js';

const originalHandleStreamsReady =
	Strava.Charts.Activities.BasicAnalysisStacked.prototype.handleStreamsReady;

const dataViewCache = new WeakMap();

const textDecoder = new TextDecoder();

function checkFitSanity(buffer) {
	let dataView = dataViewCache.get(buffer);
	if (!dataView) {
		dataView = new DataView(buffer);
		dataViewCache.set(buffer, dataView);
	}
	if (buffer.byteLength < 14) {
		throw Error('File too small to be a FIT file');
	}
	const headerLength = dataView.getUint8(0);
	if (buffer.byteLength < headerLength) {
		throw Error('File too small for the specified header size');
	}
	if (headerLength !== 14 && headerLength !== 12) {
		throw Error('Incorrect header size');
	}
	const fileTypeString = textDecoder.decode(buffer.slice(8, 12));
	if (fileTypeString !== '.FIT') {
		throw Error("Missing '.FIT' in header");
	}
}

/**
 * Parses a FIT file from an ArrayBuffer.
 *
 * This function first validates the input buffer using a sanity check. It then creates
 * a new instance of FitParser to parse the buffer. The function returns a Promise that
 * resolves with the parsed FIT data, or rejects if an error occurs during parsing.
 *
 * @param {ArrayBuffer} arrayBuffer - The FIT file data to be parsed.
 * @returns {Promise<Object>} A Promise that resolves with the parsed FIT data.
 */
async function parseFitFile(arrayBuffer) {
	checkFitSanity(arrayBuffer);
	const myFitParser = new FitParser();
	return new Promise((resolve, reject) => {
		myFitParser.parse(arrayBuffer, (error, data) => {
			if (error) {
				reject(error instanceof Error ? error : new Error(String(error)));
			} else {
				resolve(data);
			}
		});
	});
}

function extractLRBalFromFitData(fitData) {
	const LRbal = [];
	let hasLRBalance = false;

	for (let i = 0; i < fitData.records.length; i++) {
		const record = fitData.records[i];
		const bal = record.left_right_balance;
		if (bal !== undefined) {
			hasLRBalance = true;
			if (typeof bal === 'number') {
				LRbal.push(bal !== 127 ? bal : 50);
			}
		}
	}

	if (!hasLRBalance) {
		throw Error('No L/R balance data found in original FIT file');
	}
	return LRbal;
}

const BASE_URL = 'https://www.strava.com/activities';

async function fetchAndLoadLRData(pageView) {
	if (typeof pageView.isOwner !== 'function' || !pageView.isOwner()) {
		throw Error(
			'You do not have permission to view this activity. Please ensure you are logged in as the owner of the activity.',
		);
	}
	const fitResponse = await fetch(
		`${BASE_URL}/${pageView.activity().id}/export_original`,
	);
	if (!fitResponse.ok) {
		throw new Error(`Failed to fetch FIT file: ${fitResponse.statusText}`);
	}
	const arrayBuffer = await fitResponse.arrayBuffer();
	const parsedFitFile = await parseFitFile(arrayBuffer);
	const LRBal = extractLRBalFromFitData(parsedFitFile);

	pageView.streams().streamData.data.leftrightbalance = LRBal;
}

class LeftRightPowerBalanceFormatter extends Strava.I18n.ScalarFormatter {
	constructor() {
		super('percent', 0);
	}
	/**
	 * Formats the left/right balance value as a percentage ratio.
	 *
	 * @param {number} val - The left balance percentage.
	 * @returns {string} The formatted left/right balance string (e.g., "60/40").
	 */
	format(val) {
		return `${super.format(val)}/${super.format(100 - val)}`;
	}
}

const pageView = Strava.pageView;
const fetchedLRData = fetchAndLoadLRData(pageView);
fetchedLRData.catch((error) =>
	console.error('Failed to fetch L/R balance data:', error),
);
Strava.Charts.Activities.BasicAnalysisStacked.prototype.handleStreamsReady =
	async function handleLRBalanceStreamsReady() {
		try {
			await fetchedLRData;
		} catch (error) {
			console.error('Failed to fetch L/R balance data:', error);
		}
		try {
			const stream = 'leftrightbalance';
			const lrbalanceStream =
				this.context.streamsContext.streams.getStream(stream);
			const wattsStream =
				this.context.streamsContext.streams.getStream('watts');
			if (lrbalanceStream && !this.streamTypes.includes(stream)) {
				const getIntervalAverage =
					this.context.streamsContext.data.getIntervalAverage;
				this.context.streamsContext.data.getIntervalAverage = function (
					streamType,
					startIndex,
					endIndex,
				) {
					if (streamType == 'leftrightbalance') {
						startIndex = startIndex ? parseInt(startIndex) : 0;
						endIndex = endIndex
							? parseInt(endIndex)
							: lrbalanceStream.length - 1;
						const balanceSliced = lrbalanceStream.slice(
								startIndex,
								+endIndex + 1 || 9000000000,
							),
							wattsSliced = wattsStream.slice(
								startIndex,
								+endIndex + 1 || 9000000000,
							);
						const sumProducts = balanceSliced.reduce(
								(acc, value, index) => acc + value * wattsSliced[index],
								0,
							),
							sumWeights = wattsSliced.reduce((acc, weight) => acc + weight, 0);
						return sumProducts / sumWeights;
					}
					return getIntervalAverage.call(
						this,
						streamType,
						startIndex,
						endIndex,
					);
				};
				this.context.streamsContext.data.add(stream, lrbalanceStream);
				this.streamTypes.push(stream);
				const formatter = new LeftRightPowerBalanceFormatter();
				this.context.sportObject().streamTypes[stream] = { formatter };
				Strava.I18n.Locales.DICTIONARY.strava.charts.activities.chart_context[
					stream
				] = 'Balance L/R';
			}
		} catch (error) {
			console.error(`Failed to load L/R balance data: ${error}`);
		}
		await originalHandleStreamsReady.apply(this, arguments);
	};

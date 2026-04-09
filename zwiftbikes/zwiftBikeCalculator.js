// Fetch data from JSON files
async function fetchData(file) {
	const response = await fetch(file);
	const data = await response.json();
	return data;
}

// Fetch wheels, frames, and bikes data
async function getZwiftData() {
	const wheels = await fetchData(
		'https://userstyles.github.typpi.online/zwiftbikes/wheels.json',
	);
	const frames = await fetchData(
		'https://userstyles.github.typpi.online/zwiftbikes/frames.json',
	);
	const bikes = await fetchData(
		'https://userstyles.github.typpi.online/zwiftbikes/bikes.json',
	);
	return { wheels, frames, bikes };
}

// Calculate the best bike based on speed and climbing preferences
async function calculateBestBike() {
	const { wheels, frames, bikes } = await getZwiftData();
	const speedPreference = parseFloat(
		document.getElementById('speedPreference').value,
	);
	const climbPreference = parseFloat(
		document.getElementById('climbPreference').value,
	);

	let bestBike = '';
	let bestBikeSpeed = 0;
	let bestBikeClimb = 0;
	let bestBikeImageFrame = '';
	let bestBikeImageWheel = '';

	for (const bike of bikes) {
		const frame = frames.find((f) => f.frameid === bike.frameid);
		const wheel = wheels.find((w) => w.wheelid === bike.wheelid);

		if (frame && wheel) {
			const flatNumber =
				(parseFloat(frame.frameflatnumber) +
					parseFloat(wheel.wheelflatnumber)) /
				2;
			const climbNumber =
				(parseFloat(frame.frameclimbnumber) +
					parseFloat(wheel.wheelclimbnumber)) /
				2;

			if (flatNumber >= speedPreference && climbNumber >= climbPreference) {
				if (
					flatNumber > bestBikeSpeed ||
					(flatNumber === bestBikeSpeed && climbNumber > bestBikeClimb)
				) {
					bestBike = `Frame: ${frame.framemake} ${frame.framemodel} | Wheel: ${wheel.wheelmake} ${wheel.wheelmodel}`;
					bestBikeSpeed = flatNumber;
					bestBikeClimb = climbNumber;
					bestBikeImageFrame = frame.frameimg;
					bestBikeImageWheel = wheel.wheelimg;
				}
			}
		}
	}

	document.getElementById('bestBikeResult').innerHTML = `
        <p>Best Bike: ${bestBike}</p>
        <div>
            <img src="${bestBikeImageFrame}" alt="Frame Image">
            <img src="${bestBikeImageWheel}" alt="Wheel Image">
        </div>
    `;
}

// Fetch and display the best bike on button click
document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('button').addEventListener('click', () => {
		void calculateBestBike();
	});
});

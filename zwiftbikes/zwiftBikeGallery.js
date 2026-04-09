// Fetch data from JSON files
async function fetchData(file) {
	const response = await fetch(file);
	const data = await response.json();
	return data;
}

// Fetch wheels, frames, and bikes data
async function getZwiftData() {
	const wheels = await fetchData('wheels.json');
	const frames = await fetchData('frames.json');
	const bikes = await fetchData('bikes.json');
	return { wheels, frames, bikes };
}

// Generate bike gallery
async function generateGallery() {
	const { wheels, frames, bikes } = await getZwiftData();
	const gallery = document.getElementById('bikeGallery');
	gallery.innerHTML = '';

	for (const bike of bikes) {
		const frame = frames.find((f) => f.frameid === bike.frameid);
		const wheel = wheels.find((w) => w.wheelid === bike.wheelid);

		if (frame && wheel) {
			const bikeCard = document.createElement('div');
			bikeCard.className = 'bike-card';
			bikeCard.innerHTML = `
                <img src="${frame.frameimg}" alt="${frame.framemake} ${frame.framemodel}">
                <div class="bike-details">
                    <h3>${frame.framemake} ${frame.framemodel}</h3>
                    <p><strong>Frame Make:</strong> ${frame.framemake}</p>
                    <p><strong>Frame Model:</strong> ${frame.framemodel}</p>
                    <p><strong>Frame Price:</strong> ${frame.frameprice}</p>
                    <p><strong>Frame Level:</strong> ${frame.framelevel}</p>
                    <p><strong>Frame Aero:</strong> ${frame.frameaero}</p>
                    <p><strong>Frame Weight:</strong> ${frame.frameweight}</p>
                    <p><strong>Frame Type:</strong> ${frame.frametype}</p>
                    <p><strong>Frame Wheel Type:</strong> ${frame.framewheeltype}</p>
                    <p><strong>Frame Flat Number:</strong> ${frame.frameflatnumber}</p>
                    <p><strong>Frame Climb Number:</strong> ${frame.frameclimbnumber}</p>
                    <p><strong>Frame Flat Rank:</strong> ${frame.frameflatrank}</p>
                    <p><strong>Frame Climb Rank:</strong> ${frame.frameclimbrank}</p>
                    <p><strong>Frame Article:</strong> ${frame.framearticle}</p>
                    <p><strong>Frame Legacy:</strong> ${frame.framelegacy}</p>

                    <img src="${wheel.wheelimg}" alt="${wheel.wheelmake} ${wheel.wheelmodel}">
                    <h3>${wheel.wheelmake} ${wheel.wheelmodel}</h3>
                    <p><strong>Wheel Make:</strong> ${wheel.wheelmake}</p>
                    <p><strong>Wheel Model:</strong> ${wheel.wheelmodel}</p>
                    <p><strong>Wheel Price:</strong> ${wheel.wheelprice}</p>
                    <p><strong>Wheel Level:</strong> ${wheel.wheellevel}</p>
                    <p><strong>Wheel Aero:</strong> ${wheel.wheelaero}</p>
                    <p><strong>Wheel Weight:</strong> ${wheel.wheelweight}</p>
                    <p><strong>Wheel Fits Frame:</strong> ${wheel.wheelfitsframe}</p>
                    <p><strong>Wheel Flat Number:</strong> ${wheel.wheelflatnumber}</p>
                    <p><strong>Wheel Climb Number:</strong> ${wheel.wheelclimbnumber}</p>
                    <p><strong>Wheel Flat Rank:</strong> ${wheel.wheelflatrank}</p>
                    <p><strong>Wheel Climb Rank:</strong> ${wheel.wheelclimbrank}</p>
                    <p><strong>Wheel Article:</strong> ${wheel.wheelarticle}</p>
                </div>
            `;
			gallery.appendChild(bikeCard);
		}
	}
}

// Generate the gallery on page load
document.addEventListener('DOMContentLoaded', () => {
	void generateGallery();
});

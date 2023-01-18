import * as tf from '@tensorflow/tfjs';


let model;
async function initJagung() {
	console.log('model loading..');
	model = await tf.loadGraphModel(
		'https://raw.githubusercontent.com/muhamadilyas17/plant_disease/main/model/json/ModelJagung/modelJagung.json'
	);
	console.log('model loaded..');
}

let model1;
async function initMentimun() {
	console.log('model loading..');
	model1 = await tf.loadGraphModel(
		'https://raw.githubusercontent.com/muhamadilyas17/plant_disease/main/model/json/ModelMentimun/modelMentimun.json',
	);
	console.log('model loaded..');
}

let model2;
async function initPadi() {
	console.log('model loading..');
	model2 = await tf.loadGraphModel(
		'https://raw.githubusercontent.com/muhamadilyas17/plant_disease/main/model/json/ModelPadi/modelPadi.json',
	);
	console.log('model loaded..');
}

let model3;
async function initTomat() {
	console.log('model loading..');
	model3 = await tf.loadGraphModel(
		// 'https://raw.githubusercontent.com/muhamadilyas17/plant_disease/main/model/json/ModelTomat/modelTomat.json'
	);
	console.log('model loaded..');
}

const IMAGENET_CLASSES_JAGUNG = {
	0: 'Jagung (Cercospora leaf spot Gray leaf spot)',
	1: 'Jagung (Common rust)',
	2: 'Jagung (Bagus)',
	3: 'Jagung (Northern Leaf Blight)'
};

const IMAGENET_CLASSES_MENTIMUN = {
	0: 'Mentimun',
	1: 'Mentimun (Bagus)'
};

const IMAGENET_CLASSES_PADI = {
	0: 'Padi (BrownSpot)',
	1: 'Padi (Bagus)',
	2: 'Padi (Hispa)',
	3: 'Padi (LeafBlast)'
};

const IMAGENET_CLASSES_TOMAT = {
	0: 'Tomat (Bacterial spot)',
	1: 'Tomat (Early blight)',
	2: 'Tomat (Bagus)',
	3: 'Tomat (Late blight)',
	4: 'Tomat (Leaf Mold)',
	5: 'Tomat (Septoria leaf spot)',
	6: 'Tomat (Spider mites)',
	7: 'Tomat (Target Spot)',
	8: 'Tomat (Mosaic virus)',
	9: 'Tomat (Yellow Leaf Curl Virus)'
};

async function classifyJagung(
	imgClassified,
	btnPredict,
	spinnerGrow,
	classifiedIcon,
	classifiedName
) {
	setTimeout(() => {
		spinnerGrow.classList.add('d-none');
		btnPredict.disabled = false;
		classifiedIcon.classList.remove('d-none');
		classifiedName.classList.remove('d-none');
	}, 3000);

	// action for the submit button
	let tensorImg = tf.browser
		.fromPixels(imgClassified)
		.resizeNearestNeighbor([224, 224])
		.toFloat()
		.expandDims();
	let prediction = await model.predict(tensorImg).data();
	let results = Array.from(prediction)
		.map(function (p, i) {
			return {
				probability: p,
				className: IMAGENET_CLASSES_JAGUNG[i],
			};
		})
		.sort(function (a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	console.log(JSON.stringify(results));

	let diseasesTypes;
	switch (results[0].className) {
		case 'Jagung (Common rust)':
		// case 'Mentimun (Bagus)':
		// case 'Padi (Hispa)':
		// case 'Tomat (Leaf Mold)':
			diseasesTypes = 'Sehat';
			break;

		default:
			diseasesTypes = 'Sakit';
			break;
	}
	const penyakit = document.getElementById('penyakit');
	penyakit.innerText = `[${results[0].className}][${diseasesTypes}]`;
}

async function classifyMentimun(
	imgClassified,
	btnPredict,
	spinnerGrow,
	classifiedIcon,
	classifiedName
) {
	setTimeout(() => {
		spinnerGrow.classList.add('d-none');
		btnPredict.disabled = false;
		classifiedIcon.classList.remove('d-none');
		classifiedName.classList.remove('d-none');
	}, 3000);

	// action for the submit button
	let tensorImg = tf.browser
		.fromPixels(imgClassified)
		.resizeNearestNeighbor([224, 224])
		.toFloat()
		.expandDims();
	let prediction = await model.predict(tensorImg).data();
	let results = Array.from(prediction)
		.map(function (p, i) {
			return {
				probability: p,
				className: IMAGENET_CLASSES_MENTIMUN[i],
			};
		})
		.sort(function (a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	console.log(JSON.stringify(results));

	let diseasesTypes;
	switch (results[0].className) {
		// case 'Jagung (Common rust)':
		case 'Mentimun (Bagus)':
		// case 'Padi (Hispa)':
		// case 'Tomat (Leaf Mold)':
			diseasesTypes = 'Sehat';
			break;

		default:
			diseasesTypes = 'Sakit';
			break;
	}
	const penyakit = document.getElementById('penyakit');
	penyakit.innerText = `[${results[0].className}][${diseasesTypes}]`;
}

async function classifyPadi(
	imgClassified,
	btnPredict,
	spinnerGrow,
	classifiedIcon,
	classifiedName
) {
	setTimeout(() => {
		spinnerGrow.classList.add('d-none');
		btnPredict.disabled = false;
		classifiedIcon.classList.remove('d-none');
		classifiedName.classList.remove('d-none');
	}, 3000);

	// action for the submit button
	let tensorImg = tf.browser
		.fromPixels(imgClassified)
		.resizeNearestNeighbor([224, 224])
		.toFloat()
		.expandDims();
	let prediction = await model.predict(tensorImg).data();
	let results = Array.from(prediction)
		.map(function (p, i) {
			return {
				probability: p,
				className: IMAGENET_CLASSES_PADI[i],
			};
		})
		.sort(function (a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	console.log(JSON.stringify(results));

	let diseasesTypes;
	switch (results[0].className) {
		// case 'Jagung (Common rust)':
		// case 'Mentimun (Bagus)':
		case 'Padi (Hispa)':
		// case 'Tomat (Leaf Mold)':
			diseasesTypes = 'Sehat';
			break;

		default:
			diseasesTypes = 'Sakit';
			break;
	}
	const penyakit = document.getElementById('penyakit');
	penyakit.innerText = `[${results[0].className}][${diseasesTypes}]`;
}

async function classifyTomat(
	imgClassified,
	btnPredict,
	spinnerGrow,
	classifiedIcon,
	classifiedName
) {
	setTimeout(() => {
		spinnerGrow.classList.add('d-none');
		btnPredict.disabled = false;
		classifiedIcon.classList.remove('d-none');
		classifiedName.classList.remove('d-none');
	}, 3000);

	// action for the submit button
	let tensorImg = tf.browser
		.fromPixels(imgClassified)
		.resizeNearestNeighbor([224, 224])
		.toFloat()
		.expandDims();
	let prediction = await model.predict(tensorImg).data();
	let results = Array.from(prediction)
		.map(function (p, i) {
			return {
				probability: p,
				className: IMAGENET_CLASSES_TOMAT[i],
			};
		})
		.sort(function (a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	console.log(JSON.stringify(results));

	let diseasesTypes;
	switch (results[0].className) {
		// case 'Jagung (Common rust)':
		// case 'Mentimun (Bagus)':
		// case 'Padi (Hispa)':
		case 'Tomat (Leaf Mold)':
			diseasesTypes = 'Sehat';
			break;

		default:
			diseasesTypes = 'Sakit';
			break;
	}
	const penyakit = document.getElementById('penyakit');
	penyakit.innerText = `[${results[0].className}][${diseasesTypes}]`;
}

export { initJagung, initMentimun, initPadi, initTomat, classifyJagung, classifyMentimun, classifyPadi, classifyTomat };

import * as tf from '@tensorflow/tfjs';

const IMAGE_CLASSES_JAGUNG = {
	0: 'Jagung (Cercospora leaf spot Gray leaf spot)',
	1: 'Jagung (Common rust)',
	2: 'Jagung (Bagus)',
	3: 'Jagung (Northern Leaf Blight)'
};

const IMAGE_CLASSES_MENTIMUN = {
	0: 'Mentimun',
	1: 'Mentimun (Bagus)'
};

const IMAGE_CLASSES_PADI = {
	0: 'Padi (BrownSpot)',
	1: 'Padi (Bagus)',
	2: 'Padi (Hispa)',
	3: 'Padi (LeafBlast)'
};

const IMAGE_CLASSES_TOMAT = {
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

function DOMManipulation(classNameResult, diseasesTypes, adviceURL){
	const hasilKlasifikasi = document.getElementsByTagName('classify-result')[0];
	const tombolKlasifikasi = document.getElementById('btn-predict');
	const penyakit = document.getElementById('penyakit');
	const saran = document.getElementById('btn-advice');

	hasilKlasifikasi.style.height = '100%';
	tombolKlasifikasi.style.height = '300px';
	penyakit.innerText = `[${classNameResult}][${diseasesTypes}]`;
	saran.href = adviceURL;
	saran.style.display = 'block';
}

async function classifyJagung(
	imgClassified,
	btnPredict,
	spinnerGrow,
	classifiedIcon,
	classifiedName
) {

	const model = await tf.loadGraphModel(
		'https://raw.githubusercontent.com/muhamadilyas17/plant_disease/main/model/json/ModelJagung/modelJagung.json'
	);

	console.log(`model jagung load`);

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
				className: IMAGE_CLASSES_JAGUNG[i],
			};
		})
		.sort(function (a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	console.log(JSON.stringify(results));

	let diseasesTypes;
	let adviceURL;
	const classNameResult = results[0].className;
	switch (classNameResult) {
		case 'Jagung (Bagus)':
			diseasesTypes = 'Sehat';
			adviceURL = '#';
			break;

		default:
			diseasesTypes = 'Sakit';
			if(classNameResult === 'Jagung (Cercospora leaf spot Gray leaf spot)') {
				adviceURL = 'http://www.litbang.pertanian.go.id/search?q=penyakit+jagung%27#gsc.tab=0&gsc.q=penyakit%20jagung%20Gray%20leaf%20spot&gsc.sort=';
			} else if(classNameResult === 'Jagung (Common rust)') {
				adviceURL = 'http://www.litbang.pertanian.go.id/search?q=penyakit+jagung%27#gsc.tab=0&gsc.q=penyakit%20jagung%20Common%20rust&gsc.sort=';
			} else if(classNameResult === 'Jagung (Northern Leaf Blight)') {
				adviceURL = 'http://www.litbang.pertanian.go.id/search?q=penyakit+jagung%27#gsc.tab=0&gsc.q=penyakit%20jagung%20Northern%20Leaf%20Blight&gsc.sort=';
			} else {
				adviceURL = '#';
			}
			break;
	}

	// DOM Manipulation untuk mengubah tampilan pada setelah klasifikasi seperti mengubah text, mengubah link, dan mengubah style
	DOMManipulation(classNameResult, diseasesTypes, adviceURL);
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

	const model = await tf.loadGraphModel(
		'https://raw.githubusercontent.com/muhamadilyas17/plant_disease/main/model/json/ModelMentimun/modelMentimun.json',
	);

	console.log(`model mentimun load`);

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
				className: IMAGE_CLASSES_MENTIMUN[i],
			};
		})
		.sort(function (a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	console.log(JSON.stringify(results));

	let diseasesTypes;
	let adviceURL;
	const classNameResult = results[0].className;
	switch (classNameResult) {
		case 'Mentimun (Bagus)':
			diseasesTypes = 'Sehat';
			break;

		default:
			diseasesTypes = 'Sakit';
			adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+penyakit+mentimun+#gsc.tab=0&gsc.q=penanganan%20penyakit%20mentimun%20&gsc.page=1';
			break;
	}

	// DOM Manipulation untuk mengubah tampilan pada setelah klasifikasi seperti mengubah text, mengubah link, dan mengubah style
	DOMManipulation(classNameResult, diseasesTypes, adviceURL);
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

	const model = await tf.loadGraphModel(
		'https://raw.githubusercontent.com/muhamadilyas17/plant_disease/main/model/json/ModelPadi/modelPadi.json',
	);

	console.log(`model padi load`);

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
				className: IMAGE_CLASSES_PADI[i],
			};
		})
		.sort(function (a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	console.log(JSON.stringify(results));

	let diseasesTypes;
	let adviceURL;
	const classNameResult = results[0].className;
	switch (classNameResult) {
		case 'Padi (Bagus)':
			diseasesTypes = 'Sehat';
			break;

		default:
			diseasesTypes = 'Sakit';

			if(classNameResult === 'Padi (BrownSpot)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penganan+penyakit+pada+brown+spot#gsc.tab=0&gsc.q=penganan%20penyakit%20padi%20brown%20spot&gsc.sort=';
			} else if(classNameResult === 'Padi (Hispa)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penyakit+padi+hispa#gsc.tab=0&gsc.q=penanganan%20penyakit%20padi%20hispa&gsc.sort=';
			} else if(classNameResult === 'Padi (LeafBlast)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+penyakit+padi+leaf+blast#gsc.tab=0&gsc.q=penanganan%20penyakit%20padi%20leaf%20blast&gsc.sort=';
			}
			break;
	}
	
	// DOM Manipulation untuk mengubah tampilan pada setelah klasifikasi seperti mengubah text, mengubah link, dan mengubah style
	DOMManipulation(classNameResult, diseasesTypes, adviceURL);
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

	const model = await tf.loadGraphModel(
		'https://raw.githubusercontent.com/muhamadilyas17/plant_disease/main/model/json/ModelTomat/modelTomat.json'
	);

	console.log(`model tomat load`);

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
				className: IMAGE_CLASSES_TOMAT[i],
			};
		})
		.sort(function (a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	console.log(JSON.stringify(results));

	let diseasesTypes;
	let adviceURL;
	const classNameResult = results[0].className;
	switch (classNameResult) {
		case 'Tomat (Bagus)':
			diseasesTypes = 'Sehat';
			break;

		default:
			diseasesTypes = 'Sakit';
			if(classNameResult === 'Tomat (Bacterial spot)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+tomat+bacterial+spot#gsc.tab=0&gsc.q=penanganan%20tomat%20bacterial%20spot&gsc.page=1';
			} else if(classNameResult === 'Tomat (Early blight)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+tomat+early+blight#gsc.tab=0&gsc.q=penanganan%20tomat%20early%20blight&gsc.page=1';
			} else if(classNameResult === 'Tomat (Late blight))') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+tomat+late+blight#gsc.tab=0&gsc.q=penanganan%20tomat%20late%20blight&gsc.page=1';
			} else if(classNameResult === 'Tomat (Leaf Mold)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+tomat+leaf+mold#gsc.tab=0&gsc.q=penanganan%20tomat%20leaf%20mold&gsc.page=1';
			} else if(classNameResult === 'Tomat (Septoria leaf spot)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+tomat+septoria+leaf+spot#gsc.tab=0&gsc.q=penanganan%20tomat%20septoria%20leaf%20spot&gsc.page=1';
			} else if(classNameResult === 'Tomat (Spider mites)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+tomat+spider+mites#gsc.tab=0&gsc.q=penanganan%20tomat%20spider%20mites&gsc.page=1';
			} else if(classNameResult === 'Tomat (Target Spot)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+tomat+target+spot#gsc.tab=0&gsc.q=penanganan%20tomat%20target%20spot&gsc.page=1';
			} else if(classNameResult === 'Tomat (Mosaic virus)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+tomat+mosaic+virus#gsc.tab=0&gsc.q=penanganan%20tomat%20mosaic%20virus&gsc.page=1';
			} else if(classNameResult === 'Tomat (Yellow Leaf Curl Virus)') {
				adviceURL = 'https://www.litbang.pertanian.go.id/search?q=penanganan+tomat+yellow+leaf+curl+virus#gsc.tab=0&gsc.q=penanganan%20tomat%20yellow%20leaf%20curl%20virus&gsc.page=1';
			}
			break;
	}
	const penyakit = document.getElementById('penyakit');
	penyakit.innerText = `[${classNameResult}][${diseasesTypes}]`;
}

export { classifyJagung, classifyMentimun, classifyPadi, classifyTomat };

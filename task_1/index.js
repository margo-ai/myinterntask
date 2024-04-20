import { encoded, translations } from "./data.js";

let encodedIds = [];

const decoded = (encoded, translations) => {
	const decodedArray = encoded.map((item) => {
		const decodedObject = {};
		for (let key in item) {
			if (key.includes("Id") && key != "groupId") {
				encodedIds.push(item[key]);
				for (let newKey in translations) {
					if (item[key] == newKey) {
						decodedObject[key] = translations[newKey];
					}
				}
			} else {
				decodedObject[key] = item[key];
			}
		}
		return decodedObject;
	});
	return decodedArray;
};

decoded(encoded, translations);
const findUniqueIds = (value, index, array) => {
	return array.filter((item) => item === value).length === 1;
};
const uniqueIds = encodedIds.filter(findUniqueIds);
console.log(uniqueIds);

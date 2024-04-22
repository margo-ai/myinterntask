// решила добавить второй вариант решения задачи (посложнее): в отличие от первой, функции декодировки и поиска уникальных id не зависят друг от друга, и подзадачи вынесены в отдельные функции

import { encoded, translations } from "./data.js";

const isIdKey = (key, except) => {
	return key.includes("Id", -1) && !except?.includes(key);
};

const isDecodedIdKey = (key) => {
	return isIdKey(key, ["groupId"]);
};

const decoded = (encoded, translations) => {
	const encodedCopy = JSON.parse(JSON.stringify(encoded));

	encodedCopy.forEach((obj) => {
		for (const key in obj) {
			// id, которых нет в translations, и которые имеют значение пустой строки, поменяла на null
			if (isDecodedIdKey(key) && obj[key]) {
				obj[key] = translations[obj[key]] || null;
			}
		}
	});

	return encodedCopy;
};
const decodedList = decoded(encoded, translations);
console.log(decodedList);

const countIds = (encoded) => {
	const counter = {};

	encoded.forEach((obj) => {
		for (const key in obj) {
			if (isDecodedIdKey(key)) {
				const id = obj[key];

				if (id) {
					counter[id] = (counter[id] || 0) + 1;
				}
			}
		}
	});

	return counter;
};

const findUniqIds = (encoded) => {
	const counter = countIds(encoded);

	return Object.keys(counter).filter((id) => counter[id] === 1);
};

const uniqIds = findUniqIds(encoded);
console.log(uniqIds);

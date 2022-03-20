const fs = require('fs');

const path = require('path');

function save(bookData) {
	try {
		fs.writeFileSync(path.join(__dirname, '..', 'data', 'books.json'), JSON.stringify(bookData));

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

module.exports = {
	save
};

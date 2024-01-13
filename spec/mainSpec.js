import jsdom from 'jsdom';
import fetch from 'node-fetch';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-stats-preview-jasmine/';

const getData = async () => {
	return fetch(url)
		.then((res) => {
			return res.text();
		})
		.then((body) => {
			const { document } = new JSDOM(body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a string type of heading one content element', () => {
		const headingOneEl = document.querySelector('h1');
		const headingOneContent = headingOneEl.textContent;

		expect(headingOneContent).toBeInstanceOf(String);
	});

	it("should have a mark element that contains 'insights' word", () => {
		const cardTitleEl = document.querySelector('.card__title');
		const cardMark = cardTitleEl.querySelector('mark').textContent;

		expect(cardMark).toContain('insights');
	});

	it('should have two children inside of the article element', () => {
		const articleEl = document.querySelector('article');
		const articleChildrenEls = articleEl.children;

		expect(articleChildrenEls).toHaveSize(2);
	});

	it('should have an empty alt attribute value of card image element', () => {
		const cardImgEl = document.querySelector('.card__image img');
		const cardImgAlt = cardImgEl.getAttribute('alt');

		expect(cardImgAlt).toBe('');
	});
});

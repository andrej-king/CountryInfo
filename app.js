const express       = require('express');
const bodyParser    = require('body-parser');
const axios         = require('axios');
const ejs           = require('ejs');
const app           = express();
const PORT          = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); // allow read files from folder
app.set('view engine', ejs); // set view engine

app.get('/', (req, res) => {
	let countries = 'https://restcountries.eu/rest/v2/all';

	axios.get(countries)
		.then((responce) => {
			res.render('index.ejs', {result: false, countryList: responce.data, countriesResult: ''});
		})
		.catch((error) => {
			console.log(error);
		});
});

app.post('/', (req, res) => {
	let country = req.body.country;
	let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
	let countries = 'https://restcountries.eu/rest/v2/all';

	axios.get(countries)
		.then((responce) => {
			let selectedCountry = '';
			responce.data.forEach(element => {
				if (element.name === country) {
					selectedCountry = element;
				}
			})
			res.render('index.ejs', {result: true, countryList: responce.data, countriesResult: selectedCountry})
		})
		.catch((error) => {
			console.log(error)
		});
});

app.listen(PORT, () => {
	console.log(`Port ${PORT} is running`);
});
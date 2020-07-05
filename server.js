const express = require('express');
const app = express();
const port = 5000;
const request = require('request');
const cheerio = require('cheerio');

app.get('/coronavirus', (req, res) =>
    request("https://www.worldometers.info/coronavirus/", function(error, response, body) {
        if (error) {
            res.send(response.statusCode);
        }

        let country = [];
        let $ = cheerio.load(body);
        $('tbody>tr').each(function(index, element) {
            country[index] = {};
            country[index]['number'] = $(element).find('td:nth-child(1)').text().trim();
            country[index]['country'] = $(element).find('td:nth-child(2)').text().trim();
            country[index]['totalCases'] = $(element).find('td:nth-child(3)').text().trim();
            country[index]['totalDeaths'] = $(element).find('td:nth-child(4)').text().trim();
            country[index]['newDeath'] = $(element).find('td:nth-child(5)').text().trim();
            country[index]['totalRecovered'] = $(element).find('td:nth-child(6)').text().trim();
            country[index]['activeCases'] = $(element).find('td:nth-child(7)').text().trim();
            country[index]['seriousCases'] = $(element).find('td:nth-child(8)').text().trim();
            country[index]['seriousCritical'] = $(element).find('td:nth-child(9)').text().trim();
        });

        res.json(country);
    })
);

/* app.get('/area', (req, res) =>
    request("https://www.worldometers.info/coronavirus/", function(error, response, body) {
        if (error) {
            res.send(response.statusCode);
        }

        let continent = [];
        let $ = cheerio.load(body);
        continent[0] = $('#nav-all-tab').text().trim();
        continent[1] = $('#nav-europe-tab').text().trim();
        continent[2] = $('#nav-na-tab').text().trim();
        continent[3] = $('#nav-asia-tab').text().trim();
        continent[4] = $('#nav-sa-tab').text().trim();
        continent[5] = $('#nav-africa-tab').text().trim();
        continent[6] = $('#nav-oceania-tab').text().trim();
        res.json(continent);
    })
); */

app.listen(port, () => console.log(`Server Started On Port ${port}`));
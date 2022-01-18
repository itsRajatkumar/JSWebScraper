const ObjectsToCsv = require('objects-to-csv')
const fs = require('fs');
const express = require("express")
const cheerio = require("cheerio")
const axios = require("axios")

const PORT = 8000
const app = express()
const url = 'https://github.com/itsRajatkumar?tab=repositories'


axios(url).then(response => {
    const htmlresponse = response.data
    const $ = cheerio.load(htmlresponse, null, false)
    const data = [] //empty array
    $('.wb-break-all').each((i,dat) => {
        const title = $(dat).find('a').text()

        const repourl = $(dat).find('a').attr('href')
        data.push({ title , repourl})
    });

    // console.log(data)
    
    // convert data to csv string
    // const csvv = convertArrayOfObjectsToCSV({data: data})
    // console.log(csvv)
    
    // savig file
    savefile(data);

}).catch(err => console.log(err))

app.listen(PORT , ()=> console.log(`server running on port ${PORT}`))


async function savefile(datacsv){
    const csvsave = new ObjectsToCsv(datacsv)
    await csvsave.toDisk('./list.csv', { append: true })
}


// function convertArrayOfObjectsToCSV(args) {  
//     var result, ctr, keys, columnDelimiter, lineDelimiter, data;

//     data = args.data || null;
//     if (data == null || !data.length) {
//         return null;
//     }

//     columnDelimiter = args.columnDelimiter || ',';
//     lineDelimiter = args.lineDelimiter || '\n';

//     keys = Object.keys(data[0]);

//     result = '';
//     result += keys.join(columnDelimiter);
//     result += lineDelimiter;

//     data.forEach(function(item) {
//         ctr = 0;
//         keys.forEach(function(key) {
//             if (ctr > 0) result += columnDelimiter;

//             result += item[key];
//             ctr++;
//         });
//         result += lineDelimiter;
//     });

//     return result;
// }

const axios = require('axios'); // For HTTP Requests
const cheerio = require('cheerio');// For parsing the HTML 
const csv = require('csv-writer').createObjectCsvWriter;

// URL of Flipkart
const flipkartSearchURL = (page) => `https://www.flipkart.com/search?q=iPhone&page=${page}`;

const crawlFlipkartSearchPage = async (page) => {
    try {
        // Getting response from flipkart and added header for the browsers
        const response = await axios.get(flipkartSearchURL(page), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to retrieve the page ${flipkartSearchURL(page)}. Error: ${error.message}`);
        return null;
    }
};
// extracting data from the page
const extractDataFromPage = (htmlContent) => {
    const $ = cheerio.load(htmlContent);
    const products = $('div._1AtVbE');

    const data = [];
    products.each((index, element) => {
        const nameTag = $(element).find('div._4rR01T');
        const price = $(element).find('div._30jeq3').text().trim() || "N/A";
        const rating = $(element).find('div._3LWZlK').text().trim() || "N/A";
        let ROM="";
        let  display=""
        let camera="";
        let proc=""
        $(element).find('div.fMghEO').each((specIndex, specElement) => {
            const str=$(specElement).text().trim();
            const ind_rom=str.indexOf("ROM");
            const ind_disp=str.indexOf("Display");
            const ind_camera=str.indexOf("Camera");
            const ind_proc=str.indexOf("Processor");
            ROM=str.slice(0,ind_rom+3);
            display=str.slice(ind_rom+3,ind_disp+7);
            camera=str.slice(ind_disp+7,ind_camera+6);
            proc=str.slice(ind_camera+6,ind_proc+9);
        });  


        // Check if nameTag is present before trying to extract text
        const name = nameTag.length ? nameTag.text().trim() : "N/A";

        if(name!=='N/A'){
            data.push({ 'Name': name, 'Price': price, 'Rating': rating ,'ROM':ROM,'DISPLAY':display,'CAMERA':camera,'PROCESSOR':proc.toString()});}
    });

    return data;
};

const saveToCSV = (data, filename) => {
    // CSV saving format
    const csvWriter = csv({
        path: filename,
        header: [
            { id: 'Name', title: 'Name' },
            { id: 'Price', title: 'Price' },
            { id: 'Rating', title: 'Rating' },
            { id: 'ROM', title: 'ROM' },
            { id: 'DISPLAY', title: 'DISPLAY' },
            { id: 'CAMERA', title: 'CAMERA' },
            { id: 'PROCESSOR', title: 'PROCESSOR' }

        ]
    });

    //writing data to csv
    csvWriter.writeRecords(data)
        .then(() => console.log(`Data saved to ${filename}`))
        .catch(error => console.error(`Error writing to CSV: ${error.message}`));
};

const totalPages = 10; // Change this to the number of pages you want to crawl
const allData = [];

// data crawling
const crawlAndExtractData = async () => {
    for (let page = 1; page <= totalPages; page++) {
        const htmlContent = await crawlFlipkartSearchPage(page);

        if (htmlContent) {
            const data = extractDataFromPage(htmlContent);
            allData.push(...data);
        }
    }
    saveToCSV(allData, 'iphone_data.csv');
};

// function call
crawlAndExtractData();

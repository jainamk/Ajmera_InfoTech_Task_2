# Web Scraping Task

This script is designed to scrape information about iPhones from the Flipkart website. It extracts details such as product name, price, rating, and specifications from the search results page and stores the data in a structured CSV file.

## Prerequisites

Before running the script, make sure you have the following installed:

- Node.js (https://nodejs.org/)

## Installation

1. **Clone this repository:**

   ```bash
   git clone https://github.com/jainamk/Ajmera_InfoTech_Task_2
2. **Navigate to the project directory:**
	```bash
	cd Ajmera_InfoTech_Task_2
3. **Install Dependencies**
	```bash
	npm install axios cheerio csv-writer

## Usage

1.  Open the `index.js` file and update the `totalPages` variable with the desired number of pages to scrape.
    
2.  **Run the script:**
	```bash
	node index.js
	```
	This will initiate the web scraping process, and the extracted data will be saved to a file named `iphone_data.csv` in the project directory.
## Customize

Feel free to customize the script to fit your specific needs. You may want to adjust the selectors used for data extraction based on the HTML structure of the Flipkart website.

## Dependencies

-   **Axios:** A promise-based HTTP client for Node.js and browsers.
-   **Cheerio:** A fast, flexible, and lean implementation of core jQuery designed specifically for the server.


	


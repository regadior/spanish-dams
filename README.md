# Dam Data Scraping

This is a simple **scraping** project to collect dam data from the website [embalses.net](https://www.embalses.net/cuencas.php). The primary goal of this project is to gather real-time information on Spain's dams, including water levels, capacity, and variations compared to previous weeks and the same period of previous years.

## Features

- **Dam Data Scraping**: The project scrapes dam data from the website [embalses.net](https://www.embalses.net/cuencas.php) using **cheerio** and **fetch**.
- **Dam Information**: The data scraped includes the dam's name, water level, water percentage, total capacity, variation compared to last week, and comparisons to the same period from last year.
- **Simple API**: A simple REST API exposes the dam data in JSON format.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/regadior/spanish-dams.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the application in development mode:

   ```bash
   npm run dev
   ```

   The application will start running on the default port (3000) or the port specified in the `.env` file.

## How It Works

### Cheerio:

Cheerio is used to scrape the data from the target website. It loads the HTML structure of the web page and allows you to query and extract the relevant data. It behaves similarly to jQuery, providing an easy way to interact with HTML elements and traverse the document.

In this project, **cheerio** is used to:

- Load the HTML of the main dam data page and find tables with information about dams.
- Navigate through the HTML structure to get the desired information about each dam.
- Scrape additional data from individual dam pages by following links extracted from the main page.

### API:

A simple API is created using **Express** that serves the scraped data in JSON format when you make a **GET** request to `/api/data`.

## Endpoints

- **GET /api/data**: Returns the scraped dam data in JSON format.

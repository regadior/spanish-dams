# Dam Data Scraping

This is a simple **scraping** project to collect dam data from the website [embalses.net](https://www.embalses.net/cuencas.php). The primary goal of this project is to gather real-time information on Spain's dams, including water levels, capacity, and variations compared to previous weeks and the same period of previous years.

## Features

- **Dam Data Scraping**: The project scrapes dam data from the website [embalses.net](https://www.embalses.net/cuencas.php) using **cheerio** and **fetch**.
- **Dam Information**: The data scraped includes the dam's name, water level, water percentage, total capacity, variation compared to last week, and comparisons to the same period from last year.
- **Simple API**: A simple REST API exposes the dam data in JSON format.

## Technologies

- **Node.js**: JavaScript runtime for server-side applications.
- **Express**: A Node.js framework for building the REST API.
- **Cheerio**: A library for scraping and parsing HTML.
- **Fetch API**: Used for making HTTP requests.
- **Winston**: A logging library for logging purposes.
- **Winston-Daily-Rotate-File**: A transport for logging to rotating files.

## Installation

### Prerequisites

Ensure that **Node.js** is installed on your machine. You can check by running:

```bash
node -v

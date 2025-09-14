# Car App – Pilot Project for Omran Software

This project is a pilot application commissioned by **Omran Software**. It is a control panel for a company specializing in used car sales. The dashboard automates key business processes and provides clear insights into sales, car inventory, and business performance.

## Features

- **Cars Management:** Add, update, and delete cars.  
- **Sales Management:** Add, update, and delete sales.  
- **Inspections:** Add, update, and delete periodic inspections.  
- **Details & Categorization:** View details of cars, sales, and inspections, categorized by type.  
- **Search & Filtering:** Efficiently search and filter cars, sales, and inspections.  
- **Statistics:** Quick insights with charts and trends for better business decisions.  
- **ChatBot Integration:** An AI-powered ChatBot using Gemini LLM and MCP, capable of answering questions related to the site and its data.  

### Statistics

- **Monthly Profit & Loss:** Displays monthly sales revenue (profit) and car purchases + repair costs (loss).  
- **Monthly Car Sales by Type:** Line chart showing the number of cars sold each month, categorized by Luxury, Economy, and Electric.  
- **Car Distribution by Type:** Relative pie chart showing proportions of Luxury, Economy, and Electric cars.  

## Technologies Used

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Server:** RESTful web server  
- **AI:** Gemini LLM for ChatBot, MCP for connecting site data to the bot  

## Getting Started

To run the project locally, clone the repository, install dependencies, and start both server and client:  

```bash
git clone https://github.com/malik-1104/car-app.git
cd server
npm install
cd ../client
npm install
cd ../server
npm start
cd ../client
npm run dev

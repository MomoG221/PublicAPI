// Importing required modules
import express from "express"; // Importing Express framework
import bodyParser from "body-parser"; // Middleware to parse request bodies
import axios from "axios"; // HTTP client for making requests

// Initializing Express app
const app = express();
const port = 3000; // Port number on which the server will listen

const API_URL = "https://api.coinbase.com/v2/prices/"; // Base URL for Coinbase API

// Serving static files from 'public' directory
app.use(express.static("public"));

// Parsing incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Handling GET request to the root URL
app.get("/", (req, res) => {
    // Rendering the 'index.ejs' template
    res.render("index.ejs");
});

// Handling POST request to the '/submit' endpoint
app.post("/submit", async (req, res) => {
    try {
        // Extracting the cryptocurrency code from the request body
        const crypto = req.body.crypto;
        const currency = req.body.currency;
        // Sending a GET request to Coinbase API to fetch the price of the specified cryptocurrency
        const result = await axios.get(API_URL + crypto + "-" + currency + "/buy");
        // Extracting the price from the API response
        const price = result.data.data.amount;
        // Rendering the 'index.ejs' template with the price and cryptocurrency code
        res.render("index.ejs", { content: price, crypto: crypto, currency: currency});
    } catch (error) {
        // Handling errors - rendering the 'index.ejs' template with an error message
        res.render("index.ejs", { error: "Crypto code AND/OR currency not found" });
    } 
});

// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

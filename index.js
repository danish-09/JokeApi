import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const baseUrl = "https://v2.jokeapi.dev/joke/";

// styling
app.use(express.static("public"));
// body parser which comes with express
app.use(express.urlencoded({ extended: true }));

// Checks if value is array
function check_array(value)
{
    if(Array.isArray(value))
    {
        return value.join(",");
    }
    else
    {
        return value;
    }
}

// middleware for input validation
function validateRequest(req, res, next) 
{
    
    const { amount} = req.body;

    if (amount && (isNaN(amount) || amount < 1)) 
    {
        return res.status(400).send("Amount must be a positive number.");
    }

    next();
}


// route to render homepage
app.get("/", (req, res) => {
    res.render("index.ejs");

});


// route for form submission
app.post("/submitform", validateRequest, async (req, res) => {
    try {
        
        let category="";
        let blacklist="";

        // for custom 
        if(req.body.catselect!=="Any")
        {
            if(req.body.cj)
            {
                category=check_array(req.body.cj);
            }
            else
            {
                category="Any";
            }
        }
        // for any
        else
        {
            category = req.body.catselect;
        }
        
        // instance of object for url
        let params = new URLSearchParams();

        // check for langauge
        if (req.body.language && req.body.language !== "en") {
            params.append("lang", req.body.language);
        }

        // check for blacklist flags
        if (req.body.blacklist) {
            blacklist=check_array(req.body.blacklist);
            params.append("blacklistFlags", blacklist);
        }

        // check for response format
        if (req.body.responseformat && req.body.responseformat !== "json") {
            params.append("format", req.body.responseformat);
        }

        // check for joketype
        if (Array.isArray(req.body.joketype)) {
            if(req.body.joketype.length===1)
            {
                params.append("type",req.body.joketype[0]);
            }
        }
        else if (typeof req.body.joketype === "string"){
            params.append("type",req.body.joketype);
        }

        // check for search term
        if (req.body.search && req.body.search.length > 0) {
            params.append("contains", req.body.search);
        }

        // check for amount of jokes
        if (req.body.amount && req.body.amount >= 1) {
            params.append("amount", req.body.amount);
        }
        
        // check for safe-mode
        if(req.body.safe==="on")
        {
            params.append("safe-mode","");
        }

        //construct url
        const f_url = `${baseUrl}${category}?${params.toString()}`;
        console.log("fetching from url:", f_url);
        
        // axios for requqests
        const result = await axios.get(f_url);
        
        // logs user input
        console.log(req.body);

        // for response format:json
        if(req.body.responseformat==="json")
        {
            // one joke
            if (req.body.amount == 1) {
                if (result.data.setup) {
                    res.render("index.ejs", { joke_p1: result.data.setup, joke_p2: result.data.delivery });
                } else if (result.data.joke) {
                    res.render("index.ejs", { joke: result.data.joke });
                } else {
                    res.render("index.ejs", { joke: "No valid joke data received." });
                }
            } 
            // multiple jokes
            else if (req.body.amount > 1) {
                if (Array.isArray(result.data.jokes)) {
                    res.render("index.ejs", { jokes: result.data.jokes });
                } else {
                    res.render("index.ejs", { jokes: "No valid joke data received." });
                }
            }
            // amount of jokes not selected
            else {
                res.render("index.ejs", { joke: "Invalid request." });
            }
        }

        // for other response formats
        else
        {
            res.render("index.ejs", {joke:result.data});
        }
      
    }

    catch (error) {
        console.error("Error fetching joke:", error);
        res.render("index.ejs", { joke: "Failed to fetch a joke. Please try again later." });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

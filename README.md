# Joke API application

A simple web application that allows users to request jokes from [JokeAPI](https://jokeapi.dev/) 

## Features
- Select joke categories (e.g., Dark, Programming, Pun)
- Apply blacklist filters (e.g., NSFW, religious, sexist)
- Choose joke format (single or two-part)
- Search for specific words in jokes
- Specify joke language and response format
- Fetch multiple jokes at once

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed

## Dependencies
 - Axios
 - EJS
 - Express

## Usage
- Fill in the form on the homepage to specify joke preferences.
- Click the submit button to fetch jokes.
- The jokes will be displayed according to the selected filters.

## License
This project is open-source and available under the MIT License. 

## API Reference
This project uses the [JokeAPI](https://sv443.net/jokeapi/v2/) to fetch jokes.  
For more details on available endpoints and data structure, visit the API documentation.

## Future improvements
- Adding the logic for handling ID Range (checkout documentation of API)
- Improving the style of the frontend
  
## Contributions
- Fork the repository
- Create a new branch
  `git checkout -b feature-branch`
- Make your changes and commit them
  `git commit -m "Describe your changes"`
- Push the changes to your forked repository
  `git push origin feature-branch`
- Open a pull request.

## Usage
 - Clone the repository
 - Navigate to project directory
 - Install dependencies using `npm install`
 - Start server using `node index.js`
 - Open browser and navigate to `http://localhost:3000/`

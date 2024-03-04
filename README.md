# Movie Search Project

This project integrates with the OMDB API to search for movie trailers and awards. It provides a user-friendly interface for users to search for movies, view trailers, and awards, as well as detailed information about each movie.

## Features

- Search for movie trailers and awards using the OMDB API.
- Display trailers and awards in separate sections.
- View detailed information about each movie, including title, year, type, country, actors, plot, genre, director, awards, rating, duration, and more.
- Responsive layout for easy viewing on different devices.
- Login and registration functionality to access the movie search features.

## Technologies Used

- HTML
- CSS (Tailwind CSS)
- JavaScript
- OMDB API

## How to Use

1. Clone the repository to your local environment.
   ```bash
   git clone https://github.com/your-username/movie-search-project.git
   ```

2. Open the `movie.html` file in your web browser.

3. Use the search bar to search for movies by title, actor, genre, or any other relevant keyword.

4. Click on the movie titles to view detailed information about each movie.

5. To access additional features such as saving favorite movies or accessing personalized recommendations, register or login using the provided forms.

## API Configuration

This project uses the OMDB API to fetch movie data. Before running the project, obtain an API key from OMDB [here](https://www.omdbapi.com/apikey.aspx) and replace the `API_KEY` variable in the `script.js` file with your key.

```javascript
// script.js
const API_KEY = 'Your-API-Key-Here';
```

## Contributions

Contributions are welcome! If you encounter any issues or have improvements to suggest, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
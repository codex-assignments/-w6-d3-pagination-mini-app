# -w6-d3-pagination-mini-app
Goal: Build a tiny list that loads paged results and handles rate-limit feedback. 

Approved APIs (pick one)
PokéAPI — /pokemon?offset=0&limit=10
SWAPI — /people/?page=1
OpenLibrary — /search.json?q=javascript&page=1
Rick and Morty API — /character/?page=1
GitHub Search — /search/repositories?q=react&page=1&per_page=10
Steps
Create index.html and app.js. Add Next and Prev buttons and a small results area.
Fetch page 1 on load. Show a loading message while fetching.
On Next and Prev, update the current page and reload results.
Render 5–10 rows using textContent. Also display the current page number and total items if the API provides it.
Handle a rate-limit or error path:
If you receive a 429 or a rate-limited 403, show a friendly message.
Keep functions small and well named. Commit after each feature.
Deliverable: Public repo w6-d3-pagination-mini-app with your code and a brief README.md (API chosen, parameters used, any rate-limit headers you observed).
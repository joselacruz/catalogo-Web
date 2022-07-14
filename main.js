

fetch("https://pokeapi.co/api/v2/")
    .then(response => response.json())
    .then(data => console.log(data));

let bio = document.getElementById("ironman_bio");
let comics = document.getElementById("comics");
let movies = document.getElementById("movies");
let ironman_image = document.getElementById("ironman_image");
let comic_image = document.getElementById("comic_image");
let comic_title = document.getElementById("comic_title");

const ts = 'HelloWorld123';
const apiKey = '58cf9dccb6a433565258dd4185258cc5';
const hash = '6a3f4d8c242a80ba92ccd1d638bc7c4f';
const characterName = 'Iron Man';

function getIronManData() {
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(characterName)}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // ...

      // Fetch and render comics
      data.data.results[0].comics.items.forEach(comic => {
        const comicId = comic.resourceURI.split('/').pop();
        const comicApiUrl = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

        fetch(comicApiUrl)
          .then(response => response.json())
          .then(comicData => {
            const comic = comicData.data.results[0];

            // Render comic title
            let comicTitle = comic.title;
            let comicImage = comic.thumbnail.path + '.' + comic.thumbnail.extension;

            // Create comic element
            let comicElement = document.createElement('div');
            comicElement.classList.add('mb-2');

            // Create comic title element
            let titleElement = document.createElement('h3');
            titleElement.classList.add('text-lg', 'font-bold');
            titleElement.textContent = comicTitle;
            comicElement.appendChild(titleElement);

            // Create comic image element
            let imageElement = document.createElement('img');
            imageElement.src = comicImage;
            imageElement.alt = comicTitle;
            imageElement.classList.add('w-full', 'max-w-xs', 'mb-2');
            comicElement.appendChild(imageElement);

            // Append comic element to the comics container
            comics.appendChild(comicElement);
          })
          .catch(error => {
            console.log('Error fetching comic:', error);
          });
      });
    })
    .catch(error => {
      console.log('Error fetching Iron Man data:', error);
    });
}

getIronManData();



getIronManData();

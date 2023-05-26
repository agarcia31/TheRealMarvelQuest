const ts = 'HelloWorld123';
const apiKey = '58cf9dccb6a433565258dd4185258cc5';
const hash = '6a3f4d8c242a80ba92ccd1d638bc7c4f';
const characterName = 'Iron Man';

const bio = document.getElementById('ironman_bio');
const comics = document.getElementById('comics');
const movies = document.getElementById('movies');
const ironman_image = document.getElementById('ironman_image');
const comic_image = document.getElementById('comic_image');
const comic_title = document.getElementById('comic_title');

function getIronManData() {
  const characterUrl = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(
    characterName
  )}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  fetch(characterUrl)
    .then((response) => response.json())
    .then((data) => {
      const ironMan = data.data.results[0];

      // Render character bio
      bio.textContent = ironMan.description;

      // Render character image
      ironman_image.src = `${ironMan.thumbnail.path}.${ironMan.thumbnail.extension}`;
      ironman_image.alt = ironMan.name;

      // Fetch and render comics
      ironMan.comics.items.forEach((comic) => {
        const comicId = comic.resourceURI.split('/').pop();
        const comicUrl = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

        fetch(comicUrl)
          .then((response) => response.json())
          .then((comicData) => {
            const comic = comicData.data.results[0];

            // Render comic title
            const comicTitle = comic.title;
            const comicImage = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

            // Create comic element
            const comicElement = document.createElement('div');
            comicElement.classList.add('mb-2');

            // Create comic title element
            const titleElement = document.createElement('h3');
            titleElement.classList.add('text-lg', 'font-bold', 'text-base');
            titleElement.textContent = comicTitle;
            comicElement.appendChild(titleElement);

            // Create comic image element
            const imageElement = document.createElement('img');
            imageElement.src = comicImage;
            imageElement.alt = comicTitle;
            imageElement.classList.add('w-full', 'max-w-xs', 'mb-2');
            comicElement.appendChild(imageElement);

            // Append comic element to the comics container
            comics.appendChild(comicElement);
          })
          .catch((error) => {
            console.log('Error fetching comic:', error);
          });
      });

      // Fetch and render series
      ironMan.series.items.forEach((series) => {
        const seriesId = series.resourceURI.split('/').pop();
        const seriesUrl = `https://gateway.marvel.com/v1/public/series/${seriesId}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

        fetch(seriesUrl)
          .then((response) => response.json())
          .then((seriesData) => {
            const series = seriesData.data.results[0];

            // Render series title
            const seriesTitle = series.title;
            const seriesImage = `${series.thumbnail.path}.${series.thumbnail.extension}`;

            // Create series element
            const seriesElement = document.createElement('div');
            seriesElement.classList.add('w-full', 'max-w-xs', 'mb-2');

            // Create series title element
            const titleElement = document.createElement('h3');
            titleElement.classList.add('text-lg', 'font-bold', 'text-base');
            titleElement.textContent = seriesTitle;
            seriesElement.appendChild(titleElement);

            // Create series image element
            const imageElement = document.createElement('img');
            imageElement.src = seriesImage;
            imageElement.alt = seriesTitle;
            imageElement.classList.add('w-full', 'max-w-xs', 'mb-2');
            seriesElement.appendChild(imageElement);

            // Append series element to the movies container
            movies.appendChild(seriesElement);
          })
          .catch((error) => {
            console.log('Error fetching series:', error);
          });
      });
    })
    .catch((error) => {
      console.log('Error fetching Iron Man data:', error);
    });
}

getIronManData();
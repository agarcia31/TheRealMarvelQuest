const ts = 'HelloWorld123';
const apiKey = '58cf9dccb6a433565258dd4185258cc5';
const hash = '6a3f4d8c242a80ba92ccd1d638bc7c4f';
const characterName = 'Iron Man';

const bio = document.getElementById('ironman_bio');
const comics = document.getElementById('comics');
const movies = document.getElementById('movies');
const ironman_image = document.getElementById('ironman_image');
const comic_image = document.getElementById('comic_image');

function fetchIronManData() {
  fetch(
    `https://gateway.marvel.com/v1/public/characters/1009368?ts=${ts}&apikey=${apiKey}&hash=${hash}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderHeroImage(data.data.results[0].thumbnail);
      renderHeroBio(data.data.results[0].description);
    })
    .catch((error) => {
      console.error('Error fetching Iron Man data:', error);
    });

  fetch(
    `https://gateway.marvel.com/v1/public/characters/1009368/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderComics(data.data.results);
    })
    .catch((error) => {
      console.error('Error fetching Iron Man comics:', error);
    });

  fetch(
    `https://gateway.marvel.com/v1/public/characters/1009368/series?ts=${ts}&apikey=${apiKey}&hash=${hash}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderSeries(data.data.results);
    })
    .catch((error) => {
      console.error('Error fetching Iron Man series:', error);
    });

  fetch(
    `https://gateway.marvel.com/v1/public/characters/1009368/events?ts=${ts}&apikey=${apiKey}&hash=${hash}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderEvents(data.data.results);
    })
    .catch((error) => {
      console.error('Error fetching Iron Man events:', error);
    });

  fetch(
    `https://gateway.marvel.com/v1/public/characters/1009368/stories?ts=${ts}&apikey=${apiKey}&hash=${hash}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderStories(data.data.results);
    })
    .catch((error) => {
      console.error('Error fetching Iron Man stories:', error);
    });
    fetch('http://localhost:3000/api/marvel/characters/1009368/movies?ts=HelloWorld123&apikey=58cf9dccb6a433565258dd4185258cc5&hash=6a3f4d8c242a80ba92ccd1d638bc7c4f')
    .then((response) => response.json())
    .then((data) => {
      // Process the movie data
    })
    .catch((error) => {
      console.error('Error fetching movies:', error);
    });

  fetch(
    `https://gateway.marvel.com/v1/public/characters/1009368/series?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
    .then((response) => response.json())
    .then((data) => {
      const series = data.data.results;
      if (series.length > 0) {
        const firstSeriesId = series[0].id;
        fetchCharactersBySeries(firstSeriesId);
      }
    })
    .catch((error) => {
      console.error('Error fetching Iron Man series:', error);
    });

  fetch(
    `https://gateway.marvel.com/v1/public/characters/1009368/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`
  )
    .then((response) => response.json())
    .then((data) => {
      const comics = data.data.results;
      if (comics.length > 0) {
        const firstComicId = comics[0].id;
        fetchCharactersByComic(firstComicId);
      }
    })
    .catch((error) => {
      console.error('Error fetching Iron Man comics:', error);
    });
}

function renderHeroImage(thumbnail) {
  const heroImage = document.getElementById('ironman_image');
  heroImage.src = `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
}

function renderHeroBio(description) {
  const heroBio = document.getElementById('ironman_bio');
  heroBio.textContent = description;
}

function renderComics(comics) {
  const comicsContainer = document.getElementById('comics');

  comics.forEach((comic) => {
    const comicElement = createComicElement(comic);
    comicsContainer.appendChild(comicElement);
  });
}

function createComicElement(comic) {
  const comicElement = document.createElement('div');
  comicElement.className = 'comic';
  
  const thumbnail = comic.thumbnail;
  const comicImage = document.createElement('img');
  comicImage.className = 'mb-4';
  comicImage.src = `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
  comicElement.appendChild(comicImage);

  const comicTitle = document.createElement('p');
  comicTitle.className = 'text-gray-700 text-base';
  comicTitle.textContent = comic.title;
  comicElement.appendChild(comicTitle);

  return comicElement;
}

function renderSeries(series) {
  const seriesContainer = document.getElementById('series');

  series.forEach((serie) => {
    const serieElement = createSerieElement(serie);
    seriesContainer.appendChild(serieElement);
  });
}

function createSerieElement(serie) {
  const serieElement = document.createElement('div');
  serieElement.className = 'serie';
  
  const thumbnail = serie.thumbnail;
  const serieImage = document.createElement('img');
  serieImage.className = 'mb-4';
  serieImage.src = `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
  serieElement.appendChild(serieImage);

  const serieTitle = document.createElement('p');
  serieTitle.className = 'text-gray-700 text-base';
  serieTitle.textContent = serie.title;
  serieElement.appendChild(serieTitle);

  return serieElement;
}

function renderEvents(events) {
  const eventsContainer = document.getElementById('events');

  events.forEach((event) => {
    const eventElement = createEventElement(event);
    eventsContainer.appendChild(eventElement);
  });
}

function createEventElement(event) {
  const eventElement = document.createElement('div');
  eventElement.className = 'event';
  
  const thumbnail = event.thumbnail;
  const eventImage = document.createElement('img');
  eventImage.className = 'mb-4';
  eventImage.src = `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
  eventElement.appendChild(eventImage);

  const eventTitle = document.createElement('p');
  eventTitle.className = 'text-gray-700 text-base';
  eventTitle.textContent = event.title;
  eventElement.appendChild(eventTitle);

  return eventElement;
}

function renderStories(stories) {
  const storiesContainer = document.getElementById('stories');

  stories.forEach((story) => {
    const storyElement = createStoryElement(story);
    storiesContainer.appendChild(storyElement);
  });
}

function createStoryElement(story) {
  const storyElement = document.createElement('div');
  storyElement.className = 'story';

  const thumbnail = story.thumbnail;
  if (thumbnail) {
    const storyImage = document.createElement('img');
    storyImage.className = 'mb-4';
    storyImage.src = `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
    storyElement.appendChild(storyImage);
  }

  const storyTitle = document.createElement('p');
  storyTitle.className = 'text-gray-700 text-base';
  storyTitle.textContent = story.title;
  storyElement.appendChild(storyTitle);

  return storyElement;
}

function fetchCharactersBySeries(seriesId) {
  fetch(
    `https://gateway.marvel.com/v1/public/series/${seriesId}/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderCharactersBySeries(data.data.results);
    })
    .catch((error) => {
      console.error('Error fetching characters by series:', error);
    });
}

function renderCharactersBySeries(characters) {
  const charactersBySeriesContainer = document.getElementById('characters_by_series');

  characters.forEach((character) => {
    const characterElement = createCharacterElement(character);
    charactersBySeriesContainer.appendChild(characterElement);
  });
}

function fetchCharactersByComic(comicId) {
  fetch(
    `https://gateway.marvel.com/v1/public/comics/${comicId}/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderCharactersByComic(data.data.results);
    })
    .catch((error) => {
      console.error('Error fetching characters by comic:', error);
    });
}

function renderCharactersByComic(characters) {
  const charactersByComicContainer = document.getElementById('characters_by_comic');

  characters.forEach((character) => {
    const characterElement = createCharacterElement(character);
    charactersByComicContainer.appendChild(characterElement);
  });
}

function createCharacterElement(character) {
  const characterElement = document.createElement('div');
  characterElement.className = 'character';
  
  const thumbnail = character.thumbnail;
  const characterImage = document.createElement('img');
  characterImage.className = 'mb-4';
  characterImage.src = `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
  characterElement.appendChild(characterImage);

  const characterName = document.createElement('p');
  characterName.className = 'text-gray-700 text-base';
  characterName.textContent = character.name;
  characterElement.appendChild(characterName);

  return characterElement;
}

fetchIronManData();
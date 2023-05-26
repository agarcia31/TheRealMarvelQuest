// Get the required elements
let bio = document.getElementById("captainamerica_bio");
let captainamerica_image = document.getElementById("captainamerica_image");
let comicsContainer = document.getElementById("comics");
let comicSeries = document.getElementById("comic_series");
let comicEvents = document.getElementById("comic_events");
let storyList = document.getElementById("story_list");

// Fetch character data
fetch(
  "https://gateway.marvel.com/v1/public/characters?name=Captain%20America&ts=HelloWorld123&apikey=58cf9dccb6a433565258dd4185258cc5&hash=6a3f4d8c242a80ba92ccd1d638bc7c4f"
)
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    return response.json();
  })
  .then(function (data) {
    // Start of character thumbnail
    let thumbnail = data.data.results[0].thumbnail.path + "/portrait_incredible." + data.data.results[0].thumbnail.extension;
    captainamerica_image.src = thumbnail;
    // End of character thumbnail

    // Start of character bio
    let bioText = data.data.results[0].description;
    bio.textContent = bioText ? bioText : "No description available.";
    // End of character bio

    // Start of comics
    let characterId = data.data.results[0].id;

    // Fetch comics for the character
    fetch(
      `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=HelloWorld123&apikey=58cf9dccb6a433565258dd4185258cc5&hash=6a3f4d8c242a80ba92ccd1d638bc7c4f`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: " + response.status);
        }
        return response.json();
      })
      .then((response) => {
        let comics = response.data.results;

        // Iterate through each comic and create elements to display them
        comics.forEach((comic) => {
          let comicTitle = comic.title;
          let comicImagePath = comic.thumbnail.path + "/portrait_uncanny." + comic.thumbnail.extension;

          // Create the comic element
          let comicElement = document.createElement("div");
          comicElement.classList.add("comic");

          // Create the comic image element
          let comicImageElement = document.createElement("img");
          comicImageElement.src = comicImagePath;
          comicImageElement.alt = comicTitle;

          // Create the comic title element
          let comicTitleElement = document.createElement("h3");
          comicTitleElement.textContent = comicTitle;

          // Append the comic image and title to the comic element
          comicElement.appendChild(comicImageElement);
          comicElement.appendChild(comicTitleElement);

          // Append the comic element to the comics container
          comicsContainer.appendChild(comicElement);
        });
      })
      .catch((err) => console.error(err));

    // Fetch events for the character
    fetch(
      `https://gateway.marvel.com/v1/public/characters/${characterId}/events?ts=HelloWorld123&apikey=58cf9dccb6a433565258dd4185258cc5&hash=6a3f4d8c242a80ba92ccd1d638bc7c4f`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: " + response.status);
        }
        return response.json();
      })
      .then((response) => {
        let events = response.data.results;

        // Iterate through each event and create elements to display them
        events.forEach((event) => {
          let eventTitle = event.title;
          let eventImagePath = event.thumbnail.path + "/portrait_uncanny." + event.thumbnail.extension;

          // Create the event element
          let eventElement = document.createElement("div");
          eventElement.classList.add("event");

          // Create the event image element
          let eventImageElement = document.createElement("img");
          eventImageElement.src = eventImagePath;
          eventImageElement.alt = eventTitle;

          // Create the event title element
          let eventTitleElement = document.createElement("h3");
          eventTitleElement.textContent = eventTitle;

          // Append the event image and title to the event element
          eventElement.appendChild(eventImageElement);
          eventElement.appendChild(eventTitleElement);

          // Append the event element to the events container
          comicEvents.appendChild(eventElement);
        });
      })
      .catch((err) => console.error(err));

    // Fetch stories for the character
    fetch(
      `https://gateway.marvel.com/v1/public/characters/${characterId}/stories?ts=HelloWorld123&apikey=58cf9dccb6a433565258dd4185258cc5&hash=6a3f4d8c242a80ba92ccd1d638bc7c4f`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: " + response.status);
        }
        return response.json();
      })
      .then((response) => {
        let stories = response.data.results;

        // Iterate through each story and create elements to display them
        stories.forEach((story) => {
          let storyTitle = story.title;
          let storyImagePath = story.thumbnail?.path + "/portrait_uncanny." + story.thumbnail?.extension;
        
          // Create the story element
          let storyElement = document.createElement("div");
          storyElement.classList.add("story");
        
          // Create the story image element
          let storyImageElement = document.createElement("img");
          storyImageElement.src = storyImagePath;
          storyImageElement.alt = storyTitle;
        
          // Create the story title element
          let storyTitleElement = document.createElement("h3");
          storyTitleElement.textContent = storyTitle;
        
          // Append the story image and title to the story element
          storyElement.appendChild(storyImageElement);
          storyElement.appendChild(storyTitleElement);
        
          // Append the story element to the stories container
          storyList.appendChild(storyElement);
        });
      })
      .catch((err) => console.error(err));
  })
  .catch(function (err) {
    console.error(err);
  });


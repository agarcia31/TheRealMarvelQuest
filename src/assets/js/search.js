const ts = "HelloWorld123";
const apiKey = "58cf9dccb6a433565258dd4185258cc5";
const hash = "6a3f4d8c242a80ba92ccd1d638bc7c4f";

function search() {
  const searchBar = document.getElementById("searchBar");
  const searchTerm = searchBar.value.trim();

  if (searchTerm !== "") {
    const searchUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(
      searchTerm
    )}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;

    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        let searchResultsContainer = document.getElementById("searchResults");

        if (!searchResultsContainer) {
          searchResultsContainer = createSearchResultsContainer();
        }

        let searchResults = searchResultsContainer.querySelector(".character-container");

        if (!searchResults) {
          searchResults = document.createElement("div");
          searchResults.classList.add("character-container");
          searchResultsContainer.appendChild(searchResults);
        }

        searchResults.innerHTML = "";

        const characters = data.data.results;

        if (characters.length === 0) {
          const noResultsMessage = document.createElement("p");
          noResultsMessage.textContent = "No results found.";
          searchResults.appendChild(noResultsMessage);
        } else {
          characters.forEach((character) => {
            const characterUrl = `./superheros/${character.id}.html`;

            const characterCard = document.createElement("div");
            characterCard.classList.add("character-card");

            const characterLink = document.createElement("a");
            characterLink.href = characterUrl;

            const characterImage = document.createElement("img");
            characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
            characterImage.alt = character.name;

            characterLink.appendChild(characterImage);
            characterCard.appendChild(characterLink);

            const characterName = document.createElement("h3");
            characterName.textContent = character.name;
            characterCard.appendChild(characterName);

            searchResults.appendChild(characterCard);
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching search results:", error);
      });
  }
}

function createSearchResultsContainer() {
  const searchResultsContainer = document.createElement("div");
  searchResultsContainer.id = "searchResults";
  searchResultsContainer.classList.add("container", "mx-auto", "py-8");

  const characterContainer = document.createElement("div");
  characterContainer.classList.add("character-container");

  searchResultsContainer.appendChild(characterContainer);

  document.body.appendChild(searchResultsContainer);

  return searchResultsContainer;
}



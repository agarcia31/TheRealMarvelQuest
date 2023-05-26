let bio = document.getElementById("bio");
let comics = document.getElementById("comics");
let movies = document.getElementById("movies");
let hawkeye_image = document.getElementById("hawkeye_image");
let hawkeye_bio = document.getElementById("hawkeye_bio");
let comic_image = document.getElementById("comic_image");
let comic_title = document.getElementById("comic_title");
fetch(
  "https://gateway.marvel.com/v1/public/characters?name=Hawkeye&ts=HelloWorld123&apikey=58cf9dccb6a433565258dd4185258cc5&hash=6a3f4d8c242a80ba92ccd1d638bc7c4f"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //start of thumbnail//
    console.log(data.data.results[0].thumbnail.path + ".jpg");
    let thumbnail = data.data.results[0].thumbnail.path + ".jpg";
    hawkeye_image.src = thumbnail;
    //end of thumbnail//

    //start of bio//
    console.log(data.data.results[0].description);
    let bio = data.data.results[0].description;
    hawkeye_bio.textContent += bio;
    //end of bio//

    //start of comic//
    console.log(data.data.results[0].comics);
    let comic = data.data.results[0].comics.items;

    fetch(
      "https://gateway.marvel.com/v1/public/comics/30090?ts=HelloWorld123&apikey=58cf9dccb6a433565258dd4185258cc5&hash=6a3f4d8c242a80ba92ccd1d638bc7c4f"
    )
      .then((response) => response.json())
      .then((response) => {
        comic_image.innerHTML = `<img src=${response.data.results[0].images[0].path}.${response.data.results[0].images[0].extension}>`;
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  });

// Marvel Info
//let comiclist = document.getElementById("comiclist");

//outer container
const con = document.createElement("div");
con.classList.add("bg-white");
comiclist.appendChild(con);
//end outer container

//inner container
const inCon = document.createElement("div");
inCon.classList.add(
  "mx-auto",
  "max-w-2xl",
  "sm:px-6",
  "lg:max-w-7xl",
  "lg:px-8"
);
con.appendChild(inCon);
//end inner container

//card
const card = document.createElement("div");
card.classList.add(
  "mt-6",
  "grid",
  "grid-cols-1",
  "gap-y-10",
  "gap-x-6",
  "sm:grid-cols-2",
  "lg:grid-cols-4",
  "xl:gap-x-8"
);
inCon.appendChild(card);
//end card

fetch(
  "https://gateway.marvel.com/v1/public/characters?ts=ClassProject&apikey=58cf9dccb6a433565258dd4185258cc5&hash=1fa6f8c84714c9295584be1b60c6f537"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //console.log(data.data.results);
    let comics = data.data.results;
    //console.log(comics);
    comics.forEach((hero) => {
      console.log("hero.name", hero.name);
      console.log("hero.thumbnail", hero.thumbnail.path);
      console.log("hero.extention", hero.thumbnail.extension);

      //link
      const link = document.createElement("a");
      //send name id with link to hero url
      link.href = "hero.html?nameID=" + hero.id;
      card.appendChild(link);
      //end link

      //innerCard
      const innerCard = document.createElement("div");
      innerCard.classList.add("group", "relative");
      link.appendChild(innerCard);
      //end innerCard

      //image container
      const imgCon = document.createElement("div");
      imgCon.classList.add(
        "min-h-80",
        "aspect-w-1",
        "aspect-h-1",
        "w-full",
        "overflow-hidden",
        "rounded-md",
        "bg-gray-200",
        "group-hover:opacity-75",
        "lg:aspect-none",
        "lg:h-80"
      );
      innerCard.appendChild(imgCon);
      //end image container

      //image
      const img = document.createElement("img");
      img.classList.add(
        "h-full",
        "w-full",
        "object-cover",
        "object-center",
        "lg:h-full",
        "lg:w-full"
      );
      img.src = hero.thumbnail.path + "." + hero.thumbnail.extension;
      imgCon.appendChild(img);
      //end image

      //nameCon
      const nameCon = document.createElement("div");
      nameCon.classList.add("mt-4", "flex", "justify-between");
      innerCard.appendChild(nameCon);
      //end nameCon

      //name
      const name = document.createElement("h3");
      name.classList.add("text-sm", "text-gray-700");
      name.innerText = hero.name;
      nameCon.appendChild(name);
      //end name
    });
  });

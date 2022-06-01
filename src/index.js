console.log('%c HI', 'color: firebrick')

const imgURL = "https://dog.ceo/api/breeds/image/random/4";
const breedURL = 'https://dog.ceo/api/breeds/list/all';

const breedContainer = document.querySelector("#dog-breeds");
const imageContainer = document.querySelector("#dog-image-container")
const dropdown = document.querySelector("#breed-dropdown");

fetch(imgURL)
    .then(response => response.json())
    .then(data => addImages(data))

fetch(breedURL)
    .then(response => response.json())
    .then(breeds => addBreeds(breeds))

dropdown.addEventListener("change", e => {
    fetch(breedURL) 
        .then(response => response.json())
        .then(breeds => filterBreeds(breeds))
    
    function filterBreeds(breeds) {
        const breedArray = allBreeds(breeds);
        const newArray = breedArray.filter(breedName => breedName[0] ===  e.target.value ? true : false);

        breedContainer.innerHTML = "";

        newArray.forEach(name => {
            const list = document.createElement("li");
            list.textContent = name;
            breedContainer.appendChild(list);
        });
    }
})

function addImages(dogs) {
    dogs.message.forEach(dog => {
        const image = document.createElement("img");
        image.src = dog;
        imageContainer.append(image);
    })
}

function addBreeds(breeds) {
    const dogBreeds = breeds.message;
    for (let breed in dogBreeds) {
        dogBreeds[breed].map(dog => {
            const dogName = document.createElement("li");
            dogName.textContent = `${dog} ${breed}`;
            breedContainer.appendChild(dogName);

            dogName.addEventListener("click", e => {
                dogName.style.color = "green";
            })
        });
    }
}

function allBreeds(breeds) {
    const dogBreeds = breeds.message;
    const array = [];
    for (let breed in dogBreeds) {
        dogBreeds[breed].map(dog => array.push(`${dog} ${breed}`));
    }
    return array;
}
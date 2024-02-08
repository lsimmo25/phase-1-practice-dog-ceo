document.addEventListener("DOMContentLoaded", () => {
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const imagesContainer = document.getElementById("dog-image-container");
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const dogBreedList = document.getElementById("dog-breeds")
    // fetch image and display
    function fetchImage() {
        fetch(imgUrl)
        .then(res => res.json())
        .then(data => {
            data.message.forEach(imageUrl => {
                // for each image URL inside "message" creates img element and sets src to the imgURL
                const img = document.createElement("img");
                img.src = imageUrl;
                imagesContainer.appendChild(img);
            }); 
        })
        .catch(error => {
            console.log("Error", error);
        });
        }

        fetchImage();

        //add breeds as list
        function addBreeds() {
            fetch(breedUrl)
            .then(res => res.json())
            .then(data => {
                if (typeof data.message === 'object' && data.message !== null) {
                    Object.keys(data.message).forEach(breed => {
                        const listDog = document.createElement("li");
                        listDog.classList.add("breeds")
                        listDog.textContent = breed;
                        dogBreedList.appendChild(listDog);
                    });
                } else {
                    console.log("Unexpected data format for dog breeds");
                }
                filterBreeds()
            })
            .catch(error => {
                console.log("Error", error);
            });
        }
        addBreeds()
        

        //change breed color
        dogBreedList.addEventListener("click", (e) => {
            if (e.target.classList.contains("breeds")) {
                e.target.style.color = "blue"
            }
        })

        function filterBreeds() {
            const filter = document.querySelector("#breed-dropdown")
            filter.addEventListener("change", (e) => {
                const selection = e.target.value
                const breedItems = document.querySelectorAll(".breeds")
                
                breedItems.forEach(breedItems => {
                    const breedName = breedItems.textContent.trim().toLowerCase();
                    if (selection === "all" || breedName.startsWith(selection)) {
                        breedItems.style.display = "block"
                    } else {
                        breedItems.style.display = "none"
                    }
                })
            })

        }
        
    })



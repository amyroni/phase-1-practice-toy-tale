let addToy = false;
const toyCollection = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();
  createNewToy();
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => toys.forEach(toy => addToyCard(toy)))
}

function addToyCard(toy) {
  const toyCard = document.createElement("div");
  toyCard.className = "card";
  const toyName = document.createElement("h2");
  toyName.textContent = toy.name;
  const toyImg = document.createElement("img");
  toyImg.src = toy.image;
  toyImg.className = "toy-avatar"
  
  const toyLikes = document.createElement("p");
  toyLikes.textContent = toy.likes;
  const btn = document.createElement("button");
  btn.className = "like-btn";
  btn.id = toy.id;
  btn.textContent = "Like ♥"
  
  btn.addEventListener("click", () => {
    toyLikes.textContent = parseInt(toyLikes.textContent) + 1
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: toyLikes.textContent})
    })
  })
  
  toyCard.append(toyName, toyImg, toyLikes, btn)
  toyCollection.append(toyCard)
}

function createNewToy() {
  const createForm = document.querySelector(".add-toy-form")
  createForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toyObj = {
      name: createForm.elements[0].value,
      image: createForm.elements[1].value,
      likes: 0,
    }
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyObj) 
    })
    .then(response => response.json())
    .then(newToy => addToyCard(newToy))
    createForm.reset()
  })
}

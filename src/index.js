let addToy = false;

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
  loadToys();
});

function listToy(toy) {
  const card = document.createElement("div");
  card.classList.add("card");

  const name = document.createElement("h2");
  name.innerText = toy.name;

  const image = document.createElement("img");
  image.src = toy.image;
  image.classList.add("avatar");

  const likes = document.createElement("p");
  likes.innerText = `${toy.likes} likes`;

  const likeButton = document.createElement("button");
  likeButton.innerText = "Like <3";
  likeButton.classList.add("like-btn");
  likeButton.setAttribute('id', toy.id); //let's you submit form for specific toy based on id
  likeButton.addEventListener("click", (e) => {
    updateLikes(e);
  });

  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(likeButton);

  document.getElementById("toy-collection").appendChild(card);
}

function loadToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(results => {
    results.forEach(toy => listToy(toy))
  });
}

//Form submission
document.getElementsByClassName("add-toy-form")[0].addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;

  let formData = {
    "name": form.name.value,
    "image": form.image.value,
    "likes": 0
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch("http://localhost:3000/toys", configObj)
  .then(resp => resp.json())
  .then(results => listToy(results))
  .catch(function(error) {
    alert(`${error.message}`)
  });
});

//Likes Feature
function updateLikes(e) {
  e.preventDefault();
  const newLikeNum = parseInt(e.target.parentNode.querySelector('p').innerText, 10) + 1; 
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikeNum
    })
  }
  console.log(e.target);

  fetch(`http://localhost:3000/toys/${e.target.id}`, configObj)
  .then(resp => resp.json())
  .then(results => {
    e.target.parentNode.querySelector('p').innerText = `${newLikeNum} likes`
  })
  .catch(function(error) {
    alert(`${error.message}`)
  });
}


  

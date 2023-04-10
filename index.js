
fetch('https://fakestoreapi.com/products')
  .then((data)=>{
    return data.json();
  })
  .then((completedata)=>{
    let data1="";
    completedata.map((values)=>{
      data1+=`  <div class="card">
                  <h1 class="title">${values.title}</h1>
                  <img src=${values.image} alt="image" class="images">
                  <p>${values.description}</p>
                  <p class="category">${values.category}</p>
                  <p class="price">${values.price}</p>
                  <button id="${values.id}">Buy</button>
                  <button id="${values.id}">Delete</button>
                  <div id="${values.id}">comment</div>
<form id="comment-form">
   <input type="text" id="name" placeholder="Your name" required>
   <input type="email" id="email" placeholder="Your email" required>
   <textarea id="comment" placeholder="Leave a comment" required></textarea>
   <button type="submit">Post Comment</button>
</form>

              </div>`
    });
    document.getElementById("cards").innerHTML=data1;
  })
  .catch((err)=>{
    console.log(err);
  })

function deleteCallback(e) {
  if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Delete') {
    const id = e.target.className.split(" ")[0];
    fetch(`https://fakestoreapi.com/products/${Number(id)}`, {
      method: 'DELETE',
    })
    .then((result) => {
      console.log(result);
      e.target.parentNode.parentNode.remove();
    })
    .catch((error) => console.log(error));
    e.preventDefault();
  }
}

document.addEventListener('click', deleteCallback);

function buyCallback(e) {
  console.log(e.target);
  if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Buy') {
      const combinedIdPrice = e.target.getAttribute('id');
      const id = combinedIdPrice?.split(" ")[0];
      const price = combinedIdPrice?.split(" ")[1];
      console.log(combinedIdPrice);
      console.log(id);
      console.log(price);
      e.preventDefault();
      fetch(`http://localhost:3000/purchases`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(
              {
                  productId: Number(id),
                  price: Number(price)
              }
          )
      })
      .then((result) => result.json())
      .then((result2) => {
          console.log(result2);
          alert('Purchase successful!');
      })
      .catch((error) => console.log(error));
      e.preventDefault();
  }
}

document.addEventListener('click', buyCallback);
const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  // Get the input values from the form
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const comment = document.getElementById("comment").value;
  // Create a new comment object
  const newComment = {
    name: name,
    email: email,
    comment: comment,
    date: new Date(),
  };
  // Add the comment to the comments array
  comments.push(newComment);
  // Update the comments displayed on the page
  displayComments();
}
const commentsContainer = document.getElementById("comments-container");
function displayComments() {
  commentsContainer.innerHTML = ""; // Clear the comments container
  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
      <h3>${comment.name} - ${comment.date}</h3>
      <p>${comment.comment}</p>
    `;
    commentsContainer.appendChild(commentElement);
  });
}

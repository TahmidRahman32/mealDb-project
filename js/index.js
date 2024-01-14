const mealDbLoader = async (text) => {
   const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
   const data = await res.json();
   display(data.meals);
};

const display = (meals) => {
   console.log(meals);

   const container = document.getElementById("container");
   container.innerText = "";

   meals = meals.slice(0, 9);
   


   meals.forEach((meal) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
       <div class="card">
                     <img  src="${meal.strMealThumb}" class="card-img-top image-fluid" alt="." >
                     <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <button onclick="modalDetails(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                     </div>
                  </div>
       `;
      container.appendChild(div);
   });
};

const searchDetails = () => {
   const searchField = document.getElementById("search-field").value;
   mealDbLoader(searchField);
};

const modalDetails = (code) => {
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${code}`)
      .then((res) => res.json())
      .then((data) => detailsDisplay(data.meals[0]));
};

const detailsDisplay = (detail) => {
   const details = document.getElementById("details-id");
   details.innerText = detail.strMeal;

   const cardBody = document.getElementById("card-body");
   cardBody.innerHTML = `
   <img class="w-100 p-2" src="${detail.strMealThumb}" alt="" />
   <div class='ps-2'>
   <p class='fw-medium'>Category: <span>${detail.strCategory}</span></p>
   <p class='fw-medium'>Area: <span>${detail.strArea}</span></p>
   <p class='fw-medium'>Instructions: <span>${detail.strInstructions}</span></p>
   <p class='fw-medium text-white p-3 mb-2 bg-secondary-subtle text-body rounded'>Youtube: <a>${detail.strYoutube}</a></p>
   </div>
   `;
};

mealDbLoader("");

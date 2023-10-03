function getPersonajes(done) {
       const results = fetch("https://rickandmortyapi.com/api/character");
   
       results
           .then(response => response.json())
           .then(data => {
               done(data);
           });
   }
   
   getPersonajes(data => {
       const personajes = data.results.slice(0, 15); // Obtener solo los primeros 15 personajes
   
       const main = document.querySelector("main");
   
       personajes.forEach(personaje => {
           const article = document.createRange().createContextualFragment(
               `<article>
                   <div class="image-container">
                       <img src="${personaje.image}" alt="Personajes">
                   </div>
                   <h2>${personaje.name}</h2>
               </article>`
           );
   
           main.append(article);
       });
   
       const select = document.createElement("select");
       select.id = "personajes-select";
   
       personajes.forEach(personaje => {
           const option = document.createElement("option");
           option.value = personaje.name;
           option.textContent = personaje.name;
   
           select.appendChild(option);
       });
   
       const h1 = document.querySelector("h1");
       h1.insertAdjacentElement("afterend", select);
   
       select.addEventListener("change", () => {
           const selectedOption = select.value;
           const articles = document.querySelectorAll("article");
   
           articles.forEach(article => {
               const h2 = article.querySelector("h2");
               if (h2.textContent === selectedOption) {
                   article.style.display = "block";
               } else {
                   article.style.display = "none";
               }
           });
       });
   
       const showAllButton = document.createElement("button");
       showAllButton.textContent = "Mostrar Todos";
       showAllButton.addEventListener("click", () => {
           const articles = document.querySelectorAll("article");
           articles.forEach(article => {
               article.style.display = "block";
           });
       });
   
       select.insertAdjacentElement("afterend", showAllButton);
   });
   
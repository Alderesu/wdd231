document.addEventListener('DOMContentLoaded', () => {  
    const recipeGallery = document.getElementById('recipe-gallery');  
    const modal = document.getElementById('add-recipe-modal');  
    const closeButton = document.querySelector('.close');  

    // Initialize  
    const recipesData = JSON.parse(localStorage.getItem('recipes')) || [  
        {  
            "id": 1,  
            "title": "Spaghetti Carbonara",  
            "ingredients": ["Spaghetti", "Eggs", "Parmesan cheese", "Pancetta", "Black pepper"],  
            "instructions": "Cook spaghetti. In a separate bowl, mix eggs and cheese. Combine with spaghetti and pancetta.",  
            "image": "images/spaghetti-carbonara.jpg"  
        },  
        {  
            "id": 2,  
            "title": "Chocolate Chip Cookies",  
            "ingredients": ["Flour", "Sugar", "Butter", "Chocolate chips", "Eggs"],  
            "instructions": "Mix ingredients, scoop onto a baking sheet, and bake.",  
            "image": "images/chocolate-chip-cookies.jpg"  
        }  
    ];  

    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];  

    // Fetching recipes  
    async function fetchRecipes() {  
        const response = await fetch('./data/recipes.json');  
        const recipes = await response.json();  
        displayRecipes(recipes);  
    }  

    // Display recipes  
    function displayRecipes(recipes) {  
        recipes.forEach(recipe => {  
            const card = document.createElement('div');  
            card.className = 'recipe-card';  
            card.innerHTML = `  
                <h3>${recipe.title}</h3>  
                <img src="${recipe.image}" alt="${recipe.title}">  
                <button class="view-recipe" data-id="${recipe.id}">View Recipe</button>  
            `;  
            recipeGallery.appendChild(card);  
        });  
        addRecipeClickEvents(recipes);  
    }  

    // Add click events to recipe cards  
    function addRecipeClickEvents(recipes) {  
        const buttons = document.querySelectorAll('.view-recipe');  
        buttons.forEach(button => {  
            button.addEventListener('click', (event) => {  
                event.stopPropagation();  
                const recipeId = button.getAttribute('data-id');  
                const recipe = recipes.find(r => r.id == recipeId);  
                displayRecipeDetails(recipe);  
            });  
        });  
    }  

    // Add search logic 
    document.getElementById('search').addEventListener('input', function(event) {  
        const searchTerm = event.target.value.toLowerCase();  
        const filteredRecipes = recipesData.filter(recipe =>   
            recipe.title.toLowerCase().includes(searchTerm) ||   
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))  
        );  
        displayRecipes(filteredRecipes);  
    });  

    function toggleFavorite(recipeId) {  
        if (favorites.includes(recipeId)) {  
            favorites = favorites.filter(id => id !== recipeId);  
        } else {  
            favorites.push(recipeId);  
        }  
        localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));  
    }  

    function isFavorite(recipeId) {  
        return favorites.includes(recipeId);  
    }  

    // Modify the recipe card display code to include a favorite button  
    function displayRecipes(recipes) {  
        recipeGallery.innerHTML = ''; // Clear the gallery first  
        recipes.forEach(recipe => {  
            const card = document.createElement('div');  
            card.className = 'recipe-card';  
            
            card.innerHTML = `  
                <h3>${recipe.title}</h3>  
                <img src="${recipe.image}" alt="${recipe.title}">  
                <button class="view-recipe" data-id="${recipe.id}">View Recipe</button>  
                <button class="favorite-recipe" data-id="${recipe.id}" style="color:${isFavorite(recipe.id) ? 'red' : 'black'};">  
                    ${isFavorite(recipe.id) ? 'Unfavorite' : 'Favorite'}  
                </button>  
            `;  
            
            recipeGallery.appendChild(card);  
        });  
        addRecipeClickEvents(recipes);  
        addFavoriteClickEvents(recipes);  
    }  

    function addFavoriteClickEvents(recipes) {  
        const favoriteButtons = document.querySelectorAll('.favorite-recipe');  
        favoriteButtons.forEach(button => {  
            button.addEventListener('click', () => {  
                const recipeId = button.getAttribute('data-id');  
                toggleFavorite(recipeId);  
                button.style.color = isFavorite(recipeId) ? 'red' : 'black';  
                button.innerText = isFavorite(recipeId) ? 'Unfavorite' : 'Favorite';  
            });  
        });  
    }  

    document.getElementById('add-recipe-btn').addEventListener('click', (event) => {  
        event.stopPropagation();  
        document.getElementById('add-recipe-modal').style.display = 'block';  
    });  

        
    document.getElementById('close-add-recipe').onclick = function() {  
        document.getElementById('add-recipe-modal').style.display = 'none';  
    };  
        
    document.getElementById('add-recipe-form').addEventListener('submit', function(event) {  
        event.preventDefault(); // Prevent form submission  
        const title = document.getElementById('recipe-title').value;  
        const ingredients = document.getElementById('recipe-ingredients').value.split(',').map(ingredient => ingredient.trim());  
        const instructions = document.getElementById('recipe-instructions').value;  
        const image = document.getElementById('recipe-image').value;  
    
        const newRecipe = {  
            id: recipesData.length + 1, // Simple way to assign an ID  
            title,  
            ingredients,  
            instructions,  
            image  
        };  
    
        recipesData.push(newRecipe);  
        displayRecipes(recipesData);  
        localStorage.setItem('recipes', JSON.stringify(recipesData));  
        document.getElementById('add-recipe-modal').style.display = 'none';  
    });  

    // Display Recipe Details in Modal  
    function displayRecipeDetails(recipe) {  
        document.getElementById('modal-title').innerText = recipe.title;  
        document.getElementById('modal-image').src = recipe.image;  
        document.getElementById('modal-instructions').innerText = recipe.instructions;  
        document.getElementById('modal-ingredients').innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');  
        
        modal.style.display = 'block';  
    }  

    // Close Modal  
    closeButton.onclick = function() {  
        modal.style.display = 'none';  
    };  

    window.onclick = function(event) {  
        if (event.target == modal) {  
            modal.style.display = 'none';  
        }  
    };  

    fetchRecipes();  
});

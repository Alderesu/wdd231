document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.querySelector('.menu-container');
    const burgerButton = document.querySelector('#burger-button');

    burgerButton.addEventListener('click', () => {
        menuContainer.classList.toggle('open');

        if (menuContainer.classList.contains('open')) {
            burgerButton.textContent = '✖';
        } else {
            burgerButton.textContent = '☰';
        }
    });
});

const currentYear = new Date().getFullYear();
const copyrightYear = document.getElementById('copyrightYear');
copyrightYear.textContent = `©${currentYear} AnimeFolio Project`;

const lastModifiedDate = new Date(document.lastModified);
const lastModified = document.getElementById('lastModified');
lastModified.textContent = `Last Modification: ${lastModifiedDate.toLocaleDateString()}`;

document.querySelector('.hero-button').addEventListener('click', function() {
    document.querySelector('#tags').scrollIntoView({ behavior: 'smooth' });
});

// AniList API URL
const BASE_URL = "https://graphql.anilist.co";
const SEARCH_URL = `${BASE_URL}`;

// Update genres for anime
const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Comedy" },
    { id: 4, name: "Drama" },
    { id: 5, name: "Fantasy" },
    { id: 6, name: "Horror" },
    { id: 7, name: "Romance" },
    { id: 8, name: "Sci-Fi" },
    { id: 9, name: "Slice of Life" },
    // Add more genres as needed
];

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsEl = document.getElementById("tags");

let selectedGenre = [];
setGenre();

function setGenre() {
    tagsEl.innerHTML = "";
    genres.forEach((genre) => {
        const t = document.createElement("div");
        t.classList.add("tag");
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener("click", () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    });
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre);
            getAnime();
            highlightSelection();
        });
        tagsEl.append(t);
    });
}

function highlightSelection() {
    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
        tag.classList.remove("highlight");
    });
    clearBtn();
    if (selectedGenre.length != 0) {
        selectedGenre.forEach((id) => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add("highlight");
        });
    }
}

function clearBtn() {
    let clearBtn = document.getElementById("clear");
    if (clearBtn) {
        clearBtn.classList.add("highlight");
    } else {
        let clear = document.createElement("div");
        clear.classList.add("tag", "highlight");
        clear.id = "clear";
        clear.innerText = "Clear ❌";
        clear.addEventListener("click", () => {
            selectedGenre = [];
            setGenre();
            getAnime();
        });
        tagsEl.append(clear);
    }
}

getAnime();

async function getAnime() {
    const query = `
    query ($page: Int, $perPage: Int, $genre: [Int]) {
        Page(page: $page, perPage: $perPage) {
            media(genre_in: $genre, type: ANIME) {
                id
                title {
                    romaji
                    english
                }
                coverImage {
                    medium
                }
                averageScore
                description
            }
        }
    }`;

    const variables = {
        page: 1,
        perPage: 10,
        genre: selectedGenre.length > 0 ? selectedGenre : null
    };

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();
        console.log(data.data.Page.media);
        if (data.data.Page.media.length !== 0) {
            showAnime(data.data.Page.media);
        } else {
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        main.innerHTML = `<h1 class="no-results">Failed to fetch data</h1>`;
    }
}

function showAnime(data) {
    main.innerHTML = "";

    data.forEach((anime) => {
        const { title, coverImage, averageScore, description, id } = anime;
        const animeContainer = document.createElement("div");
        animeContainer.classList.add("anime");
        animeContainer.innerHTML = `
            <img src="${coverImage ? coverImage.medium : "http://via.placeholder.com/1080x1580"}" alt=${title.romaji} loading="lazy">
            <div class="anime-info">
                <h3>${title.romaji} (${title.english})</h3>
                <span class="${getColor(averageScore)}">${averageScore}</span>
            </div>
            <div class="overview">
                <h3>Description</h3>
                ${description}
                <br/> 
                <button class="know-more" id="${id}">Know More</button>
            </div>
        `;

        main.appendChild(animeContainer);
    });
}

function getColor(score) {
    if (score >= 80) {
        return "green";
    } else if (score >= 50) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre = [];
    setGenre();
    if (searchTerm) {
        // Implement search functionality if needed
    } else {
        getAnime();
    }
});
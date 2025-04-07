import { places } from '../data/places.mjs'
console.log(places);

//---------- GRAB A REFERENCE TO THE DIVISION WHERE WE DISPLAY THE ITEMS
const showHere = document.querySelector("#allplaces")

//---------- LOOP THROUGH THE ARRAY OF JSON ITEMS
function displayItems(places) {
    places.forEach(x => {
        //build the card element
        const thecard = document.createElement('div')

        // Create content container
        const contentDiv = document.createElement('div')
        contentDiv.className = 'content'
        
        //build the title element
        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        contentDiv.appendChild(thetitle)

        //build the photo element wrapped in figure
        const thefigure = document.createElement('figure')
        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.photo_link}`
        thephoto.alt = x.name
        thefigure.appendChild(thephoto)
        thecard.appendChild(thefigure)

        //build the address element
        const theaddress = document.createElement('address')
        theaddress.innerText = x.address
        contentDiv.appendChild(theaddress)

        //build the description element
        const thedesc = document.createElement('p')
        thedesc.innerText = x.description
        contentDiv.appendChild(thedesc)

        //build the learn more button
        const thebutton = document.createElement('button')
        thebutton.innerText = "Learn More"
        contentDiv.appendChild(thebutton)

        // Add content div to card
        thecard.appendChild(contentDiv)

        //add click handler to show cost in modal
        thebutton.addEventListener('click', () => {
            const modal = document.getElementById('placeModal');
            document.getElementById('modalCost').textContent = `Cost: ${x.cost}`;
            modal.style.display = 'flex';
        })

        showHere.appendChild(thecard)
    })
}

displayItems(places);

// Close modal when clicking close button
document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('placeModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('placeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// Modal
document.addEventListener('DOMContentLoaded', function() {
    const dialog = document.getElementById('visitModal');
    const visitMessage = document.getElementById('visitMessage');
    const closeButton = document.querySelector('.close-button');

    // Function to show the dialog
    function showDialog(message) {
        visitMessage.textContent = message;
        dialog.showModal();
    }

    // Function to close the dialog
    closeButton.onclick = function() {
        dialog.close();
    }

    // Function to handle the visit logic
    function handleVisit() {
        const now = new Date();
        const lastVisit = localStorage.getItem('lastVisit');

        if (!lastVisit) {
            // First visit
            showDialog("Welcome! Let us know if you have any questions.");
        } else {
            const lastVisitDate = new Date(lastVisit);
            const timeDifference = now - lastVisitDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference === 0) {
                showDialog("Back so soon! Awesome!");
            } else {
                const message = daysDifference === 1 ? "You last visited 1 day ago." : `You last visited ${daysDifference} days ago.`;
                showDialog(message);
            }
        }

        // Store the current visit date
        localStorage.setItem('lastVisit', now);
    }

    // Handle the visit logic on page load
    handleVisit();
});
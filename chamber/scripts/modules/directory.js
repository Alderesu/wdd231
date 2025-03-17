//export function initializeDirectory() {
    const myBtns = document.querySelectorAll(".button-box button");

    window.onload = function () {
        buttonView(0);
    };
    
    function buttonView(n) {
        currentShowButton(n);
        const view = n === 0 ? "list" : "grid";
        toggleView(view);
        loadData(view);
    }
    
    function currentShowButton(n) {
        myBtns.forEach((btn) => btn.classList.remove("activebtn"));
        myBtns[n].classList.add("activebtn");
    }
    
    myBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            buttonView(index);
        });
    });
    
    function toggleView(view) {
        const boxDirectory = document.getElementById("directory-box");
    
        if (view === "grid") {
            boxDirectory.classList.add("grid-view");
            boxDirectory.classList.remove("list-view");
        } else {
            boxDirectory.classList.add("list-view");
            boxDirectory.classList.remove("grid-view");
        }
    }
    
    async function loadData(view) {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const container = document.getElementById("directory-box");
    
            let cards = "";
    
            if (view === "list") {
                cards = `
                    <table>
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Industry</th>
                                <th>Address</th>
                                <th>Website</th>
                                <th>Office Phone</th>
                                <th>Membership</th>
                            </tr>
                        </thead>
                        <tbody>
                    `;
    
                data.forEach((company) => {
                    cards += `
                            <tr>
                                <td><img class="logo" loading="lazy" src="${company.logo}" alt="${company.Name} logo" width="100" height="100"></td>
                                <td>${company.Name}</td>
                                <td>${company.Industry}</td>
                                <td>${company["Physical Address"]}</td>
                                <td><a href="${company.Website}" target="_blank">${company.Website}</a></td>
                                <td>${company["Phone"]}</td>
                                <td>${company["Membership"]}</td>
                            </tr>
                        `;
                });
    
                cards += `
                        </tbody>
                    </table>
                    `;
            } else {
                // grid view
                cards = "";
                data.forEach((company) => {
                    cards += `
                            <div class="card-box">
                                <img class="logo" loading="lazy" src="${company.logo}" alt="${company.Name} logo" width="200" height="200" >
                                <h3>${company.Name}</h3>
                                <ul>
                                    <li><strong>Industry:</strong> ${company.Industry}</li>
                                    <li><strong>Address:</strong> ${company["Physical Address"]}</li>
                                    <li><strong>Website:</strong> <a href="${company.Website}" target="_blank">${company.Website}</a></li>
                                    <li><strong>Office Phone:</strong> ${company["Phone"]}</li>
                                    <li><strong>Membership:</strong> ${company["Membership"]}</li>
                                </ul>
                            </div>
                        `;
                });
            }
    
            container.innerHTML = cards;
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        loadData("list");
    });
    //}

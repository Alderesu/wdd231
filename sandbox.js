"use strict";

const nav = document.querySelector(".header-nav");
const menuBtn = document.querySelector(".menu-btn");

//  getting current date
const date = new Date();
// getting the current month
let currentMonth = date.getMonth();
// getting the current year
let currentYear = date.getFullYear();

class Switch {
  constructor(switchMode) {
    this.switchBtn = switchMode;
    this.switchBtn.addEventListener("click", () => this.toggleStatus());
    this.switchBtn.addEventListener("keydown", (event) =>
      this.handleKeydown(event)
    );
  }

  handleKeydown(event) {
    // Only do something when space or return is pressed
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggleStatus();
    }
  }

  // Switch state of a switch
  toggleStatus() {
    const currentState = this.switchBtn.getAttribute("aria-checked") === "true";
    const switchDot = this.switchBtn.querySelector(".switch span");
    const newState = String(!currentState);

    this.switchBtn.setAttribute("aria-checked", newState);
    switchDot.classList.toggle("moveRight");
  }
}


  
// //////////////////////////////////////////////
function toggleNav() {
  const toggleMenu = function () {
    nav.classList.toggle("show-nav");
  };

  menuBtn.addEventListener("click", toggleMenu);
}
toggleNav();

// ///////////////////////////////////////////////
// The active page functionality - highlight the current  active
// page
function activePage() {
  function setActiveLink() {
    const navLinks = document.querySelectorAll(".nav-links");
    const currentURL = window.location.href;

    navLinks.forEach((link) => {
      if (currentURL === link.href) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  setActiveLink();
}
activePage();


// ////////////////////////////////////////////////////////////
function displayDate() {
  const theYear = document.querySelector("#year");
  const lastModify = document.querySelector(".last-modify");

  const getDate = function () {
    const date = new Date();
    const option = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const dateNYear = {
      time: date.toTimeString(),
      year: date.getFullYear(),
      date: new Intl.DateTimeFormat("en-SA", option).format(date),
    };
    return dateNYear;
  };
  theYear.textContent = `${getDate().year}`;
  lastModify.textContent = `${getDate().date} - ${getDate().time}`;
}
displayDate();


///////////////////////////////////////////////////////////

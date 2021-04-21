/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const documentFragment = new DocumentFragment();
const navbar = document.querySelector("#navbar__list");

const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll(".menu__link");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isSectionInView(element) {
	// check nearest sections from the top to the bounding client rect
    let bounding = element.getBoundingClientRect();
    return (
      bounding.top <= 50 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
        )
  };

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavBar() {
	navbar.innerHTML = "";
	// Loop through all sections
	for (let section in sections) {
		// If the item in sections is not an object, ignore it and keep going
		if (typeof sections[section] != "object") {
			continue;
		}
		else {
			// Create a new list and add the anchor tag in it then append it to the document fragment
			let li = document.createElement("li");
			li.innerHTML = `<a href="#${sections[section].id}" class="menu__link" style="color: white">Section ${parseInt(section) + 1}</a>`;
			documentFragment.appendChild(li);
		}
	}
	navbar.appendChild(documentFragment);
}

// Add class 'active' to section when near top of viewport
function checkActivity() {
	for (let section of sections) {
		if (isSectionInView(section)) {
			section.classList.add("your-active-class");
		} else {
			section.classList.remove("your-active-class")
		}
	}
	// Compare the list items in the nav bar with the active sections and highlight the nav menu link that matches the last active section
	const lis = document.querySelectorAll("li");
	lis[0].classList.add("your-active-class");
	const topSections = document.querySelectorAll(".your-active-class");
	for (let item of lis) {
		if (typeof item != "object") {
			continue;
		} else if (item.textContent != topSections[topSections.length-1].getAttribute("data-nav")) {
			item.classList.remove("active-nav")
		} else {
			item.classList.add("active-nav")
		}
	}
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
navbar.style.position = "fixed";
navbar.style.background = "rgba(0,0,0,0.7)";
window.onload = buildNavBar;

// Scroll to section on link click


// Set sections as active
document.addEventListener("scroll", checkActivity);

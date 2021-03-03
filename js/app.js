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
const listOfSections = document.querySelectorAll('section'); // document.querySelectorAll() returns a nodeList containing all the elements matching the selector
const navBarList = document.querySelector('#navbar__list');

/*
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    for(let i = 0; i < listOfSections.length; i++) {
        const currentSection = listOfSections[i];
        const currentSectionPosition = currentSection.getBoundingClientRect().top;
        const newListItem = document.createElement('li');
        const newAnchorTag = document.createElement('a');
        newAnchorTag.classList.add('menu__link');
        newAnchorTag.setAttribute('href', '#' + currentSection.id);
        newAnchorTag.textContent = currentSection.dataset.nav;
        // Scroll to section on link click
        newAnchorTag.addEventListener('click', function(event) {
            event.preventDefault();
            window.scroll({
                top: currentSectionPosition,
                behavior: 'smooth'
            });
        })
        newListItem.appendChild(newAnchorTag);
        navBarList.appendChild(newListItem);
    }
}

// Add class 'active' to section when near top of viewport
function makeSectionActive() {
    // we need to use element.classList.add('your-active-class') to make a section active
    for(let i = 0; i < listOfSections.length; i++) {
        const currentSection = listOfSections[i];
        const currentSectionPosition = currentSection.getBoundingClientRect().top;
        if(currentSectionPosition >= -200 && currentSectionPosition <= 200) {
            Array.from(listOfSections).forEach((el) => el.classList.remove('your-active-class'));
            currentSection.classList.add('your-active-class');
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Set sections as active
let ticking = false;

document.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      makeSectionActive();
      ticking = false;
    });

    ticking = true;
  }
});

// Build menu 
buildNav()
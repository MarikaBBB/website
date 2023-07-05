document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.topnav .nav-link');

  // Function to handle mouseenter event on topnav buttons
  function handleMouseEnter() {
    this.classList.add('hovered');
  }

  function handleMouseLeave() {
    this.classList.remove('hovered');
  }

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);
  });
});

// Get the necessary elements
const carouselWrapper = document.querySelector('.carousel-wrapper');
const projectContainers = document.querySelectorAll('.project-container');

// Duplicate project containers and append them to the carousel wrapper
const duplicatedContainers = Array.from(projectContainers).map(container => container.cloneNode(true));
duplicatedContainers.forEach(container => carouselWrapper.appendChild(container));

// Set the initial slide index
let slideIndex = 0;
const slideWidth = projectContainers[0].offsetWidth + parseInt(getComputedStyle(projectContainers[0]).marginRight);
const totalSlides = projectContainers.length;

// Initialize the carousel position
carouselWrapper.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0, 0)`;

// Function to move the carousel to the next slide
function nextSlide() {
  slideIndex++;
  carouselWrapper.style.transition = 'transform 0.5s ease-in-out';
  carouselWrapper.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0, 0)`;

  // Move to the first slide instantly when reaching the cloned last slide
  if (slideIndex === totalSlides) {
    setTimeout(() => {
      carouselWrapper.style.transition = 'none';
      carouselWrapper.style.transform = `translate3d(0, 0, 0)`;
      slideIndex = 0;
    }, 500);
  }
}

// Function to move the carousel to the previous slide
function prevSlide() {
  if (slideIndex === 0) {
    slideIndex = totalSlides;
    carouselWrapper.style.transition = 'none';
    carouselWrapper.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0, 0)`;
  }

  slideIndex--;
  carouselWrapper.style.transition = 'transform 0.5s ease-in-out';
  carouselWrapper.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0, 0)`;
}

// Get the arrow navigation elements
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

// Add click event listeners to the arrow navigation buttons
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Function to check if the element is in the viewport
let isAnimating = false;

function animateAvatar() {
  if (isAnimating) {
    return; // Prevent animation if it's already in progress
  }
  
  isAnimating = true;

  const avatar1 = document.getElementById('avatar1');
  const avatar2 = document.getElementById('avatar2');
  const avatar3 = document.getElementById('avatar3');

  avatar1.classList.add('hidden');
  avatar2.classList.remove('hidden');

  setTimeout(() => {
    avatar2.classList.add('hidden');
    avatar3.classList.remove('hidden');
  }, 800); 

  setTimeout(() => {
    resetAvatar();
    isAnimating = false;
  }, 2000); 
}

function resetAvatar() {
  const avatar1 = document.getElementById('avatar1');
  const avatar2 = document.getElementById('avatar2');
  const avatar3 = document.getElementById('avatar3');

  avatar1.classList.remove('hidden');
  avatar2.classList.add('hidden');
  avatar3.classList.add('hidden');
}

const avatar = document.getElementById('avatar1');
const avatarContainer = document.getElementById('avatar-container');

avatar.addEventListener('click', () => {
  avatar.classList.toggle('animate');
  animateAvatar(); // Call the animateAvatar function
});

document.addEventListener("DOMContentLoaded", function() {
  const aboutSection = document.getElementById("about-section");
  const aboutSectionTop = aboutSection.offsetTop;

  // Get the speech bubble element
  const speechBubble2 = document.getElementById("speech-bubble2");
  const startStoryButton = document.getElementById("start-story-btn");

  // Function to check if the user is at the top of the About Me section
  function checkIfInAboutSection() {
    const currentScroll = window.scrollY;

    if (currentScroll >= aboutSectionTop) {
      speechBubble2.classList.remove("hidden");
      startStoryButton.classList.remove("hidden");
    } else {
      speechBubble2.classList.add("hidden");
      startStoryButton.classList.add("hidden");
    }
  }

  // Event listener for scroll event
  window.addEventListener("scroll", checkIfInAboutSection);
});

// Event listener for the "Start My Story" button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('start-story-btn').addEventListener('click', function() {
    document.getElementById('image-map-section').scrollIntoView({ behavior: 'smooth' });
    openPopup('Italy'); // Open the Italy popup window
  });
});

// Function to open the pop-up window
function openPopup(country) {
  const popup = document.querySelector(`.popup[data-country="${country}"]`);
  popup.classList.add('show');

  // Get the flag icon element corresponding to the country
  const flagIcon = document.querySelector(`.flag-icon[data-country="${country}"] .emoji`);
  flagIcon.classList.add('selected');

  // Get the close button within the popup
  const closeButton = popup.querySelector('.close');
  closeButton.addEventListener('click', function() {
    closePopup();
  });
}

// Function to close the pop-up window
function closePopup() {
  const openPopup = document.querySelector('.popup.show');
  if (openPopup) {
    const country = openPopup.getAttribute('data-country');
    const flagIcon = document.querySelector(`.flag-icon[data-country="${country}"] .emoji`);
    if (flagIcon) {
      flagIcon.classList.remove('selected');
    }

    // Remove the event listener from the close button
    const closeButton = openPopup.querySelector('.close');
    closeButton.removeEventListener('click', closePopup);

    openPopup.classList.remove('show');
  }
}

// Get all the popup windows
const popups = document.querySelectorAll('.popup');
let currentPopupIndex = 0;

// Function to show a popup window
function showPopup(index) {
  popups[index].classList.add('show');
}

// Function to hide a popup window
function hidePopup(index) {
  popups[index].classList.remove('show');

  // Check if all popups are hidden
  const allHidden = Array.from(popups).every(popup => !popup.classList.contains('show'));
  if (allHidden) {
    removeSelectedClass(); // Remove "selected" class from all flag icons
  }
}

// Function to show the next popup
function showNextPopup() {
  hidePopup(currentPopupIndex); // Hide the current popup
  currentPopupIndex++;
  if (currentPopupIndex >= popups.length) {
    currentPopupIndex = 0;
  }

  showPopup(currentPopupIndex); // Show the next popup

  // Remove "selected" class from the previously selected flag icon
  const selectedFlagIcon = document.querySelector('.flag-icon .emoji.selected');
  if (selectedFlagIcon) {
    selectedFlagIcon.classList.remove('selected');
  }

  // Get the flag icon element corresponding to the current popup
  const currentPopup = popups[currentPopupIndex];
  const country = currentPopup.getAttribute('data-country');
  const flagIcon = document.querySelector(`.flag-icon[data-country="${country}"] .emoji`);
  flagIcon.classList.add('selected');
}

// Event listeners to the flag icons
const flagIcons = document.querySelectorAll('.flag-icon');

flagIcons.forEach(function(flagIcon) {
  flagIcon.addEventListener('click', function() {
    const country = this.getAttribute('data-country');
    closePopup(); // Close any open pop-up windows
    openPopup(country); // Open the selected pop-up window
    removeSelectedClass(); // Remove "selected" class from all flag icons
    const emojiElement = this.querySelector('.emoji');
    emojiElement.classList.add('selected');
  });
});

// Get all the next buttons for pop-ups
const nextButtonsPopup = document.querySelectorAll('.nextButtonsPopup');
const closeButtons = document.querySelectorAll('.popup .close');

closeButtons.forEach(function(closeButton) {
  closeButton.addEventListener('click', function() {
    const popup = this.parentNode;
    hidePopup(Array.from(popups).indexOf(popup)); // Close the current pop-up window
  });
});

// Add event listeners to the pop-up next buttons
nextButtonsPopup.forEach((button, index) => {
  button.addEventListener('click', showNextPopup);
});

// Remove the "selected" class from all flag icons
function removeSelectedClass() {
  const flagIcons = document.querySelectorAll('.flag-icon .emoji');
  flagIcons.forEach(function (flagIcon) {
    flagIcon.classList.remove('selected');
  });
}

// Event listener for the flag icons
flagIcons.forEach(function(flagIcon) {
  flagIcon.addEventListener('click', function() {
    const country = this.getAttribute('data-country');
    closePopup(); // Close any open pop-up windows

    // Remove "selected" class from the previously selected flag icon
    const selectedFlagIcon = document.querySelector('.flag-icon .emoji.selected');
    if (selectedFlagIcon) {
      selectedFlagIcon.classList.remove('selected');
    }

    // Add the "selected" class to the clicked flag icon
    const emojiElement = this.querySelector('.emoji');
    emojiElement.classList.add('selected');

    openPopup(country); // Open the selected pop-up window
  });
});

// JavaScript code
// Check if the current device is a mobile phone
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Add a click event listener to the speech bubble for mobile devices
if (isMobileDevice()) {
  var speechBubble1 = document.getElementById('speech-bubble1');
  speechBubble1.addEventListener('click', function() {
   
    var avatar1 = document.getElementById('avatar1');
    var avatar2 = document.getElementById('avatar2');
    var avatar3 = document.getElementById('avatar3');
    
    avatar1.classList.add('hidden');
    avatar2.classList.remove('hidden');
    
    setTimeout(function() {
      avatar2.classList.add('hidden');
      avatar3.classList.remove('hidden');
    }, 500);
  });
}

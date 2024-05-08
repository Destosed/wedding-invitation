import { Console, timeStamp } from "console";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4LYRDCRUXhh-1bASPYuvURA7NDgP_6R0",
  authDomain: "wedding-invitation-bb4bb.firebaseapp.com",
  projectId: "wedding-invitation-bb4bb",
  storageBucket: "wedding-invitation-bb4bb.appspot.com",
  messagingSenderId: "128655647178",
  appId: "1:128655647178:web:ae620797e2cab015d36f33"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { collection, addDoc } from 'firebase/firestore';

async function addUserData(name, presence) {
  try {
    const docRef = await addDoc(collection(db, "guests"), {
      name: name,
      presence: presence
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

window.onload = function() {
  setupCountdown();
};

document.addEventListener("DOMContentLoaded", function() {

  // Show wide screen view
  const isWideMonitor = window.innerHeight < window.innerWidth;
  const wideScreenView = document.getElementById('wide-screen-view');

  console.log(`Launch on wide screen: ${isWideMonitor}`)

  if (isWideMonitor) {
    document.getElementById('main-content').style.display = 'block';
  } else {
    document.getElementById('wide-screen-view').style.display = 'none';
  }

  // Show splash screen
  const splashScreen = document.getElementById('splash-screen');
  splashScreen.style.display = 'flex'; // Show splash screen

  // Hide splash screen when page is fully loaded
  window.onload = function(e) { 
    console.log("window.onload", Date.now());
    splashScreen.style.display = 'none'; // Hide splash screen
    document.getElementById('main-content').style.display = 'block'; // Show main content
  }

  // MARK: - Add listener for button

  var locationButton = document.getElementById("location-button");
  locationButton.addEventListener("click", function() {
    console.log('Location button tapped')
    window.open('https://yandex.ru/maps/?ol=geo&text=%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%90%D0%BB%D1%8C%D1%84%D1%80%D0%B5%D0%B4%D0%B0%20%D0%A5%D0%B0%D0%BB%D0%B8%D0%BA%D0%BE%D0%B2%D0%B0,%2026&sll=49.095939,55.781929&sspn=0.002000,0.002000')
  });

  var submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", function() {
    onSubmitButtonDidTapped();
  });

  // MARK: - Add listener for inputs
  const nameInput = document.getElementById('name');
  const presenceSelect = document.getElementById('presence');

  function checkInputs() {
    const nameValue = nameInput.value.trim();
    const presenceValue = presenceSelect.value;

    if (nameValue !== '' && presenceValue !== '-Выбрать-') {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', true);
    }
  }

  nameInput.addEventListener('input', checkInputs);
  presenceSelect.addEventListener('change', checkInputs);

  // MARK: - Add new guest button

  const plusButton = document.getElementById('plus-button');
  const rsvpBlockFormGuests = document.querySelector('.rsvp-block-form-guests');

  plusButton.addEventListener('click', function() {
    const originalDiv = document.querySelector('.rsvp-block-form-field');
    const cloneDiv = originalDiv.cloneNode(true);

    rsvpBlockFormGuests.appendChild(cloneDiv);

    cloneDiv.style.opacity = 0;
    setTimeout(function() {
        cloneDiv.style.opacity = 1;
    }, 100);

    const inputs = cloneDiv.querySelectorAll('.rsvp-block-form-field-input-textfield');
    inputs.forEach(input => {
      input.value = "";
    });
  });
});

window.addEventListener('scroll', handleScroll);

handleScroll();

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleScroll() {
  const elements = document.querySelectorAll('.animatable-appear');
  elements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('appeared');
    }
  });
}

function setupCountdown() {
  var countDownDate = new Date("Aug 11, 2024 16:00:00").getTime();

  var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer_days").innerText = days
    document.getElementById("timer_hours").innerText = hours
    document.getElementById("timer_minutes").innerText = minutes
    document.getElementById("timer_seconds").innerText = seconds

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}

function onSubmitButtonDidTapped() {
  let presensSelect = document.getElementById("presence")
  let presense = presensSelect.options[presensSelect.selectedIndex].text;

  var names = []
  const inputs = document.querySelectorAll('.rsvp-block-form-field-input-textfield');
  inputs.forEach(input => {
    names.push(input.value);
  });

  names.forEach((name) => {
    addUserData(name, presense == "Обязательно буду")
  });

  alert(`${names.join(', ')}, cпасибо за Ваш ответ!`);
}
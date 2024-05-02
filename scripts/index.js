import { timeStamp } from "console";
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

console.log("Ну че там");

window.onload = function() {
  setupCountdown();
};

document.addEventListener("DOMContentLoaded", function() {
  var submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", function() {
    onSubmitButtonDidTapped();
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
  console.log(elements)
  elements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('appeared');
    }
  });
}

function setupCountdown() {
  var countDownDate = new Date("Aug 11, 2024 16:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer_days").innerText = days
    document.getElementById("timer_hours").innerText = hours
    document.getElementById("timer_minutes").innerText = minutes
    document.getElementById("timer_seconds").innerText = seconds

    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}

function onSubmitButtonDidTapped() {
  let name = document.getElementById("name").value

  let presensSelect = document.getElementById("presence")
  let presense = presensSelect.options[presensSelect.selectedIndex].text;

  addUserData(name, presense == "Обязательно буду")

  alert(`${name}, cпасибо за Ваш ответ!`);
}
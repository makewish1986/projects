var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Looping through images */
  for (const image of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    thumbBar.appendChild(newImage); 
    newImage.addEventListener('click', e => displayedImage.src = e.target.src);
  }


/* Wiring up the Darken/Lighten button */
  btn.onclick = function (e) {
    const btncls = btn.getAttribute('class');
    if (btncls === 'dark') {
      btn.setAttribute('class', 'light');
      btn.textContent = 'Светлее';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
      btn.setAttribute('class', 'dark');
      btn.textContent = 'Темнее';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  }


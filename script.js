const data = [
  { title: "Saint Antonien", img: "https://images.unsplash.com/photo-1564866657310-76a8a38e54c8" },
  { title: "Nagano Prefecture", img: "https://images.unsplash.com/photo-1551516594-56cb78394636" },
  { title: "Marrakech Desert", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
  { title: "Yosemite Park", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  { title: "Los Lances Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
];

document.getElementById('demo').innerHTML = data
  .map(
    (item, i) => `
    <div class="item" id="slide-item-${i}" 
      style="background-image: url('${item.img}')"
      title="${item.title}">
    </div>`
  )
  .join('');

document.getElementById('slide-numbers').innerHTML = data
  .map((_, i) => `<div id="dot-${i}"></div>`)
  .join('');

const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.numbers div');

let current = 0;

function updateActive() {
  items.forEach((el, i) => el.classList.toggle('active', i === current));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      ease: "power2.inOut",
      onComplete: resolve,
    });
  });
}

async function cycleSlides() {
  while (true) {
    updateActive();
    await animate(items[current], 1, { scale: 1.15 });
    await animate(items[current], 0.6, { scale: 1.1 });
    current = (current + 1) % items.length;
    await new Promise((r) => setTimeout(r, 2000));
  }
}

cycleSlides();

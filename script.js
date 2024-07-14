const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.style.borderColor = getBackgroundColor();
    card.style.backgroundColor = getBackgroundColor();
})

function getBackgroundColor() {
    let color = "#";
    const letters = '0123456789ABCDEF';

    for(let i =0; i<6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);

      // stop observing when element is fully displayed
      if(entry.isIntersecting)
        observer.unobserve(entry.target);
    });
  },
  {
    //show element when fully visible.
    // if 0 show full element when first pixle is detected
    threshold: 0.5,
    
    // when divs are 100px away load them
    // by the time I scroll to them, I will find them loaded
    rootMargin: "100px",


  }
);

cards.forEach((card) => {
    observer.observe(card);
})

// lazy loader adds a new card as soon as the last card is observed.
const lastCardObserver = new IntersectionObserver((entries) => {
    const lastCard = entries[0];
    if(!lastCard.isIntersecting) return;
    loadNewCard();

    // the last card is not longer the last card because
    // we have a new last card
    lastCardObserver.unobserve(lastCard.target);

    // observe the new last card
    lastCardObserver.observe(document.querySelector(".card:last-child"));
}, {
    // it starts creating the new cards 
    // 200px before reaching the bottom of the list
    rootMargin: "100px"
});

lastCardObserver.observe(document.querySelector(".card:last-child"));

const container = document.querySelector(".container")

function loadNewCard(){
    for(let i =0; i < 10; i++){
        const card = document.createElement("div");
        card.textContent = "This is a new card!";
        card.style.borderColor = getBackgroundColor();
        card.style.backgroundColor = getBackgroundColor();
        card.classList.add("card");
        observer.observe(card);
        container.appendChild(card);
    }
}
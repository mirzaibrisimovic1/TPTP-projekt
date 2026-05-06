// =======================
// DARK MODE
// =======================
const toggle = document.getElementById("darkModeToggle");

// Funkcija za promjenu teme
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    
    // Čuvanje u localStorage
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "true" : "false");
});

// Provjerava pri učitavanju stranice
if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
}


// =======================
// FILTRIRANJE KARTICA
// =======================
const filterButtons = document.querySelectorAll(".side-nav button");
const cards = document.querySelectorAll(".card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const filter = button.getAttribute("data-filter");

        // aktivno dugme
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        cards.forEach(card => {
            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "block";
                card.style.animation = "fadeIn 0.5s";
            } else {
                card.style.display = "none";
            }
        });

    });
});


// =======================
// INTERAKTIVNI ELEMENT (BROJAČ POSJETA)
// =======================
let count = localStorage.getItem("posjete") || 0;
count++;

localStorage.setItem("posjete", count);

const counter = document.createElement("p");
counter.innerText = "Broj posjeta: " + count;
counter.style.textAlign = "center";

document.body.appendChild(counter);
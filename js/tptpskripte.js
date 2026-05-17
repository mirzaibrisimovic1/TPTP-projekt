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

function prikaziSliku() {
    document.getElementById('aparatici-modal').classList.add('aktivan');
}

function zatvoriModal() {
    document.getElementById('aparatici-modal').classList.remove('aktivan');
}
function updateStatus() {
    const sada = new Date();
    const dan = sada.getDay();
    const sati = sada.getHours();
    const minute = sada.getMinutes();
    const vrijemeUMinutama = sati * 60 + minute;

    const status = document.getElementById('statusOrdinacije');

    let otvaranje, zatvaranje, danNaziv;

    if (dan === 0) {
        status.innerHTML = `
            <div class="status-ikona zatvoreno-ikona">✕</div>
            <p class="status-tekst zatvoreno-tekst">Ordinacija je zatvorena</p>
            <p class="status-info">Nedjelja — ne radimo</p>
            <p class="status-info">Otvaramo u ponedjeljak u <strong>08:00</strong></p>
        `;
        return;
    }

    if (dan >= 1 && dan <= 5) {
        otvaranje = 8 * 60;
        zatvaranje = 20 * 60;
        danNaziv = 'danas';
    } else if (dan === 6) {
        otvaranje = 9 * 60;
        zatvaranje = 15 * 60;
        danNaziv = 'danas';
    }

    const otvorenaSad = vrijemeUMinutama >= otvaranje && vrijemeUMinutama < zatvaranje;

    if (otvorenaSad) {
        const preostaloMinuta = zatvaranje - vrijemeUMinutama;
        const preostaloSati = Math.floor(preostaloMinuta / 60);
        const preostaloMin = preostaloMinuta % 60;

        let vrijemeInfo = '';
        if (preostaloSati > 0) {
            vrijemeInfo = `${preostaloSati}h ${preostaloMin}min`;
        } else {
            vrijemeInfo = `${preostaloMin} minuta`;
        }

        status.innerHTML = `
            <div class="status-ikona otvoreno-ikona">✔</div>
            <p class="status-tekst otvoreno-tekst">Ordinacija je otvorena</p>
            <p class="status-info">Zatvaramo za <strong>${vrijemeInfo}</strong></p>
        `;
    } else {
        let infoTekst = '';
        if (vrijemeUMinutama < otvaranje) {
            const doOtvaranja = otvaranje - vrijemeUMinutama;
            const doSati = Math.floor(doOtvaranja / 60);
            const doMin = doOtvaranja % 60;
            infoTekst = `Otvaramo za <strong>${doSati}h ${doMin}min</strong>`;
        } else {
            if (dan === 5) {
                infoTekst = 'Otvaramo u subotu u <strong>09:00</strong>';
            } else if (dan === 6) {
                infoTekst = 'Otvaramo u ponedjeljak u <strong>08:00</strong>';
            } else {
                infoTekst = 'Otvaramo sutra u <strong>08:00</strong>';
            }
        }

        status.innerHTML = `
            <div class="status-ikona zatvoreno-ikona">✕</div>
            <p class="status-tekst zatvoreno-tekst">Ordinacija je zatvorena</p>
            <p class="status-info">${infoTekst}</p>
        `;
    }
}

updateStatus();
setInterval(updateStatus, 60000);
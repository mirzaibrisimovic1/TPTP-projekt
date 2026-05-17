const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
    // Provjera ako je polje veÄ‡ popunjeno (npr. kod osveÅ¾avanja stranice)
    if (input.value !== "") {
        input.parentNode.classList.add("focus");
    }
});

const contactForm = document.getElementById("main-contact-form");
const successBox = document.getElementById("success-message");
const successText = document.getElementById("success-text");
const backBtn = document.getElementById("back-btn");

function showError(inputId, message) {
    const container = document.getElementById(inputId).parentNode;
    const errorDiv = document.getElementById(`${inputId}-error`);
    container.classList.add("error");
    if (errorDiv) errorDiv.textContent = message;
}

function clearError(inputId) {
    const container = document.getElementById(inputId).parentNode;
    const errorDiv = document.getElementById(`${inputId}-error`);
    container.classList.remove("error");
    if (errorDiv) errorDiv.textContent = "";
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// validacija
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        let isValid = true;

        if (firstName.value.trim() === "") {
            showError("firstName", "Ime je obavezno polje.");
            isValid = false;
        } else {
            clearError("firstName");
        }

        if (lastName.value.trim() === "") {
            showError("lastName", "Prezime je obavezno polje.");
            isValid = false;
        } else {
            clearError("lastName");
        }

        if (email.value.trim() === "") {
            showError("email", "Email je obavezno polje.");
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError("email", "Unesite ispravnu email adresu.");
            isValid = false;
        } else {
            clearError("email");
        }

        const phoneRegex = /^[0-9\s\-+]+$/;
        if (phone.value.trim() === "") {
            showError("phone", "Telefon je obavezno polje.");
            isValid = false;
        } else if (!phoneRegex.test(phone.value.trim())) {
            showError("phone", "Dozvoljeni su samo brojevi, razmaci i crtice.");
            isValid = false;
        } else {
            clearError("phone");
        }

        if (!subject.value || subject.value === "") {
            showError("subject", "Molimo odaberite temu upita.");
            isValid = false;
        } else {
            clearError("subject");
        }

        if (message.value.trim() === "") {
            showError("message", "Poruka ne moÅ¾e biti prazna.");
            isValid = false;
        } else {
            clearError("message");
        }

        if (isValid) {
            successText.textContent = `PoÅ¡tovani ${firstName.value.trim()}, primili smo vaÅ¡ upit. NaÅ¡a podrÅ¡ka Ä‡e se javiti uskoro.`;
            contactForm.classList.add("hidden");
            successBox.classList.remove("hidden");
        }
    });
}

// Reset dugme
if (backBtn && contactForm) {
    backBtn.addEventListener("click", () => {
        contactForm.reset();
        inputs.forEach((input) => {
            input.parentNode.classList.remove("focus");
            clearError(input.id);
        });
        successBox.classList.add("hidden");
        contactForm.classList.remove("hidden");
    });
}
const resetFormBtn = document.getElementById("reset-form-btn");

if (resetFormBtn) {
    resetFormBtn.addEventListener("click", () => {
        inputs.forEach((input) => {
            const parent = input.parentNode;
            parent.classList.remove("focus");
            parent.classList.remove("error");
            
            const errorDiv = document.getElementById(`${input.id}-error`);
            if (errorDiv) {
                errorDiv.textContent = "";
            }
        });
    });
}





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



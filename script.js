// script.js
const STORAGE_KEY = 'biegStudentaData';

// Dane domyślne do wyświetlenia, jeśli dashboard jest pusty
const defaultContent = {
    cennik: [
        { kategoria: "Student / Doktorant", cena1: "25 PLN", cena2: "35 PLN", cena3: "50 PLN" },
        { kategoria: "Absolwent / Pracownik", cena1: "40 PLN", cena2: "50 PLN", cena3: "70 PLN" },
        { kategoria: "Pozostali", cena1: "50 PLN", cena2: "70 PLN", cena3: "90 PLN" }
    ],
    trasa: [
        { klucz: "Dystans", wartosc: "5 KM" },
        { klucz: "Nawierzchnia", wartosc: "80% Asfalt, 20% Park" },
        { klucz: "Limit czasu", wartosc: "60 minut" }
    ],
    nagrody: [
        { tytul: "Kategoria OPEN", opis: "Puchary Dziekana i bony o wartości 500 zł do sklepu sportowego.", ikona: "🏆" },
        { tytul: "Najszybszy Wydział", opis: "Puchar Rektora i beczka złocistego napoju dla samorządu.", ikona: "🎓" },
        { tytul: "Najlepsze Przebranie", opis: "Voucher na pizzę dla całej grupy biegowej.", ikona: "🎭" }
    ],
    regulamin: [
        { zasada: "Organizatorem jest Samorząd Studencki i AZS." },
        { zasada: "Wiek uczestnika to minimum 18 lat." },
        { zasada: "Wymagana ważna legitymacja studencka do zniżek." },
        { zasada: "Pomiar czasu odbywa się za pomocą chipów zwrotnych." },
        { zasada: "Bieg odbywa się na własną odpowiedzialność uczestnika." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Pobierz dane z LocalStorage lub użyj domyślnych
    const stored = localStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : defaultContent;

    renderPageData(data);

    // Obsługa przycisków "wkrótce"
    document.querySelectorAll('.placeholder-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Ta funkcjonalność będzie dostępna po uruchomieniu zapisów!');
        });
    });
});

function renderPageData(data) {
    // Cennik
    const cennikBody = document.querySelector('.pricing-table tbody');
    if (cennikBody) {
        cennikBody.innerHTML = data.cennik.map(row => `
            <tr>
                <td><strong>${row.kategoria || row.Kategoria}</strong></td>
                <td>${row.cena1 || row['Do 31 Marca']}</td>
                <td>${row.cena2 || row['Do 20 Maja']}</td>
                <td>${row.cena3 || row['W dniu zawodów']}</td>
            </tr>
        `).join('');
    }

    // Trasa
    const routeDetails = document.querySelector('.route-details');
    if (routeDetails) {
        routeDetails.innerHTML = data.trasa.map(item => `
            <div class="route-card">
                <h3>${item.klucz || item.Klucz}</h3>
                <p style="font-size: 2rem; color: #003366; font-weight: bold;">${item.wartosc || item.Wartosc}</p>
            </div>
        `).join('');
    }

    // Nagrody
    const prizesGrid = document.querySelector('.prizes-grid');
    if (prizesGrid) {
        prizesGrid.innerHTML = data.nagrody.map(n => `
            <div class="prize-item">
                <span class="prize-icon" style="font-size: 3rem;">${n.ikona || n.Ikona || '🎁'}</span>
                <h3>${n.tytul || n.Tytul}</h3>
                <p>${n.opis || n.Opis}</p>
            </div>
        `).join('');
    }

    // Regulamin
    const rulesList = document.querySelector('.rules-list');
    if (rulesList) {
        rulesList.innerHTML = data.regulamin.map(r => `
            <li>${r.zasada || r.Zasada}</li>
        `).join('');
    }
}
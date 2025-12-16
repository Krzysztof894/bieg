// Klucz pod którym dane będą w LocalStorage
const STORAGE_KEY = 'biegStudentaData';

// Dane domyślne (sample), jeśli LocalStorage jest pusty
const defaultData = {
    lastUpdated: new Date().toLocaleString(),
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
        { tytul: "Kategoria OPEN", opis: "Puchary Dziekana i bony 500 zł", ikona: "🏆" },
        { tytul: "Najszybszy Wydział", opis: "Puchar Rektora i beczka piwa", ikona: "🎓" },
        { tytul: "Najlepsze Przebranie", opis: "Voucher na pizzę dla grupy", ikona: "🎭" }
    ],
    regulamin: [
        { zasada: "Organizatorem jest Samorząd i AZS." },
        { zasada: "Wiek uczestnika 18+." },
        { zasada: "Wymagana legitymacja studencka do zniżek." },
        { zasada: "Pomiar czasu chipowy." },
        { zasada: "Bieg na własną odpowiedzialność." }
    ]
};

// --- Inicjalizacja ---
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupEventListeners();
});

function setupEventListeners() {
    // Obsługa inputu pliku
    document.getElementById('excelInput').addEventListener('change', handleExcelUpload);
}

// --- Zarządzanie Danymi ---

function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    let data;

    if (stored) {
        data = JSON.parse(stored);
        console.log("Załadowano dane z LocalStorage");
    } else {
        data = defaultData;
        console.log("Załadowano dane domyślne");
    }

    renderDashboard(data);
}

function saveData(data) {
    // Aktualizujemy datę
    data.lastUpdated = new Date().toLocaleString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    renderDashboard(data);
    alert('Dane zostały pomyślnie zaktualizowane!');
}

function resetData() {
    if(confirm("Czy na pewno chcesz przywrócić dane domyślne?")) {
        localStorage.removeItem(STORAGE_KEY);
        loadData();
    }
}

// --- Import Excela (SheetJS) ---

function handleExcelUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Struktura nowych danych
        const newData = { ...defaultData }; // Kopiujemy strukturę

        // Parsowanie arkuszy (zakładamy, że nazwy arkuszy w Excelu to: Cennik, Trasa, Nagrody, Regulamin)
        
        if (workbook.Sheets["Cennik"]) {
            newData.cennik = XLSX.utils.sheet_to_json(workbook.Sheets["Cennik"]);
        }
        if (workbook.Sheets["Trasa"]) {
            newData.trasa = XLSX.utils.sheet_to_json(workbook.Sheets["Trasa"]);
        }
        if (workbook.Sheets["Nagrody"]) {
            newData.nagrody = XLSX.utils.sheet_to_json(workbook.Sheets["Nagrody"]);
        }
        if (workbook.Sheets["Regulamin"]) {
            newData.regulamin = XLSX.utils.sheet_to_json(workbook.Sheets["Regulamin"]);
        }

        saveData(newData);
    };

    reader.readAsArrayBuffer(file);
}

// --- Renderowanie ---

function renderDashboard(data) {
    // Status
    document.getElementById('last-update-info').textContent = `Ostatnia aktualizacja: ${data.lastUpdated}`;

    // Cennik
    const cennikTbody = document.querySelector('#cennik-table tbody');
    cennikTbody.innerHTML = '';
    data.cennik.forEach(row => {
        // Obsługa różnych nazw kolumn z Excela (zabezpieczenie)
        const kat = row.Kategoria || row.kategoria;
        const c1 = row.Cena1 || row.cena1 || row['Do 31 Marca'];
        const c2 = row.Cena2 || row.cena2 || row['Do 20 Maja'];
        const c3 = row.Cena3 || row.cena3 || row['W dniu zawodów'];

        const tr = `<tr>
            <td><strong>${kat}</strong></td>
            <td>${c1}</td>
            <td>${c2}</td>
            <td>${c3}</td>
        </tr>`;
        cennikTbody.innerHTML += tr;
    });

    // Trasa
    const trasaContainer = document.getElementById('trasa-container');
    trasaContainer.innerHTML = '';
    data.trasa.forEach(item => {
        const key = item.Klucz || item.klucz;
        const val = item.Wartosc || item.wartosc;
        
        trasaContainer.innerHTML += `
            <div class="card">
                <h3>${key}</h3>
                <p style="font-size: 1.2rem; color: #003366;">${val}</p>
            </div>
        `;
    });

    // Nagrody
    const nagrodyContainer = document.getElementById('nagrody-container');
    nagrodyContainer.innerHTML = '';
    data.nagrody.forEach(item => {
        const title = item.Tytul || item.tytul;
        const desc = item.Opis || item.opis;
        const icon = item.Ikona || item.ikona || '🎁';

        nagrodyContainer.innerHTML += `
            <div class="card" style="text-align: center;">
                <div style="font-size: 3rem;">${icon}</div>
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        `;
    });

    // Regulamin
    const regulaminList = document.getElementById('regulamin-list');
    regulaminList.innerHTML = '';
    data.regulamin.forEach(item => {
        const rule = item.Zasada || item.zasada;
        regulaminList.innerHTML += `<li>${rule}</li>`;
    });
}

// --- Nawigacja w Dashboardzie ---

window.switchTab = function(tabId) {
    // Ukryj wszystkie
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active'));

    // Pokaż wybrany
    document.getElementById(tabId).classList.add('active');
    
    // Ustaw aktywny link w menu
    // (szukamy po onclicku - proste rozwiązanie)
    const activeLink = Array.from(document.querySelectorAll('.sidebar li')).find(li => li.getAttribute('onclick').includes(tabId));
    if(activeLink) activeLink.classList.add('active');
};
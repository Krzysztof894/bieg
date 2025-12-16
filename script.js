document.addEventListener('DOMContentLoaded', () => {
    console.log('Strona Bieg Studenta 2025 załadowana pomyślnie.');

    // Pobierz wszystkie przyciski, które mają klasę 'placeholder-link'
    // (Dodałem tę klasę w HTML do przycisków z href="#")
    const placeholderLinks = document.querySelectorAll('.placeholder-link');

    placeholderLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Zatrzymaj domyślne działanie (skok do góry strony)
            event.preventDefault();
            
            // Wyświetl komunikat dla użytkownika
            alert('Ta funkcjonalność (formularz/pobieranie) będzie dostępna wkrótce!');
        });
    });
});
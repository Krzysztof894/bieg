document.addEventListener('DOMContentLoaded', () => {
    console.log('Strona Bieg Studenta załadowana pomyślnie.');

    const placeholderLinks = document.querySelectorAll('.placeholder-link');

    placeholderLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Ta funkcjonalność (formularz/pobieranie) będzie dostępna wkrótce!');
        });
    });
});
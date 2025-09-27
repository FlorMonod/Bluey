document.addEventListener('DOMContentLoaded', () => {
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    const temporadaSections = document.querySelectorAll('.temporada-section');
    const mainTitleSection = document.querySelector('.full-width-section');

    const showCorrectSeason = () => {
        const hash = window.location.hash;
        
        if (hash && hash !== '#all') {
            const targetId = hash.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                mainTitleSection.style.display = 'none';
                temporadaSections.forEach(section => {
                    if (section.id === targetId) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
        } else {
            mainTitleSection.style.display = 'block';
            temporadaSections.forEach(section => {
                section.style.display = 'block';
            });
        }
    };

    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href.startsWith('temporadas.html#') || href.startsWith('#')) {
                e.preventDefault();
                const newHash = href.split('#')[1];
                
                if (newHash) {
                    window.location.hash = newHash;
                } else {
                    history.pushState("", document.title, window.location.pathname + window.location.search);
                }
                showCorrectSeason();

                const dropdownContent = document.querySelector('.dropdown-content');
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                }
            }
        });
    });

    window.addEventListener('hashchange', showCorrectSeason);

    showCorrectSeason();
});

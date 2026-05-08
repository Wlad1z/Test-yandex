const slidesData = [
    { name: 'Хозе-Рауль Капабланка', title: 'Чемпион мира по шахматам', image: 'static/participant.png' },
    { name: 'Эммануил Ласкер',       title: 'Чемпион мира по шахматам', image: 'static/participant.png' },
    { name: 'Александр Алехин',      title: 'Чемпион мира по шахматам', image: 'static/participant.png' },
    { name: 'Арон Нимцович',         title: 'Чемпион мира по шахматам', image: 'static/participant.png' },
    { name: 'Рихард Рети',           title: 'Чемпион мира по шахматам', image: 'static/participant.png' },
    { name: 'Остап Бендер',          title: 'Гроссмейстер',             image: 'static/participant.png' },
];

function getSlidesToShow() {
    const w = window.innerWidth;
    if (w > 1000) return 3;
    if (w >= 800) return 2;
    return 1;
}

document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.screen_4 .screen_4_slider .slides');
    const counterCurrent  = document.getElementById('current-slide');
    const counterTotal    = document.getElementById('total-slide');

    function renderSlides() {
        slidesContainer.innerHTML = '';
        slidesData.forEach((p) => {
            const el = document.createElement('div');
            el.className = 'participant';
            el.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <div class="participant_name">
                    <div>${p.name}</div>
                    <div>${p.title}</div>
                </div>
                <button>Подробнее</button>
            `;
            slidesContainer.appendChild(el);
        });
        slidesContainer.style.width = `${100 * (slidesData.length / getSlidesToShow())}%`;
    }

    renderSlides();

    const slider = new Slider({
        track: slidesContainer,
        prevButton: document.querySelector('.screen_4 .prev-btn'),
        nextButton: document.querySelector('.screen_4 .next-btn'),
        slidesToShow: getSlidesToShow,
        getStep: (track) => {
            const first = track.children[0];
            if (!first) return 0;
            const styles = window.getComputedStyle(first);
            const margin = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
            return first.getBoundingClientRect().width + margin + 20;
        },
        autoplay: 4000,
        resetOnResize: false,
        onChange: (index, total, perView) => {
            counterCurrent.textContent = index + perView;
            counterTotal.textContent = total;
        },
    });

    window.addEventListener('resize', () => {
        slider.stopAutoplay();
        slider.goTo(0);
        slidesContainer.style.width = `${100 * (slidesData.length / getSlidesToShow())}%`;
        slider.refresh();
        slider.startAutoplay();
    });
});

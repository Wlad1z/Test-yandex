document.addEventListener('DOMContentLoaded', () => {
    const radios = document.querySelectorAll('#slider_dotted input[type="radio"]');

    const slider = new Slider({
        track: document.querySelector('.screen_3_slides'),
        prevButton: document.querySelector('.screen_3 .prev-btn'),
        nextButton: document.querySelector('.screen_3 .next-btn'),
        slidesToShow: () => 1,
        getStep: (track) => track.children[0].getBoundingClientRect().width + 20,
        resetOnResize: false,
        onChange: (index) => {
            if (radios[index]) radios[index].checked = true;
        },
    });

    radios.forEach((radio, i) => {
        radio.addEventListener('click', () => slider.goTo(i));
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 800) {
            slider.goTo(0);
        } else {
            slider.refresh();
        }
    });
});

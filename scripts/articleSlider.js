document.addEventListener("DOMContentLoaded", function() {
    const slidesContainer = document.querySelector(".screen_3_slides");
    const slides = slidesContainer.querySelectorAll('.slide');
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");
    const radios = document.querySelectorAll('#slider_dotted input[type="radio"]');
    let currentSlideIndex = 0;

    function updateSlidePosition() {
        const slideWidth = 355;
        slidesContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    }

    function updateButtons(x) {
        prevButton.disabled = x === 0;
        prevButton.classList.toggle('disabled', prevButton.disabled);

        nextButton.disabled = x === 4;
        nextButton.classList.toggle('disabled', nextButton.disabled);

        radios[x].checked = true;
    }

    prevButton.addEventListener("click", function() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlidePosition();
            updateButtons(currentSlideIndex);
        }
    });

    nextButton.addEventListener("click", function() {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            updateSlidePosition();
            updateButtons(currentSlideIndex);
        }
    });

    radios.forEach((radio, index) => {
        radio.addEventListener('click', function() {
            currentSlideIndex = index;
            updateSlidePosition();
            updateButtons(currentSlideIndex);
        });
    });

    

    updateSlidePosition();
    updateButtons(currentSlideIndex);

    window.addEventListener('resize', updateSlidePosition);
});

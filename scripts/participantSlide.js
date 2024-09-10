document.addEventListener("DOMContentLoaded", function() {
    const slidesData = [
        {
            name: 'Хозе-Рауль Капабланка',
            title: 'Чемпион мира по шахматам',
            image: 'static/participant.png'
        },
        {
            name: 'Александр Алехин',
            title: 'Чемпион мира по шахматам',
            image: 'static/participant.png'
        },
        {
            name: 'Михаил Ботвинник',
            title: 'Чемпион мира по шахматам',
            image: 'static/participant.png'
        },
        {
            name: 'Гарри Каспаров',
            title: 'Чемпион мира по шахматам',
            image: 'static/participant.png'
        },
        {
            name: 'Анатолий Карпов',
            title: 'Чемпион мира по шахматам',
            image: 'static/participant.png'
        }
    ];

    const slidesContainer = document.querySelector(".screen_4 .screen_4_slider .slide");
    const prevButton = document.querySelector(".screen_4 .prev-btn");
    const nextButton = document.querySelector(".screen_4 .next-btn");
    const currentSlideElem = document.getElementById('current-slide');
    const totalSlideElem = document.getElementById('total-slide');
    
    let currentSlideIndex = 0;
    let slidesToShow = 3; // По умолчанию показываем 3 слайда

    function initSlides() {
        slidesContainer.innerHTML = ''; // Очистка контейнера

        slidesData.forEach((slide) => {
            const slideElement = document.createElement("div");
            slideElement.className = "participant";
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="participant">
                <div class="participant_name">
                    <div>${slide.name}</div>
                    <div>${slide.title}</div>
                </div>
                <button>Подробнее</button>
            `;
            slidesContainer.appendChild(slideElement);
        });

        updateSlidesToShow();
        slidesContainer.style.width = `${100 * (slidesData.length / slidesToShow)}%`;
        updateSlidePosition();
        updateButtons();
        updateCount();
    }

    function updateSlidesToShow() {
        const screenWidth = window.innerWidth;
        slidesToShow = screenWidth <= 800 ? 1 : 3;
    }

    function updateSlidePosition() {
        const firstSlide = slidesContainer.querySelector('.participant');
        const slideWidth = firstSlide.getBoundingClientRect().width; 
        const slideMarginRight = parseFloat(window.getComputedStyle(firstSlide).marginLeft);
        const totalSlideWidth = slideWidth + slideMarginRight; 

        slidesContainer.style.transform = `translateX(-${currentSlideIndex * totalSlideWidth}px)`;
    }

    function updateButtons() {
        prevButton.disabled = currentSlideIndex === 0;
        prevButton.classList.toggle('disabled', prevButton.disabled);

        nextButton.disabled = currentSlideIndex >= slidesData.length - slidesToShow;
        nextButton.classList.toggle('disabled', nextButton.disabled);
    }

    function updateCount(){
        currentSlideElem.innerText = currentSlideIndex + slidesToShow; // Отображаем текущий индекс слайда (начинаем с 1)
        totalSlideElem.innerText = slidesData.length; // Отображаем общее количество слайдов
    }

    nextButton.addEventListener("click", function() {
        if (currentSlideIndex < slidesData.length - slidesToShow) {
            currentSlideIndex++;
            updateSlidePosition();
            updateButtons();
            updateCount();
        }
    });

    prevButton.addEventListener("click", function() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlidePosition();
            updateButtons();
            updateCount();
        }
    });

    // Инициализация слайдов и счетчиков
    initSlides();

    // Обновление слайдов и счетчиков при изменении размера окна
    window.addEventListener('resize', function() {
        updateSlidesToShow();
        initSlides();
        updateSlidePosition();
        updateButtons();
        updateCount();
    });
});

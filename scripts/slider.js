class Slider {
    constructor({
        track,
        prevButton,
        nextButton,
        slidesToShow = () => 1,
        getStep,
        autoplay = 0,
        resetOnResize = true,
        onChange = () => {},
    }) {
        this.track = track;
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.slidesToShow = slidesToShow;
        this.getStep = getStep ?? ((t) => t.children[0]?.getBoundingClientRect().width ?? 0);
        this.autoplay = autoplay;
        this.resetOnResize = resetOnResize;
        this.onChange = onChange;

        this.currentIndex = 0;
        this.autoplayId = null;

        this._init();
    }

    get total() {
        return this.track.children.length;
    }

    get maxIndex() {
        return Math.max(0, this.total - this.slidesToShow());
    }

    next() {
        if (this.currentIndex < this.maxIndex) {
            this.goTo(this.currentIndex + 1);
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.goTo(this.currentIndex - 1);
        }
    }

    goTo(index) {
        this.currentIndex = Math.max(0, Math.min(this.maxIndex, index));
        this._render();
    }

    refresh() {
        if (this.currentIndex > this.maxIndex) {
            this.currentIndex = 0;
        }
        this._render();
    }

    startAutoplay() {
        if (!this.autoplay) return;
        this.stopAutoplay();
        this.autoplayId = setInterval(() => {
            if (this.currentIndex < this.maxIndex) {
                this.next();
            } else {
                this.goTo(0);
            }
        }, this.autoplay);
    }

    stopAutoplay() {
        if (this.autoplayId !== null) {
            clearInterval(this.autoplayId);
            this.autoplayId = null;
        }
    }

    _init() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.prev();
                this.stopAutoplay();
            });
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.next();
                this.stopAutoplay();
            });
        }

        if (this.resetOnResize) {
            window.addEventListener('resize', () => this.refresh());
        }

        this.refresh();
        this.startAutoplay();
    }

    _render() {
        const offset = this.currentIndex * this.getStep(this.track);
        this.track.style.transform = `translateX(-${offset}px)`;

        this._updateButton(this.prevButton, this.currentIndex === 0);
        this._updateButton(this.nextButton, this.currentIndex >= this.maxIndex);

        this.onChange(this.currentIndex, this.total, this.slidesToShow());
    }

    _updateButton(button, isDisabled) {
        if (!button) return;
        button.disabled = isDisabled;
        button.classList.toggle('disabled', isDisabled);
    }
}

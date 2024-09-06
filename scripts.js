document.addEventListener('DOMContentLoaded', function() {
    const sliders = [];
    
    // Function to initialize sliders
    const initializeSliders = () => {
        document.querySelectorAll('.photo-slider').forEach((slider, index) => {
            sliders[index] = {
                slideIndex: 0,
                slides: slider.querySelectorAll('.photo-slide'),
                totalSlides: slider.querySelectorAll('.photo-slide').length
            };

            const showSlides = () => {
                const sliderData = sliders[index];
                sliderData.slides.forEach((slide, i) => {
                    slide.style.display = (i === sliderData.slideIndex) ? 'flex' : 'none';
                });
            };

            showSlides();

            const prevButton = slider.querySelector('.prev');
            const nextButton = slider.querySelector('.next');

            if (prevButton) {
                prevButton.addEventListener('click', () => changeSlide(-1, index));
            }
            if (nextButton) {
                nextButton.addEventListener('click', () => changeSlide(1, index));
            }
        });
    };

    // Function to change the slide
    const changeSlide = (n, index) => {
        const sliderData = sliders[index];
        sliderData.slideIndex += n;
        if (sliderData.slideIndex >= sliderData.totalSlides) {
            sliderData.slideIndex = 0;
        } else if (sliderData.slideIndex < 0) {
            sliderData.slideIndex = sliderData.totalSlides - 1;
        }
        sliderData.slides.forEach((slide, i) => {
            slide.style.display = (i === sliderData.slideIndex) ? 'flex' : 'none';
        });
    };

    // Initialize sliders on page load
    initializeSliders();

    // Expose changeSlide function to the global scope
    window.changeSlide = changeSlide;

    // Hamburger menu toggle logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');  // Toggle the 'show' class to display or hide the links
    });

    // Play music on user interaction
    const audio = document.getElementById('background-music');
    const prompt = document.createElement('div');
    prompt.id = 'interaction-prompt';
    prompt.style.position = 'fixed';
    prompt.style.top = '0';
    prompt.style.left = '0';
    prompt.style.width = '100%';
    prompt.style.height = '100%';
    prompt.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    prompt.style.color = '#fff';
    prompt.style.display = 'flex';
    prompt.style.alignItems = 'center';
    prompt.style.justifyContent = 'center';
    prompt.style.textAlign = 'center';
    prompt.style.fontSize = '20px';
    prompt.style.zIndex = '9999';
    prompt.innerHTML = '<p>Tap anywhere to start the background music.</p>';
    document.body.appendChild(prompt);

    const playAudio = () => {
        if (audio) {
            audio.play().catch(function(error) {
                console.log('Error playing audio: ' + error);
            });
            prompt.style.display = 'none'; // Hide the prompt after interaction
            document.removeEventListener('click', playAudio); // Remove event listener after playing
        }
    };

    document.addEventListener('click', playAudio);
});

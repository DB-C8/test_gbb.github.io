// We'll add JavaScript functionality as needed
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after animations complete
    setTimeout(function() {
        document.querySelector('.loader-wrapper').classList.add('fade-out');
    }, 2500);

    // Prevent scrolling while loader is visible
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
        document.body.style.overflow = 'visible';
    }, 2500);

    // Gallery functionality
    function initGallery() {
        const track = document.querySelector('.gallery-track');
        const slides = document.querySelectorAll('.gallery-slide');
        const nextButton = document.querySelector('.nav-btn.next');
        const prevButton = document.querySelector('.nav-btn.prev');
        const slideWidth = slides[0].offsetWidth + 24; // Width + gap

        nextButton.addEventListener('click', () => {
            track.parentElement.scrollBy({
                left: slideWidth,
                behavior: 'smooth'
            });
        });

        prevButton.addEventListener('click', () => {
            track.parentElement.scrollBy({
                left: -slideWidth,
                behavior: 'smooth'
            });
        });
    }

    // Reviews functionality
    function initReviews() {
        const reviews = [
            {
                text: "The attention to detail and skill of the barbers here is unmatched. Every visit feels like a luxury experience, and I always leave looking and feeling my best.",
                author: "Michael Thompson",
                role: "Regular Client"
            },
            {
                text: "Best barbershop in NYC! The hot towel shave is incredible, and the atmosphere is perfect. These guys know exactly what they're doing.",
                author: "David Martinez",
                role: "Loyal Customer"
            },
            {
                text: "Found my go-to spot for grooming. The team here understands modern styles while respecting classic techniques. Always a professional experience.",
                author: "James Wilson",
                role: "VIP Member"
            }
        ];

        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const cards = document.querySelectorAll('.testimonial-card');
        const reviewsNextButton = document.querySelector('.reviews-nav .next');
        const reviewsPrevButton = document.querySelector('.reviews-nav .prev');
        let currentReviewIndex = 0;
        let slideInterval;
        const SLIDE_INTERVAL_TIME = 5000; // 5 seconds between slides

        function showReview(index) {
            cards.forEach(card => {
                card.classList.remove('active');
                card.style.display = 'none';
            });
            dots.forEach(dot => dot.classList.remove('active'));

            cards[index].classList.add('active');
            cards[index].style.display = 'block';
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            showReview(currentReviewIndex);
        }

        function prevSlide() {
            currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
            showReview(currentReviewIndex);
        }

        // Start automatic sliding
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, SLIDE_INTERVAL_TIME);
        }

        // Stop automatic sliding
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        // Add event listeners
        reviewsNextButton?.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        reviewsPrevButton?.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        // Add click handlers for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                currentReviewIndex = index;
                showReview(currentReviewIndex);
                startAutoSlide();
            });
        });

        // Initialize first review and start auto-sliding
        showReview(0);
        startAutoSlide();
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
        
        menuBtn?.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Initialize both components
    initGallery();
    initReviews();
    initMobileMenu();

    // Add new Stats Counter functionality
    function initStatsCounter() {
        const stats = document.querySelectorAll('.stat-badge .number');
        console.log('Found stats elements:', stats.length); // Debug log
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log('Stat intersection:', entry.isIntersecting); // Debug log
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetNumber = parseInt(target.textContent);
                    console.log('Starting count to:', targetNumber); // Debug log
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = targetNumber / (duration / 16);

                    function updateCount() {
                        count += increment;
                        if (count < targetNumber) {
                            target.textContent = Math.round(count) + '+';
                            requestAnimationFrame(updateCount);
                        } else {
                            target.textContent = targetNumber + '+';
                        }
                    }

                    updateCount();
                    observer.unobserve(target);
                }
            });
        }, options);

        stats.forEach(stat => {
            console.log('Observing stat:', stat.textContent); // Debug log
            observer.observe(stat);
        });
    }

    // Add new Redefining Section Animation
    function initRedefiningAnimation() {
        const redefiningSection = document.querySelector('.redefining');
        const content = document.querySelector('.redefining-content');
        const statsImage = document.querySelector('.stats-image');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    content.classList.add('animate-in');
                    statsImage.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        observer.observe(redefiningSection);
    }

    // Initialize new components
    initStatsCounter();
    initRedefiningAnimation();

    // Lightbox functionality
    function initGalleryLightbox() {
        const galleryImages = document.querySelectorAll('.gallery-slide img');
        const lightbox = document.getElementById('imageLightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const closeBtn = document.querySelector('.lightbox-close');

        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                lightboxImg.src = img.src;
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close lightbox when clicking close button
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'visible'; // Re-enable scrolling
        });

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'visible'; // Re-enable scrolling
            }
        });

        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'visible'; // Re-enable scrolling
            }
        });
    }

    // Make sure to call this function in your DOMContentLoaded event
    initGalleryLightbox();

    // Function to handle sticky button position
    function handleStickyButton() {
        const stickyBtn = document.querySelector('.sticky-book-btn');
        const footer = document.querySelector('.footer');
        
        if (!stickyBtn || !footer) return;

        const footerTop = footer.getBoundingClientRect().top;
        
        if (footerTop <= window.innerHeight) {
            stickyBtn.style.position = 'absolute';
            stickyBtn.style.bottom = (footer.offsetHeight + 30) + 'px';
        } else {
            stickyBtn.style.position = 'fixed';
            stickyBtn.style.bottom = '30px';
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleStickyButton);

    // Initial call
    handleStickyButton();
}); 


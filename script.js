// document.addEventListener("DOMContentLoaded", function () {

//     const slides = document.querySelectorAll(".hero-slide");

//     const nextButton =
//         document.querySelector(".next-slide");

//     const prevButton =
//         document.querySelector(".prev-slide");

//     const currentNumber =
//         document.querySelector(".current-slide");

//     let currentIndex = 0;

//     let isAnimating = false;

//     let slideTimer;



//     /* =========================================================
//        UPDATE NUMBER
//     ========================================================= */

//     function updateNumber() {

//         const number =
//             String(currentIndex + 1).padStart(2, "0");

//         currentNumber.textContent = number;

//     }



//     /* =========================================================
//        CHANGE SLIDE
//     ========================================================= */

//     function changeSlide(direction) {

//         if (isAnimating) return;

//         isAnimating = true;


//         const oldIndex = currentIndex;


//         currentIndex += direction;


//         if (currentIndex >= slides.length) {

//             currentIndex = 0;

//         }


//         if (currentIndex < 0) {

//             currentIndex = slides.length - 1;

//         }


//         const oldSlide =
//             slides[oldIndex];

//         const newSlide =
//             slides[currentIndex];



//         /* ================================================
//            PREPARE NEW SLIDE
//         ================================================= */

//         newSlide.classList.remove(
//             "active",
//             "slide-leave",
//             "slide-enter"
//         );

//         oldSlide.classList.remove(
//             "slide-leave",
//             "slide-enter"
//         );


//         /*
//         Force browser to recognize
//         the class removal before animation
//         */

//         void newSlide.offsetWidth;



//         /* ================================================
//            NEW SLIDE GOES UNDERNEATH
//         ================================================= */

//         newSlide.classList.add("slide-enter");



//         /* ================================================
//            OLD SLIDE MOVES AWAY
//         ================================================= */

//         oldSlide.classList.add("slide-leave");



//         /* ================================================
//            UPDATE ACTIVE STATE
//         ================================================= */

//         setTimeout(function () {

//             newSlide.classList.add("active");

//         }, 50);



//         /* ================================================
//            UPDATE NUMBER
//         ================================================= */

//         updateNumber();



//         /* ================================================
//            FINISH ANIMATION
//         ================================================= */

//         setTimeout(function () {

//             slides.forEach(function (slide, index) {

//                 if (index !== currentIndex) {

//                     slide.classList.remove(
//                         "active",
//                         "slide-enter",
//                         "slide-leave"
//                     );

//                 }

//             });


//             newSlide.classList.remove(
//                 "slide-enter"
//             );

//             newSlide.classList.add(
//                 "active"
//             );


//             isAnimating = false;


//         }, 1200);



//         restartTimer();

//     }



//     /* =========================================================
//        NEXT
//     ========================================================= */

//     function nextSlide() {

//         changeSlide(1);

//     }



//     /* =========================================================
//        PREVIOUS
//     ========================================================= */

//     function previousSlide() {

//         changeSlide(-1);

//     }



//     /* =========================================================
//        BUTTONS
//     ========================================================= */

//     nextButton.addEventListener(
//         "click",
//         nextSlide
//     );


//     prevButton.addEventListener(
//         "click",
//         previousSlide
//     );



//     /* =========================================================
//        AUTO SLIDER
//     ========================================================= */

//     function startTimer() {

//         slideTimer = setInterval(
//             function () {

//                 changeSlide(1);

//             },
//             6500
//         );

//     }



//     function restartTimer() {

//         clearInterval(slideTimer);

//         startTimer();

//     }



//     /* =========================================================
//        KEYBOARD
//     ========================================================= */

//     document.addEventListener(
//         "keydown",
//         function (event) {

//             if (event.key === "ArrowRight") {

//                 nextSlide();

//             }

//             if (event.key === "ArrowLeft") {

//                 previousSlide();

//             }

//         }
//     );



//     /* =========================================================
//        INITIAL
//     ========================================================= */

//     slides.forEach(function (slide, index) {

//         slide.classList.remove(
//             "active",
//             "slide-enter",
//             "slide-leave"
//         );

//         if (index === 0) {

//             slide.classList.add("active");

//         }

//     });


//     updateNumber();

//     startTimer();

// });





document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".machiya-slider-track");
    const slides = document.querySelectorAll(".machiya-property-slide");
    const tabs = document.querySelectorAll(".machiya-tab");

    const nextButton = document.querySelector(".machiya-next");
    const prevButton = document.querySelector(".machiya-prev");

    const currentNumber =
        document.getElementById("machiyaCurrentNumber");

    let currentIndex = 0;
    const totalSlides = slides.length;


    /* =====================================================
       UPDATE SLIDER
    ===================================================== */

    function updatePropertySlider(index) {

        currentIndex = index;

        /*
         * Each slide is 25% of the 400% track.
         * Moving -25% reveals the next property.
         */

        track.style.transform =
            `translate3d(-${currentIndex * 25}%, 0, 0)`;


        /* ACTIVE SLIDE */

        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentIndex
            );

        });


        /* ACTIVE TAB */

        tabs.forEach((tab, i) => {

            tab.classList.toggle(
                "active",
                i === currentIndex
            );

        });


        /* COUNTER */

        currentNumber.textContent =
            String(currentIndex + 1).padStart(2, "0");

    }


    /* =====================================================
       NEXT
    ===================================================== */

    nextButton.addEventListener("click", function () {

        let nextIndex = currentIndex + 1;

        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }

        updatePropertySlider(nextIndex);

    });


    /* =====================================================
       PREVIOUS
    ===================================================== */

    prevButton.addEventListener("click", function () {

        let previousIndex = currentIndex - 1;

        if (previousIndex < 0) {
            previousIndex = totalSlides - 1;
        }

        updatePropertySlider(previousIndex);

    });


    /* =====================================================
       TABS
    ===================================================== */

    tabs.forEach((tab, index) => {

        tab.addEventListener("click", function () {

            updatePropertySlider(index);

        });

    });


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        /*
         * Only react when the property section
         * is visible on screen.
         */

        const section =
            document.querySelector(".machiya-properties");

        const rect = section.getBoundingClientRect();

        const sectionVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0;

        if (!sectionVisible) return;


        if (event.key === "ArrowRight") {

            let nextIndex = currentIndex + 1;

            if (nextIndex >= totalSlides) {
                nextIndex = 0;
            }

            updatePropertySlider(nextIndex);

        }


        if (event.key === "ArrowLeft") {

            let previousIndex = currentIndex - 1;

            if (previousIndex < 0) {
                previousIndex = totalSlides - 1;
            }

            updatePropertySlider(previousIndex);

        }

    });


    /* =====================================================
       TOUCH / SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    const slider =
        document.querySelector(".machiya-slider-viewport");


    slider.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    slider.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );


    function handleSwipe() {

        const swipeDistance =
            touchEndX - touchStartX;


        /* Swipe left = next */

        if (swipeDistance < -50) {

            let nextIndex = currentIndex + 1;

            if (nextIndex >= totalSlides) {
                nextIndex = 0;
            }

            updatePropertySlider(nextIndex);

        }


        /* Swipe right = previous */

        if (swipeDistance > 50) {

            let previousIndex = currentIndex - 1;

            if (previousIndex < 0) {
                previousIndex = totalSlides - 1;
            }

            updatePropertySlider(previousIndex);

        }

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updatePropertySlider(0);

});



// slider js start here






document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".hero-slide");
    const nextButton = document.querySelector(".next-slide");
    const prevButton = document.querySelector(".prev-slide");
    const currentNumber = document.querySelector(".current-slide");

    const propertyName =
        document.querySelector(".hero-property-name");

    const propertyTitle =
        document.querySelector(".property-title");


    if (!slides.length) return;


    /* =========================================================
       MACHiya NAMES
       
       IMPORTANT:
       These follow the exact order of your images.
    ========================================================= */

    const properties = [
        "Miyagawacho Samurai Machiya",
        "Gojo Samurai Machiya",
        "Gojozaka Samurai Machiya",
        "Tofukuji Samurai Machiya",
        "Miyagawacho Machiya",
        "Kyoto Machiya",
        "Samurai Machiya"
    ];


    /* =========================================================
       VARIABLES
    ========================================================= */

    let currentIndex = 0;
    let slideTimer = null;

    const autoSlideDuration = 6500;
    const animationDuration = 1200;


    /* =========================================================
       UPDATE SLIDE NUMBER
       
       This keeps your existing 01 / 02 counter.
    ========================================================= */

    function updateNumber() {

        if (!currentNumber) return;

        currentNumber.textContent =
            String(currentIndex + 1).padStart(2, "0");

    }


    /* =========================================================
       UPDATE MACHIYA NAME
    ========================================================= */

    function updatePropertyName() {

        if (!propertyTitle) return;


        /* Fade out */

        if (propertyName) {
            propertyName.classList.add("changing");
        }


        setTimeout(function () {

            propertyTitle.textContent =
                properties[currentIndex];


            /* Fade in */

            if (propertyName) {
                propertyName.classList.remove("changing");
            }

        }, 250);

    }


    /* =========================================================
       CHANGE SLIDE
    ========================================================= */

    function changeSlide(direction) {

        const oldIndex = currentIndex;


        /* Calculate next slide */

        currentIndex =
            (currentIndex + direction + slides.length)
            % slides.length;


        const oldSlide =
            slides[oldIndex];

        const newSlide =
            slides[currentIndex];


        /* ---------------------------------------------
           REMOVE OLD ANIMATION CLASSES
        --------------------------------------------- */

        slides.forEach(function (slide) {

            slide.classList.remove(
                "slide-enter",
                "slide-leave"
            );

        });


        /* ---------------------------------------------
           FORCE REFLOW
        --------------------------------------------- */

        void newSlide.offsetWidth;


        /* ---------------------------------------------
           NEW SLIDE ENTERS
        --------------------------------------------- */

        newSlide.classList.add(
            "slide-enter"
        );


        /* ---------------------------------------------
           OLD SLIDE LEAVES
        --------------------------------------------- */

        oldSlide.classList.add(
            "slide-leave"
        );


        /* ---------------------------------------------
           ACTIVATE NEW SLIDE
        --------------------------------------------- */

        newSlide.classList.add(
            "active"
        );


        /* ---------------------------------------------
           UPDATE COUNTER
        --------------------------------------------- */

        updateNumber();


        /* ---------------------------------------------
           UPDATE MACHIYA NAME
        --------------------------------------------- */

        updatePropertyName();


        /* ---------------------------------------------
           CLEAN AFTER ANIMATION
        --------------------------------------------- */

        setTimeout(function () {

            slides.forEach(function (slide, index) {

                if (index !== currentIndex) {

                    slide.classList.remove(
                        "active",
                        "slide-enter",
                        "slide-leave"
                    );

                }

            });


            newSlide.classList.remove(
                "slide-enter"
            );

            newSlide.classList.add(
                "active"
            );

        }, animationDuration);


        /* ---------------------------------------------
           RESET AUTO SLIDER
        --------------------------------------------- */

        restartTimer();

    }


    /* =========================================================
       NEXT
    ========================================================= */

    function nextSlide() {

        changeSlide(1);

    }


    /* =========================================================
       PREVIOUS
    ========================================================= */

    function previousSlide() {

        changeSlide(-1);

    }


    /* =========================================================
       NEXT ARROW
    ========================================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                nextSlide();

            }
        );

    }


    /* =========================================================
       PREVIOUS ARROW
    ========================================================= */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                previousSlide();

            }
        );

    }


    /* =========================================================
       AUTO SLIDER
    ========================================================= */

    function startTimer() {

        clearInterval(slideTimer);

        slideTimer = setInterval(
            function () {

                nextSlide();

            },
            autoSlideDuration
        );

    }


    function restartTimer() {

        clearInterval(slideTimer);

        startTimer();

    }


    /* =========================================================
       KEYBOARD
    ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "ArrowRight") {

                nextSlide();

            }


            if (event.key === "ArrowLeft") {

                previousSlide();

            }

        }
    );


    /* =========================================================
       INITIALIZE
    ========================================================= */

    slides.forEach(function (slide, index) {

        slide.classList.remove(
            "active",
            "slide-enter",
            "slide-leave"
        );


        if (index === 0) {

            slide.classList.add(
                "active"
            );

        }

    });


    currentIndex = 0;


    /* Initial counter */

    updateNumber();


    /* Initial Machiya name */

    if (propertyTitle) {

        propertyTitle.textContent =
            properties[0];

    }


    /* Start slider */

    startTimer();

});


// slider js end here

// review js start here

document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".review-slide");
    const prevButton = document.querySelector(".review-prev");
    const nextButton = document.querySelector(".review-next");

    const countNumber = document.querySelector(".reviews-count strong");
    const countTotal = document.querySelector(".reviews-count span");

    const progressBar = document.querySelector(".review-progress span");

    if (!slides.length) return;

    let currentIndex = 0;
    let autoSlide;

    const slideDuration = 5000; // 5 seconds


    /* =========================
       TOTAL REVIEWS
    ========================= */

    if (countTotal) {
        countTotal.textContent =
            "/ " + String(slides.length).padStart(2, "0");
    }


    /* =========================
       UPDATE REVIEW
    ========================= */

    function showReview(index) {

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

        /* Update counter */
        if (countNumber) {
            countNumber.textContent =
                String(index + 1).padStart(2, "0");
        }

        /* Update progress */
        if (progressBar) {
            progressBar.style.width =
                ((index + 1) / slides.length * 100) + "%";
        }
    }


    /* =========================
       NEXT REVIEW
    ========================= */

    function nextReview() {

        currentIndex++;

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        showReview(currentIndex);
    }


    /* =========================
       PREVIOUS REVIEW
    ========================= */

    function previousReview() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }

        showReview(currentIndex);
    }


    /* =========================
       AUTO SLIDER
    ========================= */

    function startAutoSlide() {

        clearInterval(autoSlide);

        autoSlide = setInterval(function () {
            nextReview();
        }, slideDuration);
    }


    /* =========================
       MANUAL NEXT
    ========================= */

    if (nextButton) {

        nextButton.addEventListener("click", function () {

            nextReview();

            /* Restart timer */
            startAutoSlide();

        });

    }


    /* =========================
       MANUAL PREVIOUS
    ========================= */

    if (prevButton) {

        prevButton.addEventListener("click", function () {

            previousReview();

            /* Restart timer */
            startAutoSlide();

        });

    }


    /* =========================
       INITIAL STATE
    ========================= */

    showReview(0);

    startAutoSlide();

});


// end here



document.addEventListener("DOMContentLoaded", function () {

    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".custom-cursor-dot");

    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    /* Mouse position */

    document.addEventListener("mousemove", function (e) {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

    });


    /* Smooth outer cursor */

    function animateCursor() {

        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    /* =========================================
       HOVER EFFECT
    ========================================= */

    const hoverElements = document.querySelectorAll(
        "a, button, input, select, textarea, .machiya-room, .machiya-tab"
    );

    hoverElements.forEach(function (element) {

        element.addEventListener("mouseenter", function () {

            cursor.style.width = "58px";
            cursor.style.height = "58px";

            cursor.style.background = "rgba(255, 44, 32, .08)";
            cursor.style.borderColor = "#FF2C20";

        });


        element.addEventListener("mouseleave", function () {

            cursor.style.width = "38px";
            cursor.style.height = "38px";

            cursor.style.background = "transparent";

        });

    });


    /* Hide cursor outside browser window */

    document.addEventListener("mouseleave", function () {

        cursor.style.opacity = "0";
        cursorDot.style.opacity = "0";

    });


    document.addEventListener("mouseenter", function () {

        cursor.style.opacity = "1";
        cursorDot.style.opacity = "1";

    });

});


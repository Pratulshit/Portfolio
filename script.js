/* =====================================================
   TYPING ANIMATION
===================================================== */

const typingText =
document.getElementById("typing-text");

const words = [

    "CSE Student",

    "Web Developer",

    "Problem Solver",

    "Tech Enthusiast"

];

let wordIndex = 0;

let characterIndex = 0;

let deleting = false;



function typeEffect() {

    const currentWord =
        words[wordIndex];


    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1700
            );

            return;
        }


    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex >=
                words.length
            ) {

                wordIndex = 0;
            }
        }
    }


    const speed =
        deleting ? 55 : 90;


    setTimeout(
        typeEffect,
        speed
    );
}


typeEffect();



/* =====================================================
   MOBILE NAV TOGGLE
===================================================== */

const navToggle =
document.getElementById("nav-toggle");

const navMenu =
document.getElementById("nav-menu");

if (navToggle && navMenu) {

    navToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle("open");

            navToggle.classList.toggle(
                "open",
                isOpen
            );

            navToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "nav-locked",
                isOpen
            );

        }
    );

}


/* =====================================================
   ACTIVE NAVBAR
===================================================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-link");

window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 150;

                const sectionHeight =
                    section.clientHeight;


                if (
                    window.scrollY >=
                    sectionTop &&

                    window.scrollY <
                    sectionTop +
                    sectionHeight
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );
                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );
                }

            }
        );

    }
);



/* =====================================================
   SMOOTH SCROLL
===================================================== */

navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const target =
                    document.querySelector(
                        this.getAttribute(
                            "href"
                        )
                    );


                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }


                /* Close mobile menu after tap */

                if (
                    navMenu &&
                    navMenu.classList.contains("open")
                ) {

                    navMenu.classList.remove("open");

                    navToggle.classList.remove("open");

                    navToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "nav-locked"
                    );

                }

            }
        );

    }
);



/* =====================================================
   PHOTO MOUSE EFFECT
===================================================== */

const heroVisual =
document.querySelector(
    ".hero-visual"
);

const photoFrame =
document.querySelector(
    ".photo-frame"
);

if (
    heroVisual &&
    photoFrame &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                )
                /
                rect.width
                -
                0.5;


            const y =
                (
                    event.clientY -
                    rect.top
                )
                /
                rect.height
                -
                0.5;


            photoFrame.style.transform =
                `translate(
                    ${x * 7}px,
                    ${y * 7}px
                )`;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            photoFrame.style.transform =
                "translate(0, 0)";

        }
    );

}

/* =====================================================
   SKILLS NETWORK — SCALE DESKTOP DESIGN TO FIT ANY SCREEN
   The network is built at a fixed "design size" of
   1100 x 620. Instead of reflowing it into a different
   mobile layout, we shrink the whole thing uniformly so
   every device sees the exact same design, just scaled.

   ResizeObserver is used (instead of relying on load /
   DOMContentLoaded, which may already have fired by the
   time this script runs) because it fires as soon as the
   stage's real size is known and again on every resize.
===================================================== */

const skillsStage =
document.getElementById("skills-stage");

const skillsNetwork =
document.getElementById("skills-network");

const SKILLS_DESIGN_WIDTH = 1100;
const SKILLS_DESIGN_HEIGHT = 620;

function scaleSkillsNetwork() {

    if (!skillsStage || !skillsNetwork) {
        return;
    }

    const availableWidth =
        skillsStage.getBoundingClientRect().width ||
        skillsStage.clientWidth;

    if (!availableWidth) {
        return;
    }

    const scale =
        Math.min(
            1,
            availableWidth / SKILLS_DESIGN_WIDTH
        );

    skillsNetwork.style.transform =
        `scale(${scale})`;

    skillsStage.style.height =
        `${SKILLS_DESIGN_HEIGHT * scale}px`;

}

if (skillsStage && skillsNetwork) {

    /* Primary: fires immediately once the stage has a
       real measurable size, and again on every resize */

    if (typeof ResizeObserver !== "undefined") {

        const skillsResizeObserver =
            new ResizeObserver(() => {

                scaleSkillsNetwork();

            });

        skillsResizeObserver.observe(skillsStage);

    }


    /* Fallbacks for browsers without ResizeObserver, or
       in case the very first observer tick is delayed */

    scaleSkillsNetwork();

    requestAnimationFrame(scaleSkillsNetwork);

    setTimeout(scaleSkillsNetwork, 100);
    setTimeout(scaleSkillsNetwork, 500);

    window.addEventListener(
        "resize",
        scaleSkillsNetwork
    );

    window.addEventListener(
        "orientationchange",
        scaleSkillsNetwork
    );

    window.addEventListener(
        "load",
        scaleSkillsNetwork
    );

    document.addEventListener(
        "DOMContentLoaded",
        scaleSkillsNetwork
    );

}


/* =====================================================
   SKILLS LIVE ANIMATION
===================================================== */

const skillSection =
document.querySelector(".skills-section");

const skillNodes =
document.querySelectorAll(".skill-node");

const skillCore =
document.querySelector(".skills-core");


if (skillSection && skillCore) {

    skillNodes.forEach((node) => {

        node.addEventListener(
            "mouseenter",
            () => {

                skillCore.classList.add(
                    "core-active"
                );

            }
        );


        node.addEventListener(
            "mouseleave",
            () => {

                skillCore.classList.remove(
                    "core-active"
                );

            }
        );

    });


    /* Mouse glow */

    skillSection.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                skillSection.getBoundingClientRect();

            const x =
                (
                    event.clientX -
                    rect.left
                ) / rect.width;

            const y =
                (
                    event.clientY -
                    rect.top
                ) / rect.height;

            skillSection.style.setProperty(
                "--mouse-x",
                `${x * 100}%`
            );

            skillSection.style.setProperty(
                "--mouse-y",
                `${y * 100}%`
            );

        }
    );

}

/* =====================================================
   EDUCATION SCROLL ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const educationItems =
        document.querySelectorAll(".education-item");


    const educationObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry, index) => {

                    if (entry.isIntersecting) {

                        setTimeout(() => {

                            entry.target.classList.add("show");

                        }, index * 180);

                        educationObserver.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.18
            }
        );


    educationItems.forEach((item) => {

        educationObserver.observe(item);

    });

});

/* =====================================================
   CONTACT FORM ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const contactSection =
        document.querySelector(".contact-section");

    const contactWrapper =
        document.querySelector(".contact-wrapper");

    const socialCards =
        document.querySelectorAll(".social-card");


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    if (contactSection) {

        const contactObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            contactWrapper.classList.add(
                                "contact-visible"
                            );

                            socialCards.forEach(
                                (card, index) => {

                                    setTimeout(() => {

                                        card.classList.add(
                                            "social-visible"
                                        );

                                    }, index * 120);

                                }
                            );

                            contactObserver.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        contactObserver.observe(
            contactSection
        );
    }


    /* =================================================
       FORM SUBMIT FEEDBACK
    ================================================= */

    const contactForm =
        document.getElementById("contactForm");

    const successMessage =
        document.getElementById("contactSuccess");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            () => {

                const button =
                    contactForm.querySelector(
                        ".contact-send-btn"
                    );

                const buttonText =
                    button.querySelector("span");

                buttonText.textContent =
                    "Sending...";

                button.disabled = true;

                setTimeout(() => {

                    successMessage.classList.add(
                        "show"
                    );

                }, 1200);

            }
        );

    }

});

/* =====================================================
   CONTACT FORM - AJAX EMAIL
===================================================== */

const contactForm =
    document.getElementById("contact-form");

const contactStatus =
    document.getElementById("contact-status");

const contactSubmit =
    document.getElementById("contact-submit");

const receiverEmail =
    "bubai7846@gmail.com";


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* --------------------------------
               GET FORM DATA
            -------------------------------- */

            const name =
                document
                    .getElementById("contact-name")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("contact-email")
                    .value
                    .trim();

            const message =
                document
                    .getElementById("contact-message")
                    .value
                    .trim();


            /* --------------------------------
               BASIC VALIDATION
            -------------------------------- */

            if (
                !name ||
                !email ||
                !message
            ) {

                contactStatus.textContent =
                    "Please fill in all fields.";

                contactStatus.className =
                    "contact-status error";

                return;
            }


            /* --------------------------------
               BUTTON LOADING
            -------------------------------- */

            contactSubmit.disabled = true;

            contactSubmit.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                <span>Sending...</span>
            `;

            contactStatus.textContent = "";


            try {

                /* --------------------------------
                   FORMSUBMIT AJAX REQUEST
                -------------------------------- */

                const response =
                    await fetch(
                        `https://formsubmit.co/ajax/${receiverEmail}`,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"

                            },

                            body: JSON.stringify({

                                name: name,

                                email: email,

                                message: message,

                                _subject:
                                    "New Portfolio Contact Message",

                                _replyto:
                                    email,

                                _template:
                                    "table"

                            })

                        }
                    );


                const data =
                    await response.json();


                /* --------------------------------
                   SUCCESS
                -------------------------------- */

                if (
                    response.ok &&
                    data.success
                ) {

                    contactStatus.textContent =
                        "✓ Message sent successfully! I'll get back to you soon.";

                    contactStatus.className =
                        "contact-status success";


                    contactForm.reset();


                    contactSubmit.innerHTML = `
                        <i class="fa-solid fa-check"></i>
                        <span>Message Sent</span>
                    `;


                    /* ----------------------------
                       RETURN BUTTON
                    ---------------------------- */

                    setTimeout(
                        function () {

                            contactSubmit.disabled =
                                false;

                            contactSubmit.innerHTML = `
                                <i class="fa-regular fa-paper-plane"></i>
                                <span>Send Message</span>
                            `;

                        },
                        3000
                    );

                }

                else {

                    throw new Error(
                        "Message could not be sent."
                    );

                }


            }

            catch (error) {

                console.error(
                    "Contact Form Error:",
                    error
                );


                contactStatus.textContent =
                    "✕ Something went wrong. Please try again.";

                contactStatus.className =
                    "contact-status error";


                contactSubmit.disabled =
                    false;

                contactSubmit.innerHTML = `
                    <i class="fa-regular fa-paper-plane"></i>
                    <span>Send Message</span>
                `;

            }

        }
    );

}
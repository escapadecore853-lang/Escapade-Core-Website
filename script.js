console.log("Escapade core javascript is working");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen =
navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen)
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
menuToggle.setAttribute("aria-expanded", "false");
    });
});

const revealElements =
document.querySelectorAll(
    "section, .service-card, .why-card, .section-heading"
);

const revealObserver = new
IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});

const contactForm =
document.querySelector(".contact-form");
const formStatus =
document.querySelector("#form-status");

contactForm.addEventListener("submit", async function (e){
    e.preventDefault();

    const submitButton =
    contactForm.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    const originalText = submitButton ? submitButton.textContent:"";

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
    }

    formStatus.textContent = "Sending Your Message...";

    try {
        const response = await fetch(contactForm.action, {
            method:"POST",
            body: new FormData(contactForm),
            headers:{
                Accept: "application/json"
            }
        });

        if(response.ok){
            formStatus.textContent =
            "Thanks for reaching out! Your message has been sent."
            
            contactForm.reset();
        } else{
            formStatus.textContent =
            "Message not sent. Please check your details and try again.";
        }

    }catch(error){
        formStatus.textContent=
        "Something went wrong. Please check your connection and try again.";
    } finally{
        if(submitButton){
            submitButton.disabled = false;
            submitButton.textContent = originalText || "Send Message";
        }
    }
});
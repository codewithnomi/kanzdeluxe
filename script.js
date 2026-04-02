document.addEventListener('DOMContentLoaded', () => {
    // 1. GSAP Loader Animation
    const tlLoader = gsap.timeline();

    tlLoader.to('.loader-logo', {
        opacity: 1,
        duration: 1.2,
        scale: 1.1,
        ease: "power3.out",
        force3D: true // Hardware acceleration
    })
        .to('.loader-logo', {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.in",
            force3D: true
        })
        .to('.loader-wrapper', {
            height: 0,
            duration: 1.2,
            ease: "expo.inOut"
        }, "-=0.2")
        // Show logo immediately after loader starts moving
        .to('#logo-img', {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            force3D: true
        }, "-=0.5");

    // 2. Hero Content Entrance Animation
    const tlHero = gsap.timeline({
        delay: 2.2 // Starts after loader
    });

    tlHero.to('.subtitle', {
        opacity: 1,
        y: -20,
        duration: 1,
        ease: "power3.out",
        force3D: true
    })
        .to('.title', {
            opacity: 1,
            y: -20,
            duration: 1,
            ease: "power3.out",
            force3D: true
        }, "-=0.6")
        .to('.description', {
            opacity: 1,
            y: -20,
            duration: 1,
            ease: "power3.out",
            force3D: true
        }, "-=0.6")
        .to('.newsletter-form', {
            opacity: 1,
            y: -20,
            duration: 1,
            ease: "power3.out",
            force3D: true
        }, "-=0.6");

    // 3. Floating Background Blobs Animation
    gsap.to('.blob-1', {
        x: '30%',
        y: '20%',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to('.blob-2', {
        x: '-20%',
        y: '-30%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to('.blob-3', {
        x: '50%',
        y: '-10%',
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 4. Form Handling & "Storage" Simulation
    const form = document.getElementById('newsletter-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const submitBtn = document.getElementById('submit-btn');

        // Disable button during "submission"
        submitBtn.disabled = true;
        submitBtn.innerText = "Processing...";

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to save number');
            }

            console.log(`[Kanz CRM] Form submitted successfully to Formspree`);

            // Artificial delay for UX
            await new Promise(resolve => setTimeout(resolve, 1000));

            // GSAP Success Animation
            gsap.to(form, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                display: 'none',
                force3D: true,
                onComplete: () => {
                    successMessage.classList.remove('hidden');
                    gsap.fromTo(successMessage,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", force3D: true }
                    );
                }
            });

        } catch (error) {
            console.error("Error submitting form:", error);
            submitBtn.disabled = false;
            submitBtn.innerText = "Try Again";
            alert("Something went wrong. Please check your internet and try again.");
        }
    });
});

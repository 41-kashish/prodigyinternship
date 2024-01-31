document.addEventListener("DOMContentLoaded", function () {
    // Typed.js initialization
    var typed = new Typed(".text", {
        strings: ["butterfly", "frontend developer", "youtuber", "web developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function () {
        const fromTop = window.scrollY + 70;

        navLinks.forEach(link => {
            const section = document.getElementById(link.getAttribute('href').substring(1));
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
        // Adjust styles based on screen size
        window.addEventListener('resize', function () {
            const screenSize = window.innerWidth;
    
            if (screenSize < 768) {
                // Styles for smaller screens
                document.body.style.fontSize = '14px';
                document.querySelector('.about-content').style.textAlign = 'left';
                document.querySelector('.outer-circle').marginRight = '0'; // Reset margin
            } else {
                // Reset styles for larger screens
                document.body.style.fontSize = '';
                document.querySelector('.about-content').style.textAlign = 'center';
                document.querySelector('.outer-circle').marginRight = '50px'; // Adjust margin
            }
        });
    });
    

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function() {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function() {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

})(jQuery);

function showRegistrationForm() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("popup").style.display = "block";

    document.getElementById("duration").value = "Not Selected";
    document.getElementById("domain").value = "Not Selected";
    document.getElementById("join").value = "Not Selected";

    document.getElementById("linkedinLink").style.display = "none";
}

function closeRegistrationForm() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}

function toggleLinkedInLink() {
    var joinSelect = document.getElementById("join");
    var linkedinLink = document.getElementById("linkedinLink");
    linkedinLink.style.display = joinSelect.value === "No" ? "block" : "none";
}

function toggleOtherTextBox() {
    var yearSelect = document.getElementById("year");
    var otherTextBox = document.getElementById("otherTextBox");
    otherTextBox.style.display = yearSelect.value === "Other" ? "block" : "none";
}

function showPopup(courseName, internshipDomain) {
    document.getElementById('courseField').value = courseName;
    document.getElementById('courseNameDisplay').innerText = courseName;

    var domainSelect = document.getElementById('domain');
    domainSelect.innerHTML = '';

    var defaultOption = document.createElement('option');
    defaultOption.value = 'NotSelected';
    defaultOption.text = 'Select an option';
    defaultOption.disabled = true;
    domainSelect.appendChild(defaultOption);

    var selectedOption = document.createElement('option');
    selectedOption.value = internshipDomain;
    selectedOption.text = internshipDomain;
    domainSelect.appendChild(selectedOption);

    document.getElementById('backdrop').style.display = 'block';
    document.getElementById('popupForm').style.display = 'block';

    if (internshipDomain === 'No Internship') {
        document.getElementById('duration').style.display = 'none';
    } else {
        document.getElementById('duration').style.display = 'block';
    }

    toggleLinkedInLink();
}

function closePopup() {
    document.getElementById('backdrop').style.display = 'none';
    document.getElementById('popupForm').style.display = 'none';
}

function subscribeNewsletter() {
    var emailInput = document.getElementById('newsletter-email');
    var messageContainer = document.getElementById('newsletter-message');
    var email = emailInput.value.trim();

    if (email !== '' && isValidEmail(email)) {
        messageContainer.innerText = '✅ Subscribed successfully!';
        messageContainer.classList.add('text-success');
        messageContainer.classList.remove('text-danger');
    } else {
        messageContainer.innerText = '❌ Please enter a valid email.';
        messageContainer.classList.add('text-danger');
        messageContainer.classList.remove('text-success');
    }

    emailInput.value = '';
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

         // Get the current year
         var currentYear = new Date().getFullYear();

         // Set the current year in the footer
         document.getElementById('currentYear').innerText = currentYear;
         

         // Function to update the current time
function updateTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const now = new Date();
    
    // Format hours for 12-hour format
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12

    // Get the current day
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];

    currentTimeElement.textContent = `${day}, ${hours}:${minutes}:${seconds} ${ampm}`;
}

// Function to update the current year
function updateYear() {
    const currentYearElement = document.getElementById('currentYear');
    currentYearElement.textContent = new Date().getFullYear();
}

// Update time every second
setInterval(updateTime, 1000);

// Set the current year on page load
updateYear();

 // JavaScript to handle form submission and display thank you message
 document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Show the thank you card
    document.getElementById('contactFormContainer').classList.add('d-none');
    document.getElementById('thankYouCard').classList.remove('d-none');

    // Explicitly submit the form to Google Apps Script
    this.submit();
});


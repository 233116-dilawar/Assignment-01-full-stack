$(document).ready(function() {
    // Interactive animations for header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('shadow-md bg-white/90 backdrop-blur-md');
        } else {
            $('header').removeClass('shadow-md bg-white/90 backdrop-blur-md');
        }
    });

    // Form validations
    $('form.validate-form').on('submit', function(e) {
        let valid = true;
        $(this).find('input[required], select[required], textarea[required]').each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('border-red-500').removeClass('border-gray-300');
                $(this).next('.error-msg').text('This field is required').show();
                valid = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-gray-300');
                $(this).next('.error-msg').hide();
            }

            // Email validation
            if($(this).attr('type') === 'email' && $(this).val().trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailRegex.test($(this).val())) {
                    $(this).addClass('border-red-500').removeClass('border-gray-300');
                    $(this).next('.error-msg').text('Invalid email format').show();
                    valid = false;
                }
            }

            // Password validation
            if($(this).attr('type') === 'password' && $(this).val().trim() !== '') {
                 if($(this).val().length < 6) {
                    $(this).addClass('border-red-500').removeClass('border-gray-300');
                    $(this).next('.error-msg').text('Password must be at least 6 characters').show();
                    valid = false;
                }
            }
        });

        // Passwords match validation
        let pass = $(this).find('input[name="password"]').val();
        let confirmPass = $(this).find('input[name="confirm_password"]').val();
        if(confirmPass !== undefined && pass !== confirmPass) {
             $(this).find('input[name="confirm_password"]').addClass('border-red-500').removeClass('border-gray-300');
             $(this).find('input[name="confirm_password"]').next('.error-msg').text('Passwords do not match').show();
             valid = false;
        }

        if (!valid) {
            e.preventDefault();
            // simple shake animation on form
            $(this).addClass('animate-shake');
            setTimeout(() => { $(this).removeClass('animate-shake'); }, 500);
        }
    });

    // Mobile menu toggle
    $('#mobile-menu-btn').on('click', function() {
        $('#mobile-menu').slideToggle();
    });

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('opacity-100 translate-y-0');
                $(entry.target).removeClass('opacity-0 translate-y-10');
            }
        });
    });

    $('.animate-on-scroll').each(function() {
        observer.observe(this);
    });

    // Tabs functionality (e.g. for My Account, Details)
    $('.tab-btn').on('click', function() {
        const target = $(this).data('target');
        $('.tab-btn').removeClass('border-blue-600 text-blue-600').addClass('border-transparent text-gray-500');
        $(this).addClass('border-blue-600 text-blue-600').removeClass('border-transparent text-gray-500');
        
        $('.tab-content').hide();
        $('#' + target).fadeIn();
    });
});

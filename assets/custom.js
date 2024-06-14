
document.addEventListener('DOMContentLoaded', function() {
    if (window.matchMedia('(max-width: 767px)').matches) {
        document.querySelectorAll('.bf-bundles__item-before').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '18px';
            }
        });

        document.querySelectorAll('.bf-bundles__item-after').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '21px';
            }
        });

        document.querySelectorAll('.subscribePrice p').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '14px';
            }
        });

        document.querySelectorAll('.subscribePrice p span').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '14px';
            }
        });

    }
    else {
        document.querySelectorAll('.bf-bundles__item-before').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '16px';
            }
        });

        document.querySelectorAll('.bf-bundles__item-after').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '18px';
            }
        }); 

        document.querySelectorAll('.subscribePrice p span').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '16px';
            }
        });

        document.querySelectorAll('.planBlock .price').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '14px';
            }
        });
    }

    //set "no-subscription variant" for all pdp pages as default
    setTimeout(() => {
        var selector = '.subscriptionType[data-subscription="no-subscription"]';
        if (document.querySelector(selector)) {
            triggerClick(selector);
        }
    }, 750);

    //https://www.qureskincare.com/pages/q-urify-water-filter-guide
    if (template == 'page.sunil-q-urify-safety') {
        document.querySelector('#hs_1').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step6');
        });
        document.querySelector('#hs_2').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step8');
        });
        document.querySelector('#hs_3').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step10');
        });
        document.querySelector('#hsm_1').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step6');
            triggerClick('.hamburger-container');
        });
        document.querySelector('#hsm_2').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step8');
            triggerClick('.hamburger-container');
        });
        document.querySelector('#hsm_3').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step10');
            triggerClick('.hamburger-container');
        });
    }

    //https://www.qureskincare.com/pages/microinfusion-safety-guide
    if (template == 'page.sunil-micro-infusion-safety') {
        document.querySelector('#hs_1').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step6');
        });
        document.querySelector('#hs_2').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step4');
        });
        document.querySelector('#hs_3').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step10');
        });
        document.querySelector('#hsm_1').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step6');
            triggerClick('.hamburger-container');
        });
        document.querySelector('#hsm_2').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step4');
            triggerClick('.hamburger-container');
        });
        document.querySelector('#hsm_3').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.step10');
            triggerClick('.hamburger-container');
        });
    }

    //https://www.qureskincare.com/pages/q-rejuvalight-pro-LED-mask-guide
    if (template == 'page.sunil-micro-mask-guide') {

        if (window.location.hash) {
            switch (window.location.hash) {
                case '#how-to-use':
                    triggerClick('.how-to-use');
                    break;
                case '#getting-started':
                    triggerClick('.getting-started');
                    break;
                case '#troubleshooting':
                    triggerClick('.troubleshooting');
                    break;
                case '#take-care':
                    triggerClick('.take-care');
                    break;
                default:
                    break;
            }
        }

        document.querySelector('#hs_1').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.how-to-use');
        });
        document.querySelector('#hsm_1').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.how-to-use');
        });
        document.querySelector('#hs_2').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.getting-started');
        });
        document.querySelector('#hsm_2').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.getting-started');
        });
        document.querySelector('#hs_3').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.troubleshooting');
        });
        document.querySelector('#hsm_3').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.troubleshooting');
        });
        document.querySelector('#hs_4').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.take-care');
        });
        document.querySelector('#hsm_4').addEventListener('click', function() {
            event.preventDefault();
            triggerClick('.take-care');
        });
    }

    //https://www.qureskincare.com/products/micro-infusion-targeted-patches
    var swiper = new Swiper(".combat_slider", {
        slidesPerView: 3.6,
        grid: {
            rows: 1,
            fill: "row",
        },
        spaceBetween: 20,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            556: {
                slidesPerView: 5.3,
            },
            768: {
                slidesPerView: 3,
                grid: {
                    rows: 3,
                    fill: "row",
                }
            },
    
        },
    });

});

function triggerClick(selector) {
    var event = new Event('click', {
        'bubbles': true,
        'cancelable': true
    });
    var element = document.querySelector(selector);
    if (element) {
        element.dispatchEvent(event);
    } else {
        console.warn('Element with selector ' + selector + ' not found.');
    }
}
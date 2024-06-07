
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

    

    if (window.location.hash) {
        switch (window.location.hash) {
            //https://www.qureskincare.com/pages/q-rejuvalight-pro-LED-mask-guide
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

    if (window.location.href.includes("/pages/q-urify-water-filter-guide")) {
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

    if (window.location.href.includes("/pages/microinfusion-safety-guide")) {
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
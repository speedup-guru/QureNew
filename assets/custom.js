
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

    //https://www.qureskincare.com/pages/q-rejuvalight-pro-LED-mask-guide

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
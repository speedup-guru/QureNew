
document.addEventListener('DOMContentLoaded', function() {
    if (window.matchMedia('(max-width: 767px)').matches) {
        document.querySelectorAll('.bf-bundles__item-before').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '25px';
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
                item.style.fontSize = '19px';
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
});
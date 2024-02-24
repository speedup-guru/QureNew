var item = item || [];
var _learnq = _learnq || [];

document.querySelectorAll('.event_btn').forEach(button => {
    button.addEventListener('click', (event) => {
        pushEvent();
    });
});

document.querySelectorAll('.prepare_event_btn').forEach(button => {
    button.addEventListener('click', (event) => {
        let targetButton = event.target.closest('.prepare_event_btn');
        let product_handle = targetButton ? targetButton.getAttribute('data-product-handle') : null;

        if(product_handle)
        {
            fetchProductData(product_handle)
            .then(() => {
                pushEvent();
            })
        }
    });
});


var updateItemObject = function(product_variant_id)
{
    let variants_to_handles = [];

    //kits from https://www.qureskincare.com/pages/micro-infusion-refill

    variants_to_handles[43821031031023] = 'micro-infusion-3-month-refill-3x-b-g-serum-3x-e-g-f-serum';
    variants_to_handles[43821069435119] = 'micro-infusion-3-month-refill-6x-rejuvenating-serum';
    variants_to_handles[43821035290863] = 'micro-infusion-3-month-refill-6x-hydra-soothing-serum';


    //products from https://www.qureskincare.com/pages/microinfusion
    
    //Rejuvenating + Hydra-Soothing
    variants_to_handles[43216489513199] = 'micro-infusion-1-month-bundle-1x-b-g-serum-1x-e-g-f-serum';   //1 month
    variants_to_handles[43216449208559] = 'micro-infusion-2-month-bundle-2x-b-g-serum-2x-e-g-f-serum';   //2 months
    variants_to_handles[43216377217263] = 'micro-infusion-3-month-bundle-3x-b-g-serum-3x-e-g-f-serum';   //3 months

    //Rejuvenating
    variants_to_handles[43216457203951] = 'micro-infusion-1-month-bundle-2x-e-g-f-serum';           //1 month
    variants_to_handles[43216398450927] = 'micro-infusion-2-month-bundle-4x-e-g-f-serum';           //2 months
    variants_to_handles[43216299819247] = 'micro-infusion-3-month-bundle';                          //3 months

    //Hydra-Soothing
    variants_to_handles[43216483942639] = 'micro-infusion-1-month-bundle-2x-beta-glucan-serum';   //1 month
    variants_to_handles[43216434069743] = 'micro-infusion-2-month-bundle-4x-beta-glucan-serum';   //2 months
    variants_to_handles[43216359555311] = 'micro-infusion-3-month-bundle-6x-beta-glucan-serum';   //3 months


    if(variants_to_handles[product_variant_id])
    {
        fetchProductData(variants_to_handles[product_variant_id]);
    }
}

var fetchProductData = function(product_handle)
{
    return new Promise((resolve, reject) => {
        let baseUrl = '/products/' + product_handle + '.js';

        fetch(baseUrl, {
            method: 'GET',
            cache: 'default'
        })
        .then(response => response.json())
        .then(data => {
            window.item = {
                Name: data.title,
                ProductID: data.id,
                Categories: data.tags,
                ImageURL: data.featured_image,
                URL: window.location.origin + data.url,
                Brand: data.vendor,
                Price: data.price,
                CompareAtPrice: data.price
            }
            resolve();
        })
        .catch(error => {
            console.log('Error fetching the content:', error);
            reject(error);
        });
    });
}

var pushEvent = function() {
    console.log('Added to Cart');
    console.log(item);
    _learnq.push(['track', 'Added to Cart', item]);
};
/**
 * Retrieves the user's location IP and calls the deliveryDate function with the result.
 */
const userLocationIP = () => {
  const url = 'https://us-central1-functions-358315.cloudfunctions.net/location';
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('result', result);
      return deliveryDate(result);
    })
    .catch(error => console.log('error', error));
}


/**
 * Retrieves the delivery range for a given state.
 * @param {string} stateAcronym - The acronym of the state.
 * @returns {number|null} - The delivery range for the state, or null if not found.
 */
function getDeliveryRange(stateAcronym) {
  console.log(stateAcronym);
  const stateFound = window.statesInfo.find(
    (state) => state.stateAcronym === stateAcronym
  );

  return stateFound ? stateFound.deliveryRange : null;
}


/**
 * Calculates and displays the delivery date based on the location.
 * @param {Object} location - The location object containing the countryCode and region.
 */
const deliveryDate = (location) => {
  const { countryCode, region } = location;

  const messageContainer = document.querySelector('.orderby-receiveby__shipping-text');
  const nationalMessage = window.nationalText.split('[]');

  if (countryCode != 'US') {
    messageContainer.innerText = window.internationalText
  } else {

    const foundNationalDate = getDeliveryRange(region.toUpperCase());
    messageContainer.innerText = `${nationalMessage[0]} ${foundNationalDate} ${nationalMessage[1]}`
  }
  document.querySelector('.orderby-receiveby').classList.remove('hidden');
}

// bestseller section on hompage
  const initSwiperBestSeller = () => {
    swiper = new Swiper('.best-seller-section .swiper', {
      spaceBetween: 16,
      slidesPerView: 'auto',
      mousewheel: {
        forceToAxis: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerGroup: 1,
          slidesPerView: 'auto',
          spaceBetween: 16,
          slidesOffsetBefore: 24,
          slidesOffsetAfter: 24
        },
        768: {
          slidesPerGroup: 2,
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerGroup: 1,
          slidesPerView: 'auto',
          spaceBetween: 16,
        }
      }
    });
    return swiper;
  }

const initBestSellerSection = () => { 
  const categoryButtons = document.querySelectorAll('.best-seller-section .best-seller-wrapper__categories .btn');
  const productCardsContainer = document.querySelector('.best-seller-section .best-seller-wrapper__products-container');
  const bestSellerFooter = document.querySelector('.best-seller-section .best-seller-wrapper__footer');
  const productCards = document.querySelectorAll('.best-seller-section .best-seller-wrapper__products-container .product-link');
  const swiperElements = document.querySelectorAll('.best-seller-section .swiper-element');
  const isVariantCActive = document.body.hasAttribute('data-bestseller-c');
  const isMobile = window.innerWidth <= 768;
  
  let swiper = initSwiperBestSeller();

  // show product images on mobile - variant c
  if ( isVariantCActive && isMobile ) {
    const imagesContainer = document.querySelectorAll('.best-seller-section .product-wrapper .images-container');

    imagesContainer.forEach(imageContainer => {
      let images = imageContainer.querySelectorAll('img');
      let nextImageIndex = 1;
      
      function showNextImage() {
        images[nextImageIndex == 1 ?  0 : 1].style.display = 'none';
        images[nextImageIndex].style.display = 'block';
        nextImageIndex = (nextImageIndex + 1) % images.length;
      }
      setInterval(showNextImage, 3000); 
    });
  }

  categoryButtons.forEach(categoryButton => {
    categoryButton.addEventListener('click', e => {
      let target = e.currentTarget;
      let { category } = target.dataset;
      
      // set active button
      categoryButtons.forEach(categoryButton => categoryButton.classList.remove('active'));
      target.classList.add('active');

      // show products according to active button
      productCards.forEach(productCard => {
        let { category:productCardCategory} = productCard.dataset;
        productCard.classList.remove('best-seller-hidden');
        if (category != productCardCategory) productCard.classList.add('best-seller-hidden');
      });

      // slider on desktop 
      if ( !isMobile ) { 
        if ( category !== "cat1" ) {
          swiper.destroy(); 
          swiperElements.forEach(swiperElement => {
            swiperElement.classList.add('best-seller-hidden');
          });
          productCardsContainer.classList.add('not-slider');
          bestSellerFooter.classList.add('not-slider');
        } else {
          initSwiperBestSeller();
          swiperElements.forEach(swiperElement => {
            swiperElement.classList.remove('best-seller-hidden');
          });
          productCardsContainer.classList.remove('not-slider');
          bestSellerFooter.classList.remove('not-slider');
        }  
      } else {
        // slider on mobile when switching between categoryButtons
        swiper.destroy();
        swiper = initSwiperBestSeller();
        swiper.update();
      }
    });
  });
}

window.addEventListener("ig:ready", () => { 
  if(document.body.hasAttribute('data-variantb-upsell-carousel') || document.body.hasAttribute('data-variantc-upsell-carousel')){
    initUpsellSwiper();
  }
});

document.addEventListener('DOMContentLoaded', function() {

  // Start PDP Social Proof Data
  const socialProofContainer = document.querySelector('.social-proof-data-container');
  const quantityElement = document.querySelector('.social-proof-data-container #quantity');
  const closeIcon = document.querySelector('.social-proof-data-container .close-icon');
  const containerAtcButton = document.querySelector('.nav_e-commerce .cart-custom');
  const containerAtcButtonProdFaceSerum = document.querySelectorAll('.button_sticky_wrapper');

  if ( socialProofContainer ) {
    let { productId, productHandle, productList } = socialProofContainer.dataset; 
    let url = `https://webhooks.endrock.software/endrockapi/v3/app/analytics/reportsGA4.php?filterBy=productId&store=qure&name=Qure: GA4&productId=`;
    
    // render products purchased quantity and show the social proof container 
    const renderQuantity = (quantity) => { 
      setTimeout(()=>{
        const chatIcon = document.querySelector('iframe#launcher');
        if ( chatIcon ) chatIcon.classList.add('new-bottom');
      },1000);
      

      quantityElement.innerText = quantity;
      if (containerAtcButton) containerAtcButton.setAttribute('style', "bottom: 44px !important"); 
      if (containerAtcButtonProdFaceSerum) containerAtcButtonProdFaceSerum.forEach(btn => btn.classList.add('new-bottom'));  
      
      socialProofContainer.classList.remove('hidden');
    

      closeIcon.addEventListener('click', function () {
        socialProofContainer.classList.add('hidden');
        if ( containerAtcButton ) containerAtcButton.setAttribute('style', "bottom: 25px !important"); 
        if ( document.querySelector('iframe#launcher') ) document.querySelector('iframe#launcher').classList.remove('new-bottom');  
      });

    }

    // handle requests for 1 product or some of them
    if ( productHandle && productList ) {
      let arrProductList = productList.split(', ');
      const requests = arrProductList.map(id => {
        return fetchData(url, id);
      });
      Promise.all(requests)
        .then(responses => {
          let sumPurchased = responses.reduce((acum,cur)=>{
            return acum + cur.data.itemsPurchased; 
          },0);
          if ( sumPurchased > 0) {
            renderQuantity(sumPurchased);
          }
        })
        .catch(error => console.log('error', error));
    } else if ( productId )  {
      fetchData(url, productId)
        .then(response => {
          if ( response.code == 200 ) {
            renderQuantity(response.data.itemsPurchased);
          }
        })
    }

    // fetch items purchased data
    function fetchData (url, id) {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      return fetch(url+id, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    }
  }

  // End PDP Social Proof Data

   // best-seller-section 
   initBestSellerSection();

  // Start Order by Receive by
  const showReceiveBy = window.showOrderBy;
  if (showReceiveBy) {
    userLocationIP();
  }

});



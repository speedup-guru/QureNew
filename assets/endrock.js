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


// swiper PDP: Before & After First Image 

const swiperBeforeAfter = (selector, paginationClass) => {
  const swiperInstance = new Swiper(`${selector}`, {
    slidesPerView: 1,
    pagination: {
      el: `${paginationClass}`,
      clickable: true,
    }
  });

  return swiperInstance;
}

swiperBeforeAfter('.swiper-products', '.swiper-pagination-products')
swiperBeforeAfter('.swiper-page-product', '.swiper-pagination-product-page')

const swiperResult = new Swiper('.swiper-info-result', {
    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination-real-result',
      clickable: true,
    }
  });

// end swiper PDP: Before & After First Image


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

  // Start Order by Receive by
  const showReceiveBy = window.showOrderBy;
  if (showReceiveBy) {
    userLocationIP();
  }

  //  PDP: Before & After First Image 

  const productComponent = document.getElementById('info-product');
  const resultComponent = document.getElementById('info-result');
  const dermaComponent = document.getElementById('info-derma');

  /**
   * Function to show a component and hide the others.
   * @param {HTMLElement} component The component to be shown.
   */
  function showComponent(component) {
    // Hide all components
    document.querySelectorAll('[id^="info-"]').forEach(component => {
      component.classList.remove('active');
    });
    // Show the specified component
    component.classList.add('active');
  }

  // Add event listeners to all elements with the class 'nav-button'
  document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', function() {
      // Get the ID of the clicked button
      const buttonId = this.id;
      // Remove the 'active' class from all navigation buttons
      document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
      });
      // Add the 'active' class to the clicked button
      this.classList.add('active');
      // Show the corresponding component based on the clicked button
      switch (buttonId) {
        case 'productButton':
          showComponent(productComponent);
          break;
        case 'resultButton':
          showComponent(resultComponent);
          break;
        case 'dermaButton':
          showComponent(dermaComponent);
          break;
      }
    });
  });
 
  // end PDP: Before & After First Image 

  // purchase landing page

  class PurchaseLandingPage {
    constructor(formId){
      this.form = document.getElementById(formId);
      this.panels = document.querySelectorAll('.landing-panel');
      this.btnBack = document.getElementById('landing-back');
      this.btnNext = document.getElementById('landing-next');
      this.indexPanel = 0;

      this.hidePanels();
      this.showActualPanel(this.indexPanel);
      this.updateButtons();
      this.updateVisibilityFirstStep();

      const radioButtons = document.querySelectorAll('#step2-select input[type="radio"]');
      radioButtons.forEach(button => {
        button.addEventListener('change', () => {
          this.updateVisibilityFirstStep();
        });
      });

      // buttons
      this.btnNext.addEventListener('click', () =>{
        this.nextPanel();
      });

      this.btnBack.addEventListener('click', () =>{
        this.backPanel();
      });
    }

      // functions
      hidePanels() {
        this.panels.forEach(panel =>{
          panel.classList.add('panel-hidden');
        });
      }

      showActualPanel(index) {
        this.panels[index].classList.remove('panel-hidden');
      }

      hidePanel(index) {
        this.panels[index].classList.add('panel-hidden');
      }


      nextPanel(){
        this.hidePanel(this.indexPanel);
        this.indexPanel++;
        if(this.indexPanel >= this.panels.length){
          this.indexPanel = 0;
        }
        this.showActualPanel(this.indexPanel);
        this.updateButtons();
      }

      backPanel(){
        this.hidePanel(this.indexPanel);
        this.indexPanel--;
        if(this.indexPanel < 0){
          this.indexPanel = this.panels.length - 1;
        }
        this.showActualPanel(this.indexPanel);
        this.updateButtons();
      }

      updateButtons(){
        if(this.indexPanel === 0){
          this.btnBack.classList.add('hidden');
        }else{
          this.btnBack.classList.remove('hidden');
        }

        if(this.indexPanel === this.panels.length - 1){
          this.btnNext.classList.add('hidden');
        } else {
          this.btnNext.classList.remove('hidden');
        }
      }

      updateVisibilityFirstStep(){
        const secondRadioButtons = document.querySelector('#step2-select input[name="step2"]:checked');
        const selectOption = secondRadioButtons.value;
        console.log('selected 2', selectOption);

        const allInputs = document.querySelectorAll('.inputs-mix, .inputs-silver, .inputs-gold');
        allInputs.forEach(input => {
          input.classList.remove('show-inputs');
        });
        const selectedInputs = document.querySelector(`#inputs-${selectOption}`);
        selectedInputs.classList.add('show-inputs');
       

      }

        
  }

  const purchaseLandingPage = new PurchaseLandingPage('main-panel-lading');

  // end purchase landing page

});



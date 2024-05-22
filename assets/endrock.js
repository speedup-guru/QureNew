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

/**
 * Verifies if the customer has visited the website before.
 * If the customer has not visited before, a cookie is set.
 * If the customer has visited before, a CSS class is removed from an element.
 */
const verifyCustomer = () => {
  const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("newCustomer="))
  ?.split("=")[1];

  if (!cookieValue) {
    document.cookie = "newCustomer=true; max-age=2592000; path=/";
  } else {
    const crossSell = document.querySelectorAll('.cross-sell');

    crossSell.forEach((element) => {
      element.classList.remove('hidden');
    });
  }
  
}


/* ATC NO PRICES PDP */
const atcNoPricesPdp = () => {

  const subscriptionTypes = document.querySelectorAll('.subscriptionType');
  if (subscriptionTypes) {
    subscriptionTypes.forEach((element) => {
      element.addEventListener('click', function(e) {
        const subscriptionType = e.currentTarget.getAttribute('data-subscription');
        const subscriptionPrices = document.querySelectorAll('.subscriptions-prices');
        
        subscriptionPrices.forEach((element) => { element.classList.add('hidden'); });
        document.getElementById(`${subscriptionType}`).classList.remove('hidden');
      });
    });
  }
}


document.addEventListener('DOMContentLoaded', function() {
  /* ATC NO PRICE TEST PDP */
  atcNoPricesPdp();

  // Start Cross-sell page targeting validation
  const pageTargeting = [
    "/products/q-rejuvalight-pro-facewear",
    "/pages/microinfusion",
    "/products/neck-decolletage-led",
    "/products/micro-infusion-targeted-patches",
    "/products/face-serum",
    "/pages/micro-infusion-refill",
    "/products/q-rify-replacement-water-filter",
    "/products/q-urify-water-filter"
  ]

  const currentPath = window.location.pathname;

  if(pageTargeting.includes(currentPath)){
    verifyCustomer();
  }

  // Start PDP Social Proof Data
  const socialProofContainer = document.querySelector('.social-proof-data-container');
  const quantityElement = document.querySelector('.social-proof-data-container #quantity');
  const closeIcon = document.querySelector('.social-proof-data-container .close-icon');
  const containerAtcButton = document.querySelector('.nav_e-commerce .cart-custom');
  const containerAtcButtonProdFaceSerum = document.querySelectorAll('.button_sticky_wrapper');

  if (socialProofContainer) {
    let { productId, productHandle, productList } = socialProofContainer.dataset;
    let url = `https://webhooks.endrock.software/endrockapi/v3/app/analytics/reportsGA4.php?filterBy=productId&store=qure&name=Qure: GA4&productId=`;

    // render products purchased quantity and show the social proof container 
    const renderQuantity = (quantity) => {
      setTimeout(() => {
        const chatIcon = document.querySelector('iframe#launcher');
        if (chatIcon) chatIcon.classList.add('new-bottom');
      }, 1000);


      quantityElement.innerText = quantity;
      if (containerAtcButton) containerAtcButton.setAttribute('style', "bottom: 44px !important");
      if (containerAtcButtonProdFaceSerum) containerAtcButtonProdFaceSerum.forEach(btn => btn.classList.add('new-bottom'));

      socialProofContainer.classList.remove('hidden');


      closeIcon.addEventListener('click', function () {
        socialProofContainer.classList.add('hidden');
        if (containerAtcButton) containerAtcButton.setAttribute('style', "bottom: 25px !important");
        if (document.querySelector('iframe#launcher')) document.querySelector('iframe#launcher').classList.remove('new-bottom');
      });

    }

    // handle requests for 1 product or some of them
    if (productHandle && productList) {
      let arrProductList = productList.split(', ');
      const requests = arrProductList.map(id => {
        return fetchData(url, id);
      });
      Promise.all(requests)
        .then(responses => {
          let sumPurchased = responses.reduce((acum, cur) => {
            return acum + cur.data.itemsPurchased;
          }, 0);
          if (sumPurchased > 0) {
            renderQuantity(sumPurchased);
          }
        })
        .catch(error => console.log('error', error));
    } else if (productId) {
      fetchData(url, productId)
        .then(response => {
          if (response.code == 200) {
            renderQuantity(response.data.itemsPurchased);
          }
        })
    }

    // fetch items purchased data
    function fetchData(url, id) {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      return fetch(url + id, requestOptions)
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
    button.addEventListener('click', function () {
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
    constructor(formId) {
      this.form = document.getElementById(formId);
      this.panels = document.querySelectorAll('.landing-panel');
      this.btnBack = document.getElementById('landing-back');
      this.btnNext = document.getElementById('landing-next');
      this.bntTest = document.getElementById('landing-test');
      this.btnSubmitPanel = document.getElementById('landing-submit');
      this.btnSumbitText = document.getElementById('landing-submit-text');
      this.breadCrumbsItems = document.querySelectorAll('.landing-breadcrumbs-item');
      this.breadCrumbsButtons = document.querySelectorAll('.landing-breadcrumbs-item__btn');
      this.mobileCardContainer = document.getElementById('landing-purchase-mobile');
      this.selectedInputValue = null;
      this.selectedInputValueJson = null;
      this.selectedInputValueStep4 = null;
      this.selectedInputValueJsonStep4 = null;
      this.selectedInputStep2Title = null;
      this.selectedInputStep3Title = null;
      this.indexPanel = 0;

      this.hidePanels();
      this.showActualPanel(this.indexPanel);
      this.updateVisibilityFirstStep();
      this.updateSelectedInputValueJson();
      this.renderElementsStep3();
      this.updateSelectedInputValueStep4();
      this.updateSelectedInputValueJsonStep4();
      this.updateVisibilityAndValueFourthStep();
      this.updateButtons();
      this.updateVisibilityBreadcrumb();
      this.renderElementMobileStep1();
      this.updateSubmitTextBtn();
      this.fillBreadCrumbs();

      // assing
      const firstStep2RadioButton = document.querySelector('#step2-select input[type="radio"]:checked');
      if (firstStep2RadioButton) {
        this.selectedInputStep2Title = firstStep2RadioButton.dataset.title;
      }

      const radioButtonsStep2 = document.querySelectorAll('#step2-select input[type="radio"]');
      radioButtonsStep2.forEach(button => {
        button.addEventListener('change', () => {
          const title = button.dataset.title;
          this.selectedInputStep2Title = title;
          this.updateVisibilityFirstStep();
          this.updateSelectedInputValueJson();
          this.updateSelectedInputValueStep4()
          this.updateSelectedInputValueJsonStep4();
          this.updateVisibilityAndValueFourthStep();
          this.renderElementsStep3();
          this.renderElementMobileStep1();
          this.updateSubmitTextBtn();
        });
      });

      const radioButtonsStep1 = document.querySelectorAll('.inputs-products1 input[type="radio"], .inputs-products2 input[type="radio"], .inputs-products3 input[type="radio"]');
      radioButtonsStep1.forEach(button => {
        button.addEventListener('change', () => {
          this.syncRadioButtons(button.dataset.identifier);
          this.updateSelectedInputValue();
          this.renderElementsStep3();
          this.updateSelectedInputValueJson();
          this.updateVisibilityBreadcrumb();
          this.fillBreadCrumbs();
          this.renderElementMobileStep1();
          this.updateSubmitTextBtn();
        });
      });

      const firstStrep3RadioButton = document.querySelector('#inputs-landing-step3 input[type="radio"]:checked');

      if (firstStrep3RadioButton) {
        this.selectedInputStep3Title = firstStrep3RadioButton.value;
      }

      const radioButtonsStep3 = document.querySelectorAll('#inputs-landing-step3 input[type="radio"]');
      radioButtonsStep3.forEach(button => {
        button.addEventListener('change', () => {
          this.selectedInputStep3Title = button.value;
        });
      });

      const radioButtonsStep4 = document.querySelectorAll('.inputs-products4 input[type="radio"], .inputs-products5 input[type="radio"], .inputs-products6 input[type="radio"]');
      radioButtonsStep4.forEach(button => {
        button.addEventListener('change', () => {
          this.syncRadioButtonsStep4(button.dataset.identifier);
          this.updateSelectedInputValueStep4();
          this.updateSelectedInputValueJsonStep4();
          this.updateVisibilityAndValueFourthStep();
        });
      });

      // buttons
      this.btnNext.addEventListener('click', () => {
        this.nextPanel();
        this.fillBreadCrumbs();
        this.updateBreadcrumbContent('addText');
      });

      this.btnBack.addEventListener('click', () => {
        this.backPanel();
        this.fillBreadCrumbs();
        this.updateBreadcrumbContent('removeText');
      });

      this.breadCrumbsButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          this.showPanelBread(index);
          this.updateBreadcrumbContent('removeText');
        });
      });

      this.btnSubmitPanel.addEventListener('click', () => {
        this.updateAnchorValue();
      });

    }

    // functions
    hidePanels() {
      this.panels.forEach(panel => {
        panel.classList.add('panel-hidden');
      });
    }

    showActualPanel(index) {
      this.panels[index].classList.remove('panel-hidden');
    }

    hidePanel(index) {
      this.panels[index].classList.add('panel-hidden');
    }

    nextPanel() {
      if (this.indexPanel < this.panels.length - 1) {
        this.breadCrumbsItems[this.indexPanel].classList.remove('active-breadcrumb');

        this.hidePanel(this.indexPanel);
        this.indexPanel++;
        this.showActualPanel(this.indexPanel);
        this.updateButtons();
        this.breadCrumbsButtons[this.indexPanel].removeAttribute('disabled');
        this.breadCrumbsItems[this.indexPanel].classList.add('active-breadcrumb');
      }
    }

    showPanelBread(index) {
      if (index >= 0 && index < this.panels.length) {
        this.breadCrumbsItems[this.indexPanel].classList.remove('active-breadcrumb');
        this.hidePanels();
        this.showActualPanel(index);
        this.breadCrumbsButtons.forEach((button, i) => {
          if (i > index) {
            button.setAttribute('disabled', 'disabled');
          } else {
            button.removeAttribute('disabled');
          }
        })
        this.breadCrumbsItems[index].classList.add('active-breadcrumb');
        this.fillBreadCrumbs();
        this.indexPanel = index;
        this.updateButtons();
      }
    }

    updateButtons() {
      if (this.indexPanel === 0) {
        this.btnBack.classList.add('hidden');
      } else {
        this.btnBack.classList.remove('hidden');
      }

      if (this.selectedInputValueJson.position === 1) {
        if (this.indexPanel === this.panels.length - 1) {
          this.btnNext.classList.add('hidden');
          this.btnSubmitPanel.classList.add('show-lading-button')
        } else {
          this.btnNext.classList.remove('hidden');
          this.btnSubmitPanel.classList.remove('show-lading-button')
        }
      } else if (this.selectedInputValueJson.position !== 1) {
        if (this.indexPanel === this.panels.length - 2) {
          this.btnNext.classList.add('hidden');
          this.btnSubmitPanel.classList.add('show-lading-button')
        } else {
          this.btnNext.classList.remove('hidden');
          this.btnSubmitPanel.classList.remove('show-lading-button')
        }
      }
    }

    backPanel() {
      this.breadCrumbsItems[this.indexPanel].classList.remove('active-breadcrumb');

      this.breadCrumbsButtons[this.indexPanel].setAttribute('disabled', 'disabled');
      this.hidePanel(this.indexPanel);
      this.indexPanel--;
      if (this.indexPanel < 0) {
        this.indexPanel = this.panels.length - 1;
      }
      this.showActualPanel(this.indexPanel);
      this.updateButtons();
      this.breadCrumbsItems[this.indexPanel].classList.add('active-breadcrumb');
    }

    syncRadioButtons(value) {
      const allInputs = document.querySelectorAll('.inputs-products1 input[type="radio"], .inputs-products2 input[type="radio"], .inputs-products3 input[type="radio"]');
      allInputs.forEach(input => {
        if (input.dataset.identifier === value) {
          input.checked = true;
        }
      });
    }

    syncRadioButtonsStep4(value) {
      const allInputsStep4 = document.querySelectorAll('.inputs-products4 input[type="radio"], .inputs-products5 input[type="radio"], .inputs-products6 input[type="radio"]');
      allInputsStep4.forEach(input => {
        if (input.dataset.identifier === value) {
          input.checked = true;
        }
      });
    }


    updateSelectedInputValueJson() {
      if (this.selectedInputValue) {
        try {
          this.selectedInputValueJson = JSON.parse(this.selectedInputValue);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          this.selectedInputValueJson = null;
        }
      } else {
        this.selectedInputValueJson = null;
      }
    }

    updateSelectedInputValueJsonStep4() {
      if (this.selectedInputValueStep4) {
        try {
          this.selectedInputValueJsonStep4 = JSON.parse(this.selectedInputValueStep4);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          this.selectedInputValueJsonStep4 = null;
        }
      }
    }

    updateSelectedInputValue() {
      const selectedRadioButton = document.querySelector('.inputs-products1 input[type="radio"]:checked, .inputs-products2 input[type="radio"]:checked, .inputs-products3 input[type="radio"]:checked');
      this.selectedInputValue = selectedRadioButton ? selectedRadioButton.value : null;
      this.updateSelectedInputValueJson();
    }

    updateSelectedInputValueStep4() {
      const selectedRadioButtonStep4 = document.querySelector('.inputs-products4 input[type="radio"]:checked, .inputs-products5 input[type="radio"]:checked, .inputs-products6 input[type="radio"]:checked');
      this.selectedInputValueStep4 = selectedRadioButtonStep4 ? selectedRadioButtonStep4.value : null;
    }



    updateVisibilityFirstStep() {
      const secondRadioButtons = document.querySelector('#step2-select input[name="step2"]:checked');
      const selectOption = secondRadioButtons.value;

      const allInputs = document.querySelectorAll('.inputs-products1, .inputs-products2, .inputs-products3');
      allInputs.forEach(input => {
        input.classList.remove('show-inputs');
      });
      const selectedInputs = document.querySelector(`#inputs-${selectOption}`);
      selectedInputs.classList.add('show-inputs');

      const selectedRadioButton = selectedInputs.querySelector('input[type="radio"]:checked');
      this.selectedInputValue = selectedRadioButton ? selectedRadioButton.value : null;
      this.updateSelectedInputValueJson();
    }

    updateVisibilityAndValueFourthStep() {
      const secondRadioButtons = document.querySelector('#step2-select input[name="step2"]:checked');
      const selectOption = secondRadioButtons ? secondRadioButtons.dataset.step4Product : null;

      const allStep4Inputs = document.querySelectorAll('.inputs-products4, .inputs-products5, .inputs-products6');
      allStep4Inputs.forEach(input => {
        input.classList.remove('show-inputs');
      });

      const selectedInputsStep4 = document.querySelector(`#inputs-${selectOption}`);
      selectedInputsStep4.classList.add('show-inputs');

      const selectedRadioButtonStep4 = selectedInputsStep4.querySelector('input[type="radio"]:checked');
      this.selectedInputValueStep4 = selectedRadioButtonStep4 ? selectedRadioButtonStep4.value : null;
      this.updateSelectedInputValueJsonStep4();

    }

    renderElementsStep3() {
      const step3PriceNormal = document.getElementById('step3-price-normal');
      const step3PriceQuota = document.getElementById('step3-price-quota');

      if (step3PriceNormal && step3PriceQuota) {
        if (Number(this.selectedInputValueJson.price) == 0) {
          step3PriceNormal.innerHTML = `
            <span class='step3-card-price-discount'>${this.selectedInputValueJson.discountPrice}</span>
          `;
        } else {
          step3PriceNormal.innerHTML = `
            <span class='step3-card-price-full'>${this.selectedInputValueJson.price}</span>
            <span class='step3-card-price-discount'>${this.selectedInputValueJson.discountPrice}</span>
          `;
        }
        step3PriceQuota.innerHTML =`
        <span class='step3-card-price-quota'>
          ${this.selectedInputValueJson.discountPriceQuota}
        </span>
        `;
      }
    }
    
    updateVisibilityBreadcrumb() {
      const breadCrumbWrapper = document.querySelector('.landing-breadcrumbs-wrapper');
      const breadCrumb4 = document.querySelector('.breadStep-4');
      const breadCrumb3 = document.querySelector('.breadStep-3');
      if (this.selectedInputValueJson.position !== 1) {
        breadCrumbWrapper.setAttribute('data-hide-breadcrumb4', 'true')
        breadCrumb4.classList.add('hide-breadcrumbs');
        breadCrumb3.classList.add('breadcrumb-arrow-shape-end-cricle')
      } else {
        breadCrumbWrapper.removeAttribute('data-hide-breadcrumb4');
        breadCrumb4.classList.remove('hide-breadcrumbs');
        breadCrumb3.classList.remove('breadcrumb-arrow-shape-end-cricle')
      }
    }

    fillBreadCrumbs() {
      const activeBreadcrumbIndex = Array.from(document.querySelectorAll('.landing-breadcrumbs-item')).findIndex(item => item.classList.contains('active-breadcrumb'));
    
      const breadCrumbWrapper = document.querySelector('.landing-breadcrumbs-wrapper');
      const hideBreadcrumb4 = breadCrumbWrapper.getAttribute('data-hide-breadcrumb4') === 'true';
    
      const breadCrumbs = document.querySelectorAll('.landing-breadcrumbs-item');
      breadCrumbs.forEach((breadCrumb, index) => {
        breadCrumb.classList.remove('active-start-circle', 'active-arrow', 'active-end-circle');
    
        if (index === activeBreadcrumbIndex) {
          if (index === 0) {
            breadCrumb.classList.add('active-start-circle');
          } else if (index === breadCrumbs.length - 1 && !hideBreadcrumb4) {
            breadCrumb.classList.add('active-end-circle');
          } else if (index === breadCrumbs.length - 2 && hideBreadcrumb4) {
            breadCrumb.classList.add('active-end-circle');
          } else {
            breadCrumb.classList.add('active-arrow');
          }
        }
    
        if (index === breadCrumbs.length - 1 && hideBreadcrumb4) {
          breadCrumb.classList.add('hide-breadcrumbs');
        } else {
          breadCrumb.classList.remove('hide-breadcrumbs');
        }
      });
    }

   

    updateBreadcrumbContent(action) {
      const breadcrumbItems = document.querySelectorAll('.landing-breadcrumbs-item');
      switch (action) {
        case 'addText':
          breadcrumbItems.forEach((item, index) => {
            const button = item.querySelector('.landing-breadcrumbs-item__btn');
            const buttonTextSelect = button.querySelector('.landing-breadcrumbs-item__text--select' + (index + 1));
            if (!item.classList.contains('active-breadcrumb') && !button.hasAttribute('disabled')) {
              if (index === 0) {
                buttonTextSelect.textContent = `${this.selectedInputValueJson.titleBundle}`;
                buttonTextSelect.setAttribute('data-bc-title', 'true');
                buttonTextSelect.previousElementSibling.classList.add('no-show-text-mobile');
                buttonTextSelect.parentNode.parentNode.classList.add('breadcrumb-was-active');
              } else if (index === 1) {
                buttonTextSelect.textContent = `${this.selectedInputStep2Title}`;
                buttonTextSelect.setAttribute('data-bc-title', 'true');
                buttonTextSelect.previousElementSibling.classList.add('no-show-text-mobile');
                buttonTextSelect.parentNode.parentNode.classList.add('breadcrumb-was-active');
              } else if (index === 2) {
                buttonTextSelect.textContent = `${this.selectedInputStep3Title}`;
                buttonTextSelect.setAttribute('data-bc-title', 'true');
                buttonTextSelect.previousElementSibling.classList.add('no-show-text-mobile');
                buttonTextSelect.parentNode.parentNode.classList.add('breadcrumb-was-active');
              }
            }
          });
          break;
        case 'removeText':
          breadcrumbItems.forEach((item, index) => {
            const button = item.querySelector('.landing-breadcrumbs-item__btn');
            const buttonTextSelect = button.querySelector('.landing-breadcrumbs-item__text--select' + (index + 1));
            if (button.hasAttribute('disabled')) {
              buttonTextSelect.textContent = "";
              buttonTextSelect.removeAttribute('data-bc-title');
              buttonTextSelect.previousElementSibling.classList.remove('no-show-text-mobile');
              buttonTextSelect.parentNode.parentNode.classList.remove('breadcrumb-was-active');
            }
            if (buttonTextSelect.getAttribute('data-bc-title') === 'true' && item.classList.contains('active-breadcrumb')) {
              buttonTextSelect.textContent = "";
              buttonTextSelect.removeAttribute('data-bc-title');
              buttonTextSelect.previousElementSibling.classList.remove('no-show-text-mobile');
              buttonTextSelect.parentNode.parentNode.classList.remove('breadcrumb-was-active');
            }
          });
          break;
      
        default:
          break;
      }
    }

    renderElementMobileStep1() {
      const elements = this.mobileCardContainer.querySelectorAll('[data-position][data-input]');
      elements.forEach(element =>{
        const positionElement = element.dataset.position;
        const inputElement = element.dataset.input;
        if(positionElement == this.selectedInputValueJson.position && inputElement == this.selectedInputValueJson.input){
          element.classList.add('show-inputs-important')
        } else{
          element.classList.remove('show-inputs-important')
        }
      })
    };

    updateSubmitTextBtn() {
      const oneProuduct = document.querySelector('.landing-button-submit-one')
      const bundleProduct = document.querySelector('.landing-button-submit-bundle')
    
      if (this.selectedInputValueJson.position !== 3) {
        bundleProduct.classList.add('show-lading-submit-btn');
        oneProuduct.classList.remove('show-lading-submit-btn');
      } else {
        bundleProduct.classList.remove('show-lading-submit-btn');
        oneProuduct.classList.add('show-lading-submit-btn');
      }

      this.btnSumbitText.innerHTML =
        `
          <span class="landing-submit-text__discount">${this.selectedInputValueJson.discountPercent} %</span>
        `;
    }

    updateAnchorValue() {

      const anchorID = document.getElementById('landing-add-sidecard');
      const productIdStep1 = this.selectedInputValueJson;
      const productIdStep4 = this.selectedInputValueJsonStep4;
      let currentHref = anchorID.getAttribute('href');

      const selectedProductId = (productIdStep1.position === 1 && productIdStep4.position === 1) 
      ? productIdStep4.id 
      : (productIdStep1.position === 1 && productIdStep4.position !== 1) 
        ? productIdStep1.id 
        : productIdStep1.id;


      const href = currentHref.split('add')[0]

      if (productIdStep1.position === 1) {
        if (productIdStep4.position === 1) {
          currentHref = `${href}add?id=${selectedProductId}&selling_plan=${productIdStep4.sellingPlanId}&quantity=1`
        } else {
          currentHref = `${href}add?id=${selectedProductId}&quantity=1`
        }
      } else {
        currentHref = `${href}add?id=${selectedProductId}&quantity=1`
      }

      anchorID.href = currentHref;
      setTimeout(() => {
        anchorID.click();
      }, 2200);
    }
  }

  const purchaseLandingPage = new PurchaseLandingPage('main-panel-lading');
  // end purchase landing page

  // works better outside of the class
  // dropsdown
  
  function setupDropdowns(containerSelector, buttonSelector, contentSelector) {
    const dropdownContainers = document.querySelectorAll(containerSelector);
    if (dropdownContainers) {
      dropdownContainers.forEach(function(container) {
        const dropdownButton = container.querySelector(buttonSelector);
        const dropdownContent = container.querySelector(contentSelector);
        const button = container.querySelector('.landing-rotate-svg-button');
  
        dropdownButton.addEventListener('click', function() {
          dropdownContent.classList.toggle('show-dropdown');
          button.classList.toggle('rotate-svg-btn');
        });
      });
    }
  }
  
  setupDropdowns('.step1-value-props-dropdown', '.step1-value-dropdown-title', '.step1-value-dropdown-information');
  setupDropdowns('.step1-mobile-value-props-dropdown', '.step1-mobile-value-dropdown-title', '.step1-mobile-value-dropdown-information');
  setupDropdowns('.step4-value-props-dropdown', '.step4-value-dropdown-title', '.step4-value-dropdown-content');

  // end dropdown

  initUpsellSwiper(); //swiper for carousel upsell

});

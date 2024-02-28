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

function getDeliveryRange(stateAcronym) {
  const stateFound = window.stateDeliveryRange.find(
    (state) => state.stateAcronym === stateAcronym
  );

  return stateFound ? stateFound.deliveryRange : null;
}

const deliveryDate = (location) => {
  const { countryCode, region } = location;

  const messageContainer = document.querySelector('.orderby-receiveby__shipping-text');
  const nationalMessage = window.nationalText.split('[]');

  console.log('countrycode', countryCode);
  console.log('region', region);

  if (countryCode != 'US') {
    messageContainer.innerText = window.internationalText
  } else {
    const foundNationalDate = getDeliveryRange(region);
    console.log('foundNationalDate', foundNationalDate);
    messageContainer.innerText = `${nationalMessage[0]} ${foundNationalDate} ${nationalMessage[1]}`
  }
  document.querySelector('.orderby-receiveby').classList.remove('hidden');
  
}

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
  //userLocationIP();
});



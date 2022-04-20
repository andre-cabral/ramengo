const options = {
  broth: ['salt', 'shoyu', 'miso'],
  meat: ['chasu', 'yasai_vegetarian', 'karaague'],
}

const errorMessages = {
  missingOptionTexts: {
    broth: 'Please select your broth option',
    meat: 'Please select your meat option'
  },
  request: 'An error has occurred. Please try again.'
}

let optionsSelected = {
  broth: '',
  meat: '',
}

const addClickToId = (elementid, clickFunction) => {
  const element = document.getElementById(elementid);
  element.addEventListener('click', () => {clickFunction(element)});
}

const addClickToClass = (elementClass, clickFunction) => {
  document.querySelectorAll(`.${elementClass}`).forEach((element) => {
      element.addEventListener('click', () => {clickFunction(element)});
  });
}

const selectItem = (chosenElement, optionType, activeClass) => {
  document.querySelectorAll(`.${optionType}`).forEach((element) => {
    element.classList.remove(`${activeClass}--active`);
  });
  chosenElement.classList.add(`${activeClass}--active`);

  optionsSelected[optionType] = chosenElement.id;
}

const inactivateAllItems = (optionType, activeClass) => {
  document.querySelectorAll(`.${optionType}`).forEach((element) => {
    element.classList.remove(`${activeClass}--active`);
  });

  optionsSelected[optionType] = '';
}

const missingOption = (optionType) => {
  console.log(optionType)
  //errorMessages.missingOptionTexts[optionType];
}

const checkSelectedOptions = () => {
  if(options.broth.indexOf(optionsSelected.broth) == -1) {
    missingOption('broth');
    return false;
  }
  if(options.meat.indexOf(optionsSelected.meat) == -1) {
    missingOption('meat');
    return false;
  }

  return true;
}

const selectOption = (element, optionType) => {
  selectItem(element, optionType, 'card');
}

const selectBroth = (element) => {
  if(options.broth.indexOf(element.id) > -1) {
    selectOption(element, 'broth');
  }
}

const selectMeat = (element) => {
  if(options.meat.indexOf(element.id) > -1) {
    selectOption(element, 'meat');
  }
}

const setLoadingButton = (loading, button, value) => {
  if(value){
    loading.classList.add('loading--active');
    button.classList.add('button--loading');
  } else {
    loading.classList.remove('loading--active');
    button.classList.remove('button--loading');
  }
}

const clearDoneScreen = () => {
  const resultImageElement = document.getElementById('result__image');
  const resultTextElement = document.getElementById('result__text');

  resultImageElement.style.backgroundImage = 'none';
  resultTextElement.innerHTML = 'data.name';
}

const goToDoneScreen = (data) => {
  const orderWrapper = document.getElementById('order-wrapper');
  const doneWrapper = document.getElementById('done-wrapper');

  orderWrapper.classList.remove('wrapper--active');
  doneWrapper.classList.add('wrapper--active');


  const resultImageElement = document.getElementById('result__image');
  const resultTextElement = document.getElementById('result__text');

  resultImageElement.style.backgroundImage = `url(${data.image})`;
  resultTextElement.innerHTML = data.name;

  window.scrollTo(0, 0);
}

const goToOrderScreen = (data) => {
  const orderWrapper = document.getElementById('order-wrapper');
  const doneWrapper = document.getElementById('done-wrapper');

  doneWrapper.classList.remove('wrapper--active');
  orderWrapper.classList.add('wrapper--active');

  window.scrollTo(0, 0);
}

const orderButtonClicked = (element) => {
  if(checkSelectedOptions()) {
    const loadingOrderElement = document.getElementById('order--loading');
    const loadingOrderButton = document.getElementById('order');
    setLoadingButton(loadingOrderElement, loadingOrderButton, true);

    fetch(`https://front-br-challenges.web.app/api/v1/ramen-go/?meat=${optionsSelected.meat}&broth=${optionsSelected.broth}`)
    .then(response => {
      if (!response.ok) {
        setLoadingButton(loadingOrderElement, loadingOrderButton, false);
        throw new Error(errorMessages.request);
      }

      return response.json();
    })
    .then(json => {
      setLoadingButton(loadingOrderElement, loadingOrderButton, false);
      goToDoneScreen(json.data);
    })
    .catch(error => {
      setLoadingButton(loadingOrderElement, loadingOrderButton, false);
      console.error(errorMessages.request, error);
    });

  }
}

const newOrderButtonClicked = (element) => {
  inactivateAllItems('broth', 'card');
  inactivateAllItems('meat', 'card');
  clearDoneScreen();
  goToOrderScreen();
}

const init = () => {
  addClickToClass('broth', selectBroth);
  addClickToClass('meat', selectMeat);
  addClickToId('order', orderButtonClicked);
  addClickToId('new-order', newOrderButtonClicked);
}

init();
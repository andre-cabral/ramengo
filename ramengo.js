const options = {
  broth: ['salt', 'shoyu', 'miso'],
  meat: ['chasu', 'yasai_vegetarian', 'karaague'],
}

const missingOptionTexts = {
  broth: 'Please select your broth option',
  meat: 'Please select your meat option'
}

let optionsSelected = {
  broth: '',
  meat: '',
}

const addClick = (elementClass, clickFunction) => {
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
  //missingOptionTexts[optionType];
}

const checkSelectedOptions = () => {
  if(options.broth.indexOf(optionsSelected.broth) > -1) {

  }
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

const init = () => {
  addClick('broth', selectBroth);
  addClick('meat', selectMeat);
}

init();
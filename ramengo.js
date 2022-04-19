const options = {
  broth: [salt | shoyu | miso],
  meat: [chasu | yasai_vegetarian | karaague],
}

const selectItem = (chosenElement, typeClass) => {
  document.querySelectorAll(`.${typeClass}`).forEach((element) => {
    element.classList.remove(`${typeClass}--active`);
  });
  chosenElement.classList.add(`${typeClass}--active`);
}
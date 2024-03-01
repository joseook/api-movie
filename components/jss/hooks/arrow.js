const gender = document.getElementById('gender');
const arrowDown = document.getElementById('arrow-down');
const arrowLeft = document.getElementById('arrow-left');

gender.addEventListener('mouseover', () => {
  arrowDown.classList.remove('hidden');
  arrowLeft.classList.add('hidden');
});

gender.addEventListener('mouseout', () => {
  arrowDown.classList.add('hidden');
  arrowLeft.classList.remove('hidden');
});
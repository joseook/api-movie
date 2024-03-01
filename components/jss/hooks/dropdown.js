let isDropdownVisible = false;
  
function showDropdown() {
  const dropdownContent = document.getElementById('dropdownContent');
  dropdownContent.style.display = 'block';
  isDropdownVisible = true;
}

function hideDropdown() {
  const dropdownContent = document.getElementById('dropdownContent');
  dropdownContent.style.display = 'none';
  isDropdownVisible = false;
}

function toggleDropdown() {
  const dropdownContent = document.getElementById('dropdownContent');
  if (isDropdownVisible) {
    dropdownContent.style.display = 'none';
    isDropdownVisible = false;
  } else {
    dropdownContent.style.display = 'block';
    isDropdownVisible = true;
  }
}
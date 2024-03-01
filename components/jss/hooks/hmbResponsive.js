document.addEventListener("DOMContentLoaded", () => {
    function menuShow() {
        let menuM = document.querySelector('.menu-mobile');
        let menuToggle = document.getElementById('menu-toggle');
    
        if (menuM.classList.contains('open')) {
            menuM.classList.remove('open');
            menuToggle.innerHTML = '<i class="bi bi-list text-black text-3xl"></i>'; 
            menuM.classList.add('hidden');
        } else {
            menuM.classList.add('open');
            menuToggle.innerHTML = '<i class="bi bi-x text-black text-3xl"></i>'; 
            menuM.classList.remove('hidden');
        }
    }
    
    document.getElementById('menu-toggle').addEventListener('click', menuShow);

})

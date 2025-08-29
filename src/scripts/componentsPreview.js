const button = document.getElementById('hoverButton');
const target = document.getElementById('targetHover');

const headers = document.getElementById('headers');
const frames = document.getElementById('frames');
const buttons = document.getElementById('buttons');
const footers = document.getElementById('footers');

let Index = 0;
const Interval = 5000; 

setInterval(() => {

   Index = (Index + 1) % 3;
    
   headers.style.transform = `translateX(-${100 * Index}%)`;  
   frames.style.transform = `translateY(${100 * Index}%)`;      
   buttons.style.transform = `translateY(-${100 * Index}%)`;
   footers.style.transform = `translateX(+${100 * Index}%)`;
   
}, Interval);



  button.addEventListener('mouseenter', () => {
    target.classList.remove('bg-quaternary/70');
  });

  button.addEventListener('mouseleave', () => {
    target.classList.add('bg-quaternary/70');
  });
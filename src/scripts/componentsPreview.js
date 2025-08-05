  const button = document.getElementById('hoverButton');
  const target = document.getElementById('targetHover');

const headers = document.getElementById('headers');
const buttons = document.getElementById('buttons');
const footers = document.getElementById('footers')

let Index = 0;
const Interval = 5000; 

setInterval(() => {

    Index = Index >= 3 ? 1 : Index+1;
    
    if (Index < 3) {
       headers.style.transform = `translateX(-${100 * Index}%)`;        
       buttons.style.transform = `translateY(-${100 * Index}%)`;
       footers.style.transform = `translateX(+${100 * Index}%)`;
    }
    else{
       headers.style.transform = `translateX(0%)`;
       buttons.style.transform = `translateY(0%)`;
       footers.style.transform = `translateX(0%)`;
    };
}, Interval);



  button.addEventListener('mouseenter', () => {
    target.classList.remove('bg-quaternary/70');
  });

  button.addEventListener('mouseleave', () => {
    target.classList.add('bg-quaternary/70');
  });
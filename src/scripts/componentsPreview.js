  const button = document.getElementById('hoverButton');
  const target = document.getElementById('targetHover');

const headerOne = document.getElementById('header-one');
const headerTwo = document.getElementById('header-two');
const headerThree = document.getElementById('header-three');
const headers = [headerOne, headerTwo, headerThree];

const footerOne = document.getElementById('footer-one');
const footerTwo = document.getElementById('footer-two');
const footerThree = document.getElementById('footer-three');
const footers = [footerOne, footerTwo, footerThree];

let headerIndex = 0;
const headerInterval = 5000; 

setInterval(() => {
    headerIndex = headerIndex >= headers.length ? 1 : headerIndex+1;
    
    if (headerIndex < headers.length) {
         headers[headerIndex-1].classList.add('-translate-x-full');
         headers[headerIndex].classList.remove('translate-x-full');

         footers[headerIndex-1].classList.add('translate-x-full');
         footers[headerIndex].classList.remove('-translate-x-full');
    }
    else{
      headers.forEach((header, index) => {
      const footer = footers[index]; 

      if (index !== 0) {
        header.classList.add('translate-x-full');
        footer.classList.add('-translate-x-full');
      }

    header.classList.remove('-translate-x-full');
    footer.classList.remove('translate-x-full');
    });
  }
}, headerInterval);



  button.addEventListener('mouseenter', () => {
    target.classList.remove('bg-quaternary/70');
  });

  button.addEventListener('mouseleave', () => {
    target.classList.add('bg-quaternary/70');
  });
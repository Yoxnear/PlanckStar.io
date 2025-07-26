const headerOne = document.getElementById('header-one');
const headerTwo = document.getElementById('header-two');
const headerThree = document.getElementById('header-three');
const headers = [headerOne, headerTwo, headerThree];

let headerIndex = 0;
const headerInterval = 5000; 

setInterval(() => {
    headerIndex = headerIndex >= headers.length ? 1 : headerIndex+1;
    
    if (headerIndex < headers.length) {
         headers[headerIndex-1].classList.add('-translate-x-full');
         headers[headerIndex].classList.remove('translate-x-full');
    }
    else{
        headers.forEach((header, index) => {
          if (index !== 0) {
            header.classList.add('translate-x-full');

          }
        header.classList.remove('-translate-x-full');

        });
    }
}, headerInterval);



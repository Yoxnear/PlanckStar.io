

  const wordList = document.getElementById("wordList");
  let index = 0;
  const interval = 2000;
  const step = 5.5;

  setInterval(() => {
    index = (index + 1) % 3;
    if (wordList) {
      wordList.style.transform = `translateY(-${index * step}rem)`;
    }
  }, interval);
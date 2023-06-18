var mudar_ft_per = document.getElementById('butt-img');

function selectarq() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  fileInput.addEventListener('change', (event) => {
    const files = event.target.files[0];
    readArq(files);
  });

  fileInput.click();
}

function readArq(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;
    mudar_ft_per.src = content;
  };
  reader.readAsDataURL(file);
}

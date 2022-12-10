function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;
  const count = document.querySelector('#count').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size, count);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();
    const res = await fetch('/openai/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, size })
    });

    if (!res.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await res.json();

    const imageUrl = data.data;
    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (err) {
    document.querySelector('.msg').textContent = err;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);

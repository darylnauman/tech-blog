const postFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('#post-title').value.trim();
  const postContent = document.querySelector('#post-content').value.trim();


  if (postTitle && postContent) {
    
    console.log('sending POST request to the API endpoint to create a blog post');
    console.log(postTitle);
    console.log(postContent);

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ postTitle, postContent }), //req.body.postTitle, req.body.postContent
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);
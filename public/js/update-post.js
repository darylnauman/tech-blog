const updateFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('#post-title').value.trim();
  const postContent = document.querySelector('#post-content').value.trim();

  if (postTitle && postContent) {
    
    console.log('sending PUT request to the API endpoint to update a blog post');
    console.log(postTitle);
    console.log(postContent);

    const response = await fetch('/api/posts', {
      method: 'PUT',
      body: JSON.stringify({ postTitle, postContent }), //req.body.postTitle, req.body.postContent
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.update-form')
  .addEventListener('submit', updateFormHandler);
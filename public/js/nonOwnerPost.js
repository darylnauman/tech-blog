const commentFormHandler = async (event) => {
  event.preventDefault();

  console.log('button clicked to add comment');

  const content = document.querySelector('#commentInput').value.trim();
  const post_id = document.querySelector('#post_id').dataset.id;

  console.log(content);
  console.log(post_id);

  if (content) {
    
    console.log('sending POST request to the API endpoint to create a comment');

    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content, post_id }), //req.body.content
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".new-comment-form")
  .addEventListener('submit', commentFormHandler);
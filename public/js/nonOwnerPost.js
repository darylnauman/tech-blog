const commentFormHandler = async (event) => {
  event.preventDefault();

  console.log('button clicked to add comment');

  const content = document.querySelector('#commentInput').value.trim();
  const post_id = document.querySelector('#post_id').dataset.id;

  console.log(content);
  console.log(post_id);

  if (content) {

    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".new-comment-form")
  .addEventListener('submit', commentFormHandler);
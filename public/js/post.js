const delButtonHandler = async (event) => {
  
  console.log('del button clicked')

  const id = event.target.getAttribute('data-id');

  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Failed to delete post');
    }
};

document
  .querySelector("#deleteBtn")
  .addEventListener('click', delButtonHandler);
// const updateButtonHandler = async (event) => {
  
//   console.log('update button clicked')

//   const id = event.target.getAttribute('data-id');

//   // TO DO: FIX THIS
//   document.location.replace(`/updatepost/${id}`);
  
// };

const delButtonHandler = async (event) => {
  
  console.log('del button clicked')

  const id = event.target.getAttribute('data-id');

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
};

document
  .querySelector("#deleteBtn")
  .addEventListener('click', delButtonHandler);

document
  .querySelector("#updateBtn")
  .addEventListener('click', updateButtonHandler);  
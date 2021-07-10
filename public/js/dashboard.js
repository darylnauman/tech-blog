var addBtn = document.getElementById('addBtn');

const addButtonHandler = async (event) => {
  console.log('button clicked')
  document.location.replace(`/add-post`);
};

addBtn.addEventListener("click", addButtonHandler);
var addBtn = document.getElementById('addBtn');

const addButtonHandler = async (event) => {
  document.location.replace(`/add-post`);
};

addBtn.addEventListener("click", addButtonHandler);
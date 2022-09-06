const nameInput = document.getElementById('name-input');
const numberInput = document.getElementById('number-input');
const userButton = document.getElementById('user-button');
const userList = document.getElementById('user-list');
const BASE_URL = 'http://localhost:8080/api/v1/user';

userButton.addEventListener('click', async () => {
  const value1 = nameInput.value;
  const value2 = numberInput.value;
  try {
    const bodyValue = {
      name: value1,
      phoneNumber: value2,
    };

    const request = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyValue),
    });
    const data = await request.json();

    if (request.status == 201) {
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      todoInput.value = '';
      loadUser();
    } else {
      Swal.fire({
        icon: 'error',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Server Error',
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
const loadUser = async () => {
  try {
    const request = await fetch(BASE_URL);
    const data = await request.json();
    createTodoList(data);
  } catch (error) {
    console.log('error', error);
  }
};
const createTodoList = (data) => {
  const dataMap = data.map((user) => {
    return `
         <li id='${user.id}' class="list-group-item">
                <h3>${user.name}</h3>
                <h3>${user.phoneNumber}</h3>
                <div>
                <button class="btn btn btn-outline-warning user-update">Update</button>
                <button class="btn btn btn-outline-danger user-delete">Delete</button>
                </div>
            </li>
        `;
  });
  userList.innerHTML = dataMap.join('');
  addEventListenerToUpdate();
  addEventListenerToDelete();
};

const addEventListenerToDelete = () => {
  const buttonList = document.getElementsByClassName('user-delete');
  for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].addEventListener('click', deleteListener);
  }
};

const addEventListenerToUpdate = () => {
  const buttonList = document.getElementsByClassName('user-update');
  for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].addEventListener('click', updateListener);
  }
};

const updateListener = async (e) => {
    try {
        const id = e.target.parentNode.parentNode.id;

        const newName = await Swal.fire({
          title: 'Please enter your name',
          input: 'text',
          showCancelButton: true,
        });
... (91 lines left)
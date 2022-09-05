const personInput = document.getElementById('person-input');
const personButton = document.getElementById('person-button');
const personList = document.getElementById('person-list');
const BASE_URL = 'http://localhost:8080/api/v1/person';

personButton.addEventListener('click', async () => {
  const value = personInput.value;
  try {
    const bodyValue = {
      name: value,
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
        name: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      personInput.value = '';
      loadperson();
    } else {
      Swal.fire({
        icon: 'error',
        name: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      name: 'Server Error',
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
const loadPerson = async () => {
  try {
    const request = await fetch(BASE_URL);
    const data = await request.json();
    createPersonList(data);
  } catch (error) {
    console.log('error', error);
  }
};
const createPersonList = (data) => {
  const dataMap = data.map((person) => {
    return `
         <li id='${person.id}' class="list-group-item">
                <h3>${person.name}</h3>
                <div>
                <button class="btn btn-warning person-update">Update</button>
                <button class="btn btn-danger person-delete">Delete</button>
                </div>
            </li>
        `;
  });
  personList.innerHTML = dataMap.join('');
  addEventListenerToUpdate();
  addEventListenerToDelete();
};

const addEventListenerToDelete = () => {
  const buttonList = document.getElementsByClassName('person-delete');
  for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].addEventListener('click', deleteListener);
  }
};

const addEventListenerToUpdate = () => {
  const buttonList = document.getElementsByClassName('person-update');
  for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].addEventListener('click', updateListener);
  }
};

const updateListener = async (e) => {
  try {
    const id = e.target.parentNode.parentNode.id;

    const newname = await Swal.fire({
      name: 'Please enter your person name',
      input: 'text',
      showCancelButton: true,
    });

    if (!newname.isConfirmed) {
      return;
    }

    const bodyValue = {
      name: newname.value,
    };

    const request = await fetch(BASE_URL + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyValue),
    });

    const data = await request.json();

    if (request.status == 200) {
      Swal.fire({
        icon: 'success',
        name: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      loadPerson();
    } else {
      Swal.fire({
        icon: 'error',
        name: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      name: 'Server error',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const deleteListener = async (e) => {
  const id = e.target.parentNode.parentNode.id;

  try {
    const request = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await request.json();
    if (request.status == 200) {
      Swal.fire({
        icon: 'success',
        name: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      loadPerson();
    } else {
      Swal.fire({
        icon: 'error',
        name: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      name: 'Server Error',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

loadPerson();

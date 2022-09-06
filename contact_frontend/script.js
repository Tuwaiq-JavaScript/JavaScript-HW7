const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const contactButton = document.getElementById('add');
const contactList = document.getElementById('contact-list');
const BASE_URL = 'http://localhost:8080/api/v1/contact';

contactButton.addEventListener('click', async () => {
  const name = nameInput.value;
  const number=numberInput.value;
  try {
    const bodyValue = {
      "name": name,
      "number": number
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
      loadTodo();
    } else {
      Swal.fire({
        icon: 'error',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
  }
});

const loadContact = async () => {
  try {
      const request = await fetch(BASE_URL);
      const data = await request.json();
      console.log(data)

      createTodo(data)
  }
  catch (error) {
      console.log('error', error)
  }
}

const createTodo = (data) => {
  const dataMap = data.map((todo) => {
      return `<tr id='${todo.id}'>
      <td>${todo.name} </td>        <td>${todo.number} </td>
      <td style="text-align: right;">
      <button type="submit" class="btn btn-dark ms-1 update">Update</button>
      <button class="btn btn-dark delete">Delete</button>
      </td>
    </tr>`
  })
  contactList.innerHTML = dataMap.join('');

  addEventListenerToDelete();
  addEventListenerToUpdate();



}

const addEventListenerToDelete = () => {
  const buttonList = document.getElementsByClassName('delete');
  for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].addEventListener('click', deleteListener);
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
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      loadTodo();
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
};


const addEventListenerToUpdate = () => {
  const buttonList = document.getElementsByClassName('update');
  for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].addEventListener('click', updateListener);
  }
};

const updateListener = async (e) => {
  try {
    const id = e.target.parentNode.parentNode.id;

    const newName = await Swal.fire({
      name: 'Please enter name',
      input: 'text',
      showCancelButton: true,
    });

    if (!newName.isConfirmed) {
      return;
    }

    const newNumber = await Swal.fire({
      title: 'Please enter number',
      input: 'text',
      showCancelButton: true,
    });

    if (!newNumber.isConfirmed) {
      return;
    }

    const bodyValue = {
      name: newName.value,
      number: newNumber.value
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
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      loadTodo();
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
      title: 'Server error',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

loadContact();
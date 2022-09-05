// enter name
const todoInput = document.getElementById('todo-input'); 
// add name
const todoButton = document.getElementById('todo-button');
// enter number
const todoInput1 = document.getElementById('todo-input1');
// add number
const todoButton1 = document.getElementById('todo-button1');

const todoList = document.getElementById('todo-list');
const BASE_URL = 'http://localhost:8080/api/v1/todo';

todoButton.addEventListener('click', async () => {
  const value = todoInput.value;
  const value2 = todoInput1.value;
  try {
    const bodyValue = {
        name: value,
        number:value2,
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
      todoInput1.value='';
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
});
const loadTodo = async () => {
  try {
    const request = await fetch(BASE_URL);
    const data = await request.json();
    createTodoList(data);
  } catch (error) {
    console.log('error', error);
  }
};
const createTodoList = (data) => {
  const dataMap = data.map((todo) => {
    return `
         <li id='${todo.id}' class="list-group-item">
             <div class="parent">

             <div class="child">
                <h3>name: ${todo.name}</h3>
                </div>
                
             <div class="child">
                 <h3>number: ${todo.number}</h3>
                 </div>

                 </div>
                <div>
                <button class="btn btn-warning todo-update">Update</button>
                <button class="btn btn-danger todo-delete">Delete</button>
                </div>
            </li>
        `;
  });
  todoList.innerHTML = dataMap.join('');
  addEventListenerToUpdate();
  addEventListenerToDelete();
};

const addEventListenerToDelete = () => {
  const buttonList = document.getElementsByClassName('todo-delete');
  for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].addEventListener('click', deleteListener);
  }
};

const addEventListenerToUpdate = () => {
  const buttonList = document.getElementsByClassName('todo-update');
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
    
        if (!newName.isConfirmed) {
          return;
        }
        const newPhone = await Swal.fire({
            title: 'Please enter your phone',
            input: 'text',
            showCancelButton: true,
          });
      
          if (!newPhone.isConfirmed) {
            return;
          }
        const bodyValue = {
            name: newName.value,
            number:newPhone.value,
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

// const updateHandler = async (e) => {
//     const id = e.target.parentNode.parentNode.id;

//      Swal.fire({
//         title: 'update infp',
//         html: `<input type="text" id="name" class="swal2-input" placeholder="Name">
//         <input type="text" id="phone" class="swal2-input" placeholder="Phone Number">`,
//         confirmButtonText: 'Update',
//         focusConfirm: false,
//         preConfirm: () => {
//           const name = Swal.getPopup().querySelector('#name').value
//           const phone = Swal.getPopup().querySelector('#number').value
//           if (!name || !phone) {
//             Swal.showValidationMessage(`Please enter Name and PhoneNumber`)
//           }
//           return { name: name, phone: phone }
//         }
//       }).then(async (result) => {
//         try{
//             const body={
//                 name:result.value.name,
//                 number:result.value.phone
//             }
//             const request = await fetch(BASE_URL+"/"+id ,{
//                method:"PUT",
//                headers:{
//                 "Content-Type":"application/json"
//                },
//                body: JSON.stringify(body)
//             });
//             const data = await request.json();
//             loadContactList();
//         } catch (error) {
//           console.log(error);
//         }
//       })
// };


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

loadTodo();

const name = document.getElementById("form1");
const number=document.getElementById("form2")
const add = document.getElementById("add-user");
const contactList = document.getElementById("contact-list");

const url = 'http://localhost:8080/api/v1/user';



add.addEventListener('click', async () => {
    const name1 = name.value;
    const phoneNumber=number.value;
try{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aGF5YTE6SGgxMjM0NTY=");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "name": name1,
        "phoneNumber":phoneNumber
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const request = await fetch(url,requestOptions);
    const data = await request.json()
    loadContact();

    if (request.status == 201) {
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        name.value = '';
        number.value='';
        loadContact();
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

const loadContact = async () => {
    try {
        const request = await fetch(url);
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
        <td>${todo.name} </td>        <td>${todo.phoneNumber} </td>
        <td style="text-align: right;">
        <button type="submit" class="btn btn-warning ms-1 update">Update</button>
        <button class="btn btn-danger delete">Delete</button>
        </td>
      </tr>`
    })
    contactList.innerHTML = dataMap.join('');

    addEventListenerToDelete();
    addEventListenerToUpdate();



}
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
      title: 'Please enter your name',
      input: 'text',
      showCancelButton: true,
    });

    if (!newName.isConfirmed) {
      return;
    }
    const newPhone = await Swal.fire({
      title: 'Please enter your phone number',
      input: 'text',
      showCancelButton: true,
    });

    if (!newPhone.isConfirmed) {
      return;
    }
    const bodyValue = {
      name:newName.value,
      phoneNumber: newPhone.value
    };

    const request = await fetch(url + '/' + id, {
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
      loadContact();
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

const addEventListenerToDelete =() =>{

  const deleteButton = document.getElementsByClassName("delete");
  for (let index = 0; index < deleteButton.length; index++) {
      deleteButton[index].addEventListener('click', deleteListener);
  }
};
const deleteListener = async (event) =>{
  console.log(event)
  try {
  const id=event.target.parentNode.parentNode.id;
  const request= await fetch(`${url}/${id}`,{
      method:'DELETE',
  });
  const data =await request.json()
  
  if (request.status == 200) {
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      loadContact();
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
}


loadContact();
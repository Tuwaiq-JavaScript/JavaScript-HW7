const contactList = document.getElementById("contact-list");
const nameInput = document.getElementById("name-input");
const numberInput = document.getElementById("number-input");
const addButton = document.getElementById("add-button");
const BASE_URL = "http://localhost:8090/api/v1/person";

const loadContact = async () => {
  try {
    const request = await fetch(BASE_URL);
    const data = await request.json();
    createContactList(data);
  } catch (error) {
    console.log("error", error);
  }
};
const createContactList = (data) => {
  const dataMap = data.map((person) => {
    return `
      <div id='${person.id}' class="card m-5" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${person.name}</h5>
        <p class="card-text">${person.number}</p>
        <div
          class="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button type="button" class="btn btn-outline-warning update-button">
            Update
          </button>
          <button type="button" class="btn btn-outline-danger delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
          `;
  });
  contactList.innerHTML = dataMap.join("");
  addEventListenerToUpdate();
  addEventListenerToDelete();
};
const updateListener = async (e) => {
  try {
    const id = e.target.parentNode.parentNode.parentNode.id;

    const newContact = await Swal.fire({
      title: "update contact",
      html: `<input type="text" id="name-swal" class="swal2-input" placeholder="Name">
        <input type="text" id="number-swal" class="swal2-input" placeholder="Number">`,
      confirmButtonText: "save",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name-swal").value;
        const number = Swal.getPopup().querySelector("#number-swal").value;
        if (!name || !number) {
          Swal.showValidationMessage(`Please enter name and number`);
        }
        return { name: name, number: number };
      },
    });

    if (!newContact.isConfirmed) {
      return;
    }

    const bodyValue = {
      name: newContact.value.name,
      number: newContact.value.number,
    };

    const request = await fetch(BASE_URL + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyValue),
    });

    const data = await request.json();

    if (request.status == 200) {
      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      loadContact();
    } else {
      Swal.fire({
        icon: "error",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Server error",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
const deleteListener = async (e) => {
  try {
    const id = e.target.parentNode.parentNode.parentNode.id;
    const request = await fetch(BASE_URL + "/" + id, {
      method: "DELETE",
    });
    const data = await request.json();

    if (request.status == 200) {
      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      loadContact();
    } else {
      Swal.fire({
        icon: "error",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Server Error",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
addButton.addEventListener("click", async () => {
  const nameValue = nameInput.value;
  const numberValue = numberInput.value;
  try {
    const bodyValue = {
      name: nameValue,
      number: numberValue,
    };

    const request = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyValue),
    });
    const data = await request.json();

    if (request.status == 201) {
      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      nameInput.value = "";
      numberInput.value = "";
      loadContact();
    } else {
      Swal.fire({
        icon: "error",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
const addEventListenerToDelete = () => {
  const buttonList = document.getElementsByClassName("delete-button");
  for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].addEventListener("click", deleteListener);
  }
};

const addEventListenerToUpdate = () => {
  const buttonList = document.getElementsByClassName("update-button");
  for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].addEventListener("click", updateListener);
  }
};
loadContact();

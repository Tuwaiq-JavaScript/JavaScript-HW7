const todoInput = document.getElementById('todo-input');
const todoButton = document.getElementById('todo-add');
const todoList = document.getElementById('todo-list');
// const deleteButton = document.getElementsByClassName('todo-delete');
// const updateButton = document.getElementsByClassName('todo-update');
const url="http://localhost:8080/api/v1/todo"



//---------LOAD------------

const loadTodoList= async () => {

    try{
        const request = await fetch(url);
        const data = await request.json();
        createTodoList(data);
        deleteEventListener();
        UpdateEventListener();
    } catch (error) {
      console.log(error);
    }
};

const createTodoList=(data) =>{
    const dataMap = data.map((todo) => {
        return `
            <li class="list-group-item" id="${todo.id}">${todo.title}
            <div>
            <button class="btn btn-outline-secondary delete-button" type="button">delete</button>
            <button class="btn btn-outline-secondary update-button" type="button">update</button>
            </div>
            </li> 
        `;
    
      });

      todoList.innerHTML=dataMap.join("");

};


//-----------ADD----------

const addClickHandler = async () => {
    const inputValue = todoInput.value;
    const body={
        title:inputValue
    }

    try{
        const request = await fetch(url,{
           method:"POST",
           headers:{
            "Content-Type":"application/json"
           },
           body: JSON.stringify(body)
        });
        const data = await request.json();
        loadTodoList();
        Swal.fire({
            icon: 'success',
            title: 'todo has been added',
            showConfirmButton: false,
            timer: 1500
          })
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    todoInput.value = '';
  };



  //-------------Delete---------
  const deleteHandler = async (e) => {
    const id = e.target.parentNode.parentNode.id;
    console.log(id)
    try{
        const request = await fetch(url+'/'+id ,{
           method:"DELETE",
           headers:{
            "Content-Type":"application/json"
           },
        });
        const data = await request.json();
        loadTodoList();
    } catch (error) {
      console.log(error);
    }

};

//------------Update-----------
const updateHandler = async (e) => {
    const id = e.target.parentNode.parentNode.id;
    const { value: todoTitle } = await Swal.fire({
        title: 'Enter your todo title',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'update'
      })

    const body={
        title:todoTitle
    }
    try{
        const request = await fetch(url+"/"+id ,{
           method:"PUT",
           headers:{
            "Content-Type":"application/json"
           },
           body: JSON.stringify(body)
        });
        const data = await request.json();
        loadTodoList();
    } catch (error) {
      console.log(error);
    }

};




loadTodoList();
todoButton.addEventListener('click', addClickHandler);
todoButton.addEventListener('click', addClickHandler);


const deleteEventListener=()=>{
    const deleteButton=document.getElementsByClassName("delete-button");
    for(let index=0 ; index<deleteButton.length ; index++){
    deleteButton[index].addEventListener("click",deleteHandler)
    }
};

const UpdateEventListener=()=>{
    const updateButton=document.getElementsByClassName("update-button");
    for(let index=0 ; index<updateButton.length ; index++){
    updateButton[index].addEventListener("click",updateHandler)
    }
};




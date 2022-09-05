const todoInput = document.getElementById('todo-input');
const todoButton = document.getElementById('todo-button');
const todoList = document.getElementById('todo-list');
const BASE_URL = 'http://localhost:8080/api/v1';

todoButton.addEventListener('click', async () => {
    const value = todoInput.value;
    try {
        const bodyValue = {
            tai: value
        };


        const request = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyValue)

        });

        const data = await request.json();
        loadTodo();
        if (request.status == 201) {
            Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
            })
        }


    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'server error',
            showConfirmButton: false,
            timer: 1500,
        })
    }
})

const loadTodo = async () => {
    try {
        const request = await fetch(BASE_URL)
        const data = await request.json()
        creatTodoList(data)

    } catch (e) {
        console.log('error' + e);
    }
};

const creatTodoList = (data) => {
    const dataMap = data.map((todo) => {
        return (`
        <li id='${todo.id}' class="list-group-item todo-item">
            <h3>${todo.tai}</h3>
            <h3 style="padding: 5px; background-color: rgb(184, 148, 116);">${todo.number}</h3>

            <div>
            <button class="btn btn-danger todo-delete">delete</button>
            <button class="btn btn-info todo-update">update</button>
            </div>
    </li>
            `)

    })
    todoList.innerHTML = dataMap.join('');
    addEventListenerToUpdate();
    addEventListenerToDelete();

}

const addEventListenerToDelete = () => {
    const buttonList = document.getElementsByClassName('todo-delete');
    for (let index = 0; index < buttonList.length; index++) {
        buttonList[index].addEventListener('click', deleteListener)

    }

}


const addEventListenerToUpdate = () => {
    const buttonList = document.getElementsByClassName('todo-update');
    for (let index = 0; index < buttonList.length; index++) {
        buttonList[index].addEventListener('click', updateListener)

    }

}

const updateListener = async (e) => {

    try {
        const id = e.target.parentNode.parentNode.id;

        const newTitle = await Swal.fire({
            title: 'enter new title',
            input: 'text',
            showCancelButton: true,

        });

        if (!newTitle.isConfirmed) {
            return;
        }

        const bodyValue = {
            tai: newTitle.value,
        }
        const request = await fetch(BASE_URL + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyValue),
        })

        const data = await request.json();

        if (request.status == 200) {
            Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
            })
            loadTodo();

        } else {
            Swal.fire({
                icon: 'error',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
            })
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'server error',
            showConfirmButton: false,
            timer: 1500,
        })
    }
}


    const deleteListener = async (e) => {
        const id = e.target.parentNode.parentNode.id;

        try {


            const request = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE',

            })
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
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    loadTodo();


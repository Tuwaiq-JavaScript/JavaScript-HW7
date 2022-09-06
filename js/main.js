const save_bt=document.getElementById('bt-save');
const input_name=document.getElementById('name-number')
const input_number=document.getElementById('number')
const contact_list=document.getElementById('contact-list')
const delet_bt=document.getElementsByClassName('delet')
const update_bt=document.getElementsByClassName('update')
const url_main='http://localhost:8080/api/v1/contact'

save_bt.addEventListener('click',async()=>{
    try {
    const value_name= input_name.value;
    const value_number= input_number.value;
    const bodyValue={
        name:value_name,
        number:value_number};
    const request=await fetch(url_main, {
      method:'POST',
      headers:{'Content-Type':'application/json',} ,
      body:JSON.stringify(bodyValue)
    });
    const data=await request.json();
    if (request.status == 200) {
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        todoInput.value = '';
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
})
const loadContact = async()=>{
    try {
    const request= await fetch(url_main,{
   
    });
    const data= await request.json();
    createContactList(data);
}catch(error){
console.log('error', error)
}
};
const createContactList= (data)=>{
    const dataMap=data.map(contact =>{
       return ` 
       
       <div id='${contact.id}' class="card-body">
          <h5 class="card-title">${contact.name}</h5>
          <p class="card-text"> ${contact.number}</p>
          <button type="button" class="btn btn-danger delet ">delet</button>
          <button type="button" class="btn btn-warning update">update</button>
        </div>
       `;
    });
    todolist.innerHTML=dataMap.join(' ')
    addEventListenerToDelete();
    addEventListenerToUpdate();
   };
   const addEventListenerToDelete=()=>{
    const buttonList = document.getElementsByClassName('delet');
 for (let index = 0; index < buttonList.length; index++) {
     buttonList[index].addEventListener('click', deleteListener);  
 }   
}
const deleteListener = async (e) => {
   
    const id = e.target.parentNode.id;
    try {
        const request = await fetch(`${url_main}/${id}`, {
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
      } };

      const addEventListenerToUpdate = () => {
        const buttonList = document.getElementsByClassName('update');
        for (let index = 0; index < buttonList.length; index++) {
          buttonList[index].addEventListener('click', updateListener);
        }
      };

      const updateListener = async (e) => {
        try {
          const id = e.target.parentNode.id;
      
          const newTitle = await Swal.fire({
            title: 'Please enter your contact name',
            input: 'text',
            title: 'Please enter your contact number',
            input: 'text',
            showCancelButton: true,
          });
      
          if (!newTitle.isConfirmed) {
            return;
          }
      
          const bodyValue = {
            title: newTitle.value,
          };
      
          const request = await fetch(url_main + '/' + id, {
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

      loadContact();
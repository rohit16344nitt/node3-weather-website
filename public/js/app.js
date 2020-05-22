
// const require= 



const w_form = document.querySelector('form');
const search= document.querySelector('input');
const msg1= document.querySelector('#message-1')
const msg2= document.querySelector('#message-2')

w_form.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const location = search.value
    console.log(location)
    fetch('http://localhost:3000/info?search='+location).then((response)=>
{
   response.json().then((data)=>
   {
       if(data.error){
        msg2.textContent=data.error;
       }
       else{
           console.log("temp id"+data.temperature)
           msg2.textContent=data.temperature
       }
   })
})
})

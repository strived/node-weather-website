console.log('javascript loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//      response.json().then((data)=>{
//          console.log(data)
//      })
// })






const weatherFrom=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



weatherFrom.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value;
    
if(location)
{
   
    messageOne.textContent='loading'
    messageTwo.textContent=''
    
fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
       if(data.errorMessage)
       {           
           messageOne.textContent=data.errorMessage          
       }
       else
       {
           messageOne.textContent=data.location  
           messageTwo.textContent=data.forecast                
       }
    })
})

}

else
{
    console.log('Plese provide the location')
}

})

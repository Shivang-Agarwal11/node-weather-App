
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=search.value
    messageOne.textContent='Loading....'
    messageTwo.textContent=''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            messageOne.textContent=data.error
            else{
                messageOne.style.fontSize='xx-large'
                messageOne.style.fontWeight='900'
                messageOne.textContent=`${data.temperature}℃ `
            messageTwo.textContent=data.location
    
            }
        })
    })
})
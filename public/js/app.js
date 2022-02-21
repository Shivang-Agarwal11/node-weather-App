
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=search.value
    messageOne.textContent='Loading....'
    messageTwo.textContent=''
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            messageOne.textContent=data.error
            else{
                messageTwo.style.fontSize='x-large'
                messageTwo.style.fontWeight='600'
                messageTwo.textContent=`${data.temperature}℃ `
            messageOne.textContent=`Weather in ${data.location}`
            messageThree.textContent=`There is a ${data.rainfall}% chance of rain`
    
            }
        })
    })
})
const socket = io();

let form = document.getElementById('form')
let inp = document.getElementById('inp')
let btn= document.getElementById('btn')

console.log(inp)



socket.on('connect', ()=>{
    console.log(socket.id)  
})

socket.on('typing-msg', data=>{
    let div = document.getElementById('dots')
   
   if (!data.isTyping) {
    div.innerHTML = ' '
    return
    }


    div.innerHTML = ` <p >  ... </p>`
    div.setAttribute('class', 'dotDiv ' )
    


})

socket.on('chat-msg', (msg)=>{
    const div = document.createElement('div')
    div.setAttribute("class", 'message');
    //div.setAttribute("id", msg.id);
    div.innerHTML = `  <p >  ${msg.activUsers[0].username} </p>
     <p >  ${msg.msg} </p>`
    let msgContainer=document.getElementsByClassName('chat-messages')[0]
    msgContainer.appendChild(div)
})

form.addEventListener('submit', (e)=>{
    e.preventDefault()
   
    socket.emit('message', inp.value)
     inp.value = ''
})
 
inp.addEventListener('keyup',()=>{
    
     socket.emit("typing", {
        isTyping: inp.value.length> 0
        
      });

})


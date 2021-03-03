  let users= [
    {_id:1, 
      username: 'Users'
    }]


function  appController (req, res){
     let userId = users.find(el=> el._id==req.user.id )
     if(!userId){
     users.push(req.user)}
   

     res.render('components/app.ejs', {users:users});
    }
 

 module.exports ={
     appControlling: appController,
     activUsers: users
 }
 
 

   

 

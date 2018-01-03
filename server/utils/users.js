class Users{
    constructor(){
        this.users = [];
    }

addUser(id, username, email, password){
    var user = {id, username, email, password};

    if(this.users.length == 0){
        this.users.push(user);
    }
    else{
        var filteredUsers = this.users.filter((user) => {
            var data = user.username === username;
            return data;
        });
        if(filteredUsers.length == 0){
            this.users.push(user);
        }
        else{
            return false;
        }

    }
    return user;
}

removeUser (id){
    var user =  this.getUser(id);
  
     if(user){
      this.users =  this.users.filter((user) => user.id !== id);
     }
      return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
    
  }


getUserList (){
    var users = this.users;
  
    return users;   
 }
 

}

module.exports = {Users};
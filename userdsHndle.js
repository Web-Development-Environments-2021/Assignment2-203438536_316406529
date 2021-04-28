var usersDB = [{
    userName: "k",
    password: "k",
    fullName: "",
    email: "",
    birthDate: "",
}
];
function checkLogInDetails(username, Password){
    let userCheck =  usersDB.some((user)=>(user.userName==username && user.password==Password));
    return userCheck;
}

function checkIfUsernameExist(username){
    alert("enter usercheck func");
    usersDB.userName.forEach(function(item){
        if(item.userName === username){
            // There is a socketid equals to bVLmrV8I9JsSyON7AAAA in priyanka
            return false;
        } 
            // Socketid not found
    });
    return true;

    //return true if already username exist
    // let usreExist = usersDB.some((user)=>user.userName == username);
    // if( usreExist){
    //     alert("user already exist in system")
    // }
    // return usreExist;
}


const usersDB = [{
    userName: "k",
    password: "k",
    fullName: "",
    email: "",
    birthDate: "",
}
];
function checkDetails(username, Password){
    let userCheck =  usersDB.some((user)=>(user.userName==username && user.password==Password));
    return userCheck;
}

function checkIfUsernameExist(username){
    alert("enter usercheck func");

    //return true if already username exist
    let usreExist = usersDB.some((user)=>user.userName == username);
    return usreExist;
}

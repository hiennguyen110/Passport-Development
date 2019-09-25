const mongoose = require("mongoose");
const highlighter = require("../highlighter/highlight.js");
const USER_DATABASE = "USER";
const USER_COLLECTION = "USERACCOUNT";

const connect_to_database = function(databaseName){
    return mongoose.connect("mongodb+srv://patsdatabase:52435798H$a@patskahootdbs-irwee.gcp.mongodb.net/" + databaseName + "?retryWrites=true&w=majority", { useNewUrlParser: true });    
}

const insert_new_user = function(userInfo){
    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });

    userName = userInfo[0]; 
    passWord = userInfo[1];
    firstName = userInfo[2];
    lastName = userInfo[3];

    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);

    const new_user = new USER_ACCOUNT({
        userName: userName,
        passWord: passWord,
        firstName: firstName, 
        lastName: lastName
    });

    USER_ACCOUNT.insertMany([new_user], function(error){
        if (error){
            console.log(highlighter.error_highlighter(error));
            mongoose.connection.close();
        } else {
            console.log(highlighter.success_highlighter("New user has been added !!!"));
            mongoose.connection.close();
        }
    });
}

const find_user = function(userName){
    mongooseConn = connect_to_database(USER_DATABASE);
    const USER_ACCOUNT_SCHEMA = new mongoose.Schema({
        userName: String,
        passWord: String,
        firstName: String,
        lastName: String
    });
    const USER_ACCOUNT = mongoose.model(USER_COLLECTION, USER_ACCOUNT_SCHEMA);
    USER_ACCOUNT.find({userName: userName}, function(error, users){
        if (error){
            console.log(highlighter.error_highlighter(error));
        } else {
            console.log(users);
        }
    });
}

userInfo = ['hien', 'hien', 'hien', 'hien'];
insert_new_user(userInfo);

module.exports = {
    insert_new_user: insert_new_user,
    find_user: find_user,
}
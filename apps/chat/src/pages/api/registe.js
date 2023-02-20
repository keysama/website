const fs = require('fs');
const path =require('path');

const userFile = path.resolve(__dirname, '..', '..', '..', '..','data', 'users.json');

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default async function handler(req, res) {

    const { nickname,email,password } = req.body;

    let userList = fs.readFileSync(userFile, {encoding: 'utf-8'});

    userList = JSON.parse(userList);

    const newUser = {
        uid: guid(),
        email,
        nickname,
        password
    };

    if(userList.find(item => item.email === email )){
        return res.status(500).json({
            result: {
                reason: 'email exits !'
            }
        });
    }else{
        userList.push(newUser)
    }

    fs.writeFileSync(userFile,JSON.stringify(userList), {encoding: 'utf-8'});


    const { password:ignored, ...others} = newUser;

    return res.status(200).json({
        result: others
    });
}
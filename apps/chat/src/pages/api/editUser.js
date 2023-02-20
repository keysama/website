const fs = require('fs');
const path =require('path');
const { initFile } = require('../../utils/file');

const userFile = path.resolve(__dirname, 'users.json');

export default async function handler(req, res) {
    await initFile(userFile, '[]')

    const { uid, email,password, ...others } = req.body;

    let userList = fs.readFileSync(userFile, {encoding: 'utf-8'});

    userList = JSON.parse(userList);

    const currentUser = userList.find((item) => item.uid === uid && item.password === password);

    if(!currentUser){
        return res.status(401).json({
            result: {
                reason: 'user not find or password not correct'
            }
        })
    }

    const changedUser = {
        uid: uid,
        ...currentUser,
        ...others
    }

    if(userList.find(item => email && item.email === email )){
        return res.status(500).json({
            result: {
                reason: 'email exits !'
            }
        });
    }else{
        userList = userList.filter(item => item.uid !== uid)
    }

    userList.push(changedUser);

    fs.writeFileSync(userFile,JSON.stringify(userList), {encoding: 'utf-8'});

    const { password:ignored, ...rests} = changedUser;

    return res.status(200).json({
        result: rests
    });
}
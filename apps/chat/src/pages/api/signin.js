const fs = require('fs');
const path =require('path');

const userFile = path.resolve(__dirname, '..', '..', '..', '..','data', 'users.json');

export default async function handler(req, res) {

    const { email,password } = req.body;

    let userList = fs.readFileSync(userFile, {encoding: 'utf-8'});

    userList = JSON.parse(userList);

    const currentUser = userList.find((item) => item.email === email && item.password === password);

    if(!currentUser){
        return res.status(401).json({
            result: {
                reason: 'user not find or password not correct'
            }
        })
    }

    const { password:ignored, ...others} = currentUser;

    return res.status(200).json({
        result: others
    });
}
const fs = require('fs');
const path = require('path');

function initFile(path_way, defaultData) {
    return new Promise((resolve, reject) => {
        const parentPath = path.parse(path_way).dir;
        if (!fs.existsSync(parentPath)) {
            fs.mkdirSync(parentPath, { recursive: true });
        }

        fs.access(path_way, (err) => {
            if (err) {
                fs.appendFileSync(path_way, defaultData, {
                    encoding: 'utf-8',
                }, (err) => {
                    if (err) {
                        return console.log('该文件不存在，重新创建失败！')
                    }
                    console.log("文件不存在，已新创建");
                });
                resolve(true);
            } else {
                resolve(true);
            }
        })
    })
};

module.exports = {
    initFile
}
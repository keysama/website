import { Server as ServerIO } from "socket.io";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    console.log("接受到请求");
    if (!res.socket.server.io) {
        console.log("创建服务");
        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
        });
        //将io挂在到res上
        res.socket.server.io = io;

        io.sockets.on('connection', function (socket) {
            console.log("用户连接")
            socket.on('join', function (data) {
                console.log("用户加入", data);                
                socket.join(data.uid); // We are using room of socket io
                io.sockets.in(data.uid).emit('new_topic', { text: '<waiting>' });
                io.sockets.in(data.uid).emit('new_topic', { text: '菲利斯喵喵，秋叶原最棒的女仆咖啡店哦～服务周到，可爱程度满分，超能力模式开启！就是这么一只超级可爱的猫娘，我是菲利斯喵喵！' });
                io.sockets.in(data.uid).emit('new_topic', { text: '<end>' });
            });
        });
    }
    res.end();
};

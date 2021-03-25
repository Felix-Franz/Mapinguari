import {Socket} from "socket.io";

export default interface SocketCallbackInterface {
    readonly eventName: string;
    handleSocket(socket: Socket) : void;
}

// type SocketCallbackInterface = {
//     readonly eventName: string;
//     handleSocket(socket: Socket): void;
// };
//
// export default  SocketCallbackInterface;

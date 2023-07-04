import { Server } from "socket.io";
import { Server as HttpServer } from 'http';
import { getTripFavourites } from "../trips/trip.service";

interface Trip {
    _id : string;
    socketId : string;
    totalFavorites : number;
}




export default function socketServer(server : HttpServer){
        const io = new Server(server, {
            cors: {
                origin: "https://task-travel.netlify.app",
                methods: ["GET", "POST"],
                credentials: true
            },
        });

        const favouriteCounts = new Map<string, number>();

   
        
        io.on('connection', async(socket) => {
          
            const trips = await getTripFavourites();
            trips.forEach((trip) => {
              favouriteCounts.set(trip._id.toString(), trip.totalFavorites);
            });
      

        //emit the favourite count to the client
        socket.emit("favoriteCount", 
        [...favouriteCounts.entries()].map(([tripId, count]) => ({ tripId, count }))
        );

        //handle the favourite event
        socket.on("addToFavorites", (tripId : string) => {
            favouriteCounts.set(tripId, (favouriteCounts.get(tripId) || 0) + 1);
            io.emit('favoriteCount', [...favouriteCounts.entries()].map(([tripId, count]) => ({ tripId, count })));
            console.log(favouriteCounts);
        });
          

        //handle the unfavourite event
        socket.on('removeFromFavorites', (tripId : string) => {
            favouriteCounts.set(tripId, (favouriteCounts.get(tripId) || 0) - 1);
            io.emit('favoriteCount', [...favouriteCounts.entries()].map(([tripId, count]) => ({ tripId, count })));
            console.log(favouriteCounts);
        });

        //handle the disconnect event
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        });

}
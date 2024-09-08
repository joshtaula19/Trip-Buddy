

export default function tripData(trips){
 
    
    const formattedData: { [key: string]: any[] } = {};
  console.log('sorting:',trips)
   
    trips.forEach(trip => {
      
      if (!formattedData[trip.trip_name]) {
       
        formattedData[trip.trip_name] = [];
      }
  
      
      formattedData[trip.trip_name].push({
        id: trip.id,
        name: trip.name,
        imageUrl: trip.imageUrl,
        userRating: trip.userRating.toString(),
        trip_id: trip.trip_id
      });
    });
  
    return [formattedData];
  }
  export function ListTrips(trips) {
    const uniqueTrips = {};
    
    trips.forEach(trip => {
      uniqueTrips[trip.trip_id] = {
        trip_name: trip.trip_name,
        trip_id: trip.trip_id
      };
    });
  
    return Object.values(uniqueTrips);
  }
  
  
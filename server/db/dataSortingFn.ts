

export default function sortPlaceData(trips){
 
    
    const formattedData: { [key: string]: any[] } = {};
  
    console.log('sortPlaceData trips_name',trips.trip_name)
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
  
    return formattedData;
  }
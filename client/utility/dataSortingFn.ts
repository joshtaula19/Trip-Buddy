import { Attraction } from '../../models/attraction'

interface ActivityData {
  type: string;
  id: string;
  self: {
    href: string;
    methods: string[];
  };
  name: string;
  description: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  rating: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  pictures: string[];
  bookingLink: string;
  minimumDuration: string;
}
export default function tripData(trips) {
  const formattedData: { [key: string]: any[] } = {}

  trips.forEach((trip) => {
    if (!formattedData[trip.trip_name]) {
      formattedData[trip.trip_name] = []
    }

    formattedData[trip.trip_name].push({
      id: trip.id,
      name: trip.name,
      imageUrl: trip.imageUrl,
      userRating: trip.userRating.toString(),
      trip_id: trip.trip_id,
    })
  })

  return [formattedData]
}
export function ListTrips(trips) {
  const uniqueTrips = {}

  trips.forEach((trip) => {
    uniqueTrips[trip.trip_id] = {
      trip_name: trip.trip_name,
      trip_id: trip.trip_id,
    }
  })

  return Object.values(uniqueTrips)
}

export function sortRawAttractionData(activityData:ActivityData[]) {
  const formattedAttractions = activityData.map(item => ({
    id: Number(item.id),
    name: item.name,
    imageUrl: item.pictures[0], 
    price: `${item.price.amount} ${item.price.currencyCode}`, 
    userRating: parseFloat(item.rating) 
  }));
  
  
  
  return formattedAttractions
}

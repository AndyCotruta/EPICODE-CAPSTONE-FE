// import { View, Text } from "react-native";
// import React from "react";
// import MapView, { Marker } from "react-native-maps";
// import tw from "twrnc";
// import { useSelector } from "react-redux";
// import { selectRestaurant } from "../redux/reducers/restaurantSlice";
// import { darkGreen } from "../graphics/colours";

// const MapComponent = () => {
//   const restaurant = useSelector(selectRestaurant);

//   return (
//     <MapView
//       style={tw.style("flex-1")}
//       initialRegion={{
//         latitude: restaurant.lat,
//         longitude: restaurant.lon,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005,
//       }}
//       mapType="mutedStandard"
//     >
//       <Marker
//         coordinate={{ latitude: restaurant.lat, longitude: restaurant.lon }}
//         title={restaurant.title}
//         description={restaurant.short_description}
//         identifier="origin"
//         pincolor={darkGreen}
//       />
//     </MapView>
//   );
// };

// export default MapComponent;

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { ArchiveBoxIcon } from "react-native-heroicons/solid";
import { lightBeige } from "../../graphics/colours/index";

const WaterIntake = () => {
  const [litres, setLitres] = useState([1, 2, 3, 4, 5]);
  const [selected, setSelected] = useState([]);

  const handlePress = (index) => {
    setSelected((prevSelected) => {
      // check if the item is already selected
      if (prevSelected.includes(index)) {
        // remove the item from the selected list
        return prevSelected.filter((item) => item !== index);
      } else {
        // add the item to the selected list
        return [...prevSelected, index];
      }
    });
  };

  return (
    <View style={tw.style(`h-50 bg-[${lightBeige}] rounded-3xl mt-4 p-5 mb-2`)}>
      <Text style={tw.style("font-bold text-lg")}>Water Intake</Text>
      <Text style={tw.style("text-gray-400 text-xs")}>Recommended 5 liter</Text>
      <View style={tw.style("flex-row items-center justify-between  mt-5")}>
        {litres.map((littre, i) => (
          <TouchableOpacity
            style={tw.style("")}
            key={i}
            onPress={() => handlePress(i)}
          >
            <ArchiveBoxIcon
              size={60}
              color={selected.includes(i) ? "#1FA0AA" : "gray"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default WaterIntake;

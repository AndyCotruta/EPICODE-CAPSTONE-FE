import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import tw from "twrnc";
import { parse, format } from "date-fns";

const FoodSummary = () => {
  const scrollViewRef = useRef(null);
  const { width: screenWidth } = useWindowDimensions();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const numDays = new Date(year, month + 1, 0).getDate();
  const [containerWidth, setContainerWidth] = useState(screenWidth / 6);
  const [selectedDate, setSelectedDate] = useState(today);

  const days = Array.from(
    { length: numDays },
    (_, i) => new Date(year, month, i + 1)
  );

  useEffect(() => {
    const scrollToIndex = days.findIndex(
      (day) => day.getDate() === selectedDate.getDate()
    );
    if (scrollToIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: scrollToIndex * containerWidth * 0.875,
        animated: true,
      });
    }
  }, [scrollViewRef, selectedDate, days, containerWidth]);

  const onLayout = ({ nativeEvent }) => {
    const { width } = nativeEvent.layout;
    setContainerWidth(width);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={scrollViewRef}
    >
      {days.map((day) => (
        <TouchableOpacity
          key={day}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              day.getDate() === selectedDate.getDate() ? "black" : "white",
            paddingHorizontal: 16,
            paddingVertical: 8,
            width: containerWidth,
            height: 75,
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}
          onLayout={onLayout}
          onPress={() => handleDayPress(day)}
        >
          <Text
            style={{
              color:
                day.getDate() === selectedDate.getDate() ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            {format(day, "d")}
          </Text>
          <Text
            style={{
              color: day.getDate() === selectedDate.getDate() ? "gray" : "gray",
            }}
          >
            {format(day, "EE")}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FoodSummary;

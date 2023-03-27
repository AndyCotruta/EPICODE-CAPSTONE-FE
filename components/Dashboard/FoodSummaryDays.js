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

const FoodSummary = ({ activeDay, setActiveDay }) => {
  const scrollViewRef = useRef(null);
  const { width: screenWidth } = useWindowDimensions();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const numDays = new Date(year, month + 1, 0).getDate();
  const [containerWidth, setContainerWidth] = useState(screenWidth / 6);

  const days = Array.from(
    { length: numDays },
    (_, i) => new Date(year, month, i + 1)
  );

  useEffect(() => {
    const scrollToIndex = days.findIndex(
      (day) => day.getDate() === activeDay.getDate()
    );
    if (scrollToIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: scrollToIndex * containerWidth - 2.45 * containerWidth,
        animated: true,
      });
    }
  }, [scrollViewRef, activeDay, days, containerWidth]);

  const onLayout = ({ nativeEvent }) => {
    const { width } = nativeEvent.layout;
    setContainerWidth(width);
  };

  const handleDayPress = (day) => {
    setActiveDay(day);
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
              day.getDate() === activeDay.getDate() ? "black" : "white",
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
              color: day.getDate() === activeDay.getDate() ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            {format(day, "d")}
          </Text>
          <Text
            style={{
              color: day.getDate() === activeDay.getDate() ? "gray" : "gray",
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

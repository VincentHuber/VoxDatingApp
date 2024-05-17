import { Text, View } from "react-native";
import React from "react";
import Button from "./Button";
 
const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const Footer = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 150,
        width:250,
        flexDirection:"row",
        justifyContent: "center",
        alignItems :"center",
      }}
    >
        <Button 
            name="times" 
            size={24} 
            color={COLORS.nope}
            />
         <Button 
            name="star" 
            size={24} 
            color={COLORS.star}
            style={{height:40, width: 40}}
            
            />
        <Button 
            name="heart" 
            size={24} 
            color={COLORS.like}
            />
    </View>
  );
};

export default Footer;

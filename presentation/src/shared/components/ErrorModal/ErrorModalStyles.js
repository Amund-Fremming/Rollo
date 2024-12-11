import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../assets/Dimentions";
import { Colors } from "../../assets/Colors";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  modal: {
    alignItems: "center",
    width: "95%",
    paddingBottom: verticalScale(105),
    backgroundColor: Colors.Cream,
    borderRadius: moderateScale(30),
    paddingTop: verticalScale(40),
  },

  message: {
    fontSize: moderateScale(24),
    fontFamily: "Shrikhand",
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.Dark,
    paddingHorizontal: horizontalScale(10),
  },

  header: {
    fontSize: moderateScale(84),
    fontFamily: "Shrikhand",
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.Purple,
  },

  absoluteButton: {
    position: "absolute",
    bottom: verticalScale(20),
    width: "50%",
    borderRadius: moderateScale(10),
    height: "33%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Dark,
  },

  closeButton: {
    color: Colors.Cream,
    fontFamily: "Shrikhand",
    fontSize: moderateScale(28),
  },
});

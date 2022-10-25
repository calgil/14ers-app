import class1 from "../assets/PeakDetails/class1.png";
import class2 from "../assets/PeakDetails/class2.png";
import class2Plus from "../assets/PeakDetails/class2Plus.png";
import class3 from "../assets/PeakDetails/class3.png";
import class4 from "../assets/PeakDetails/class4.png";
import class5 from "../assets/PeakDetails/class5.png";

export const addDifficultyIcon = (str) => {
  switch (str) {
    case "class 1":
      return class1;
    case "class 2":
      return class2;
    case "class 2+":
      return class2Plus;
    case "class 3":
      return class3;
    case "class 4":
      return class4;
    case "class 5":
      return class5;
    default:
      return str;
  }
};

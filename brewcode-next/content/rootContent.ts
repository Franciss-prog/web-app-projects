import { AboutContentProps, SellingContentProps } from "@/types/type";
import { Coffee, WindArrowDown, HandCoins } from "lucide-react";
// About content
export const aboutContent: AboutContentProps[] = [
  {
    id: 1,
    title: "Affordable Prices",
    description: "Enjoy premium coffee and snacks without breaking the bank.",
    iconName: HandCoins,
    buttonContent: "See Coffee Pricing", // A button to view prices
  },
  {
    id: 2,
    title: "Quality Coffee",
    description:
      "Savor the rich taste of expertly brewed coffee made from the finest beans.",
    iconName: Coffee,
    buttonContent: "Discover Our Beans",
  },
  {
    id: 3,
    title: "Cozy Ambience",
    description:
      "Relax in a warm and inviting atmosphere perfect for work or leisure.",
    iconName: WindArrowDown,
    buttonContent: "Book Your Spot",
  },
];

export const sellingContent: SellingContentProps[] = [];

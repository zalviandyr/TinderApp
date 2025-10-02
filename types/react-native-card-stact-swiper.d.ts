// types/react-native-card-stack-swiper.d.ts
declare module "react-native-card-stack-swiper" {
  import * as React from "react";
  import { ViewStyle } from "react-native";

  export interface CardStackProps {
    children?: React.ReactNode;
    style?: ViewStyle;
    renderNoMoreCards?: () => React.ReactNode;
    secondCardScale?: number;
    secondCardAlpha?: number;
    disableTopSwipe?: boolean;
    disableBottomSwipe?: boolean;
    disableLeftSwipe?: boolean;
    disableRightSwipe?: boolean;
    onSwiped?: (index: number) => void;
    onSwipedLeft?: (index: number) => void;
    onSwipedRight?: (index: number) => void;
    onSwipedTop?: (index: number) => void;
    onSwipedBottom?: (index: number) => void;
  }

  export interface CardProps {
    children?: React.ReactNode;
    style?: ViewStyle;
  }

  export default class CardStack extends React.Component<CardStackProps> {}
  export class Card extends React.Component<CardProps> {}
}

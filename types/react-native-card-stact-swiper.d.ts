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
    verticalSwipe?: boolean;
    horizontalSwipe?: boolean;
    loop?: boolean;
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

  export default class CardStack extends React.Component<CardStackProps> {
    swipeLeft(duration?: number): void;
    swipeRight(duration?: number): void;
    swipeTop(duration?: number): void;
    swipeBottom(duration?: number): void;
    goBackFromLeft(): void;
    goBackFromRight(): void;
    goBackFromTop(): void;
    goBackFromBottom(): void;
  }
  export class Card extends React.Component<CardProps> {}
}

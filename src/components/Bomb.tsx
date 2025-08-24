import { Component, type ReactNode } from "react";

export default class Bomb extends Component {
  render(): ReactNode {
    throw new Error("Искусственная ошибка в классовом компоненте");
    return null; 
  }
}
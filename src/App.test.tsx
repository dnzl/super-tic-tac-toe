import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("on game start", () => {
  it("should render 10 boxes", () => {});
  it("should display all boxes empty", () => {});
  it("should start with X player", () => {});
  it("should start with O player if they lost previous game", () => {});
  it("should start with X player if they lost previous game", () => {});
});

describe("game flow", () => {
  test("when player X clicks on a box", () => {
    it("should mark box with X", () => {});
    it("should enable next box", () => {});
    it("should enable all available boxes when next box is disabled", () => {});
    it("should switch to O player", () => {});
  });
  test("when player O clicks on a box", () => {
    it("should mark box with O", () => {});
    it("should switch to X player", () => {});
  });
  test("when child box has been won by player X", () => {
    it("should mark box with an X", () => {});
    test("when parent box has been won", () => {
      it("should finish the game and declare winner", () => {});
    });
  });
});

describe("when user clicks on a box", () => {
  it("should validate that box is enabled", () => {});
  it("should validate that box is empty", () => {});
  it("should mark box with correct symbol", () => {});
  it("should mark parent box as won", () => {});
  it("should mark game as won if parent box won", () => {});
  it("should set next turn in the right box", () => {});
  it("should enable all available boxes when target box is already finished", () => {});
});

import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

interface MyComponentProps {
  text: string;
}
const MyComponent = ({ text }: MyComponentProps) => <h1>{text}!</h1>;

const Index = () => {
  return (
    <div className="p-2">
      <MyComponent text="Trallalla" />
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});

import { createFileRoute } from "@tanstack/react-router";

interface MyComponentProps {
  text: string;
}
const MyComponent = ({ text }: MyComponentProps) => <h1>{text}!</h1>;

const Index = () => {
  return (
    <div className="p-2">
      <MyComponent text="Home of the Warmachine" />
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});

import { useState, useEffect } from "preact/hooks";

export default function useKeyPress(
  targetKey: string,
  keyDownCallback: () => void = () => {},
  keyUpCallback: () => void = () => {}
): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }: { key: string }): void {
    if (key === targetKey) {
      keyDownCallback();
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: { key: string }): void => {
    if (key === targetKey) {
      keyUpCallback();
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    globalThis.addEventListener("keydown", downHandler);
    globalThis.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      globalThis.removeEventListener("keydown", downHandler);
      globalThis.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

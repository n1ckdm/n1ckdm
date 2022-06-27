import type { Component } from "solid-js";

const App: Component = () => {
  const text = [
    "",
    "     _   __ ____ ______ __ __    __  ___ ___     ____  ______ ____ _   __",
    "    / | / //  _// ____// //_/   /  |/  //   |   / __ \\/_  __//  _// | / /",
    "   /  |/ / / / / /    / ,<     / /|_/ // /| |  / /_/ / / /   / / /  |/ / ",
    "  / /|  /_/ / / /___ / /| |   / /  / // ___ | / _, _/ / /  _/ / / /|  /  ",
    " /_/ |_//___/ \\____//_/ |_|  /_/  /_//_/  |_|/_/ |_| /_/  /___//_/ |_/   ",
    ""
  ];

  return (
    <div class="grid bg-slate-600 h-full grid-cols-1">
      {text.map((line) => (
        // <input
        //   class="flex-grow bg-transparent -my-0.5 text-white focus:outline-none"
        //   value={`${line}`}
        //   readonly
        // />
        <pre>{line}</pre>
      ))}
    </div>
  );
};

export default App;

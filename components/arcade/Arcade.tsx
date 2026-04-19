import { SandTetris } from "./SandTetris";
import { Snake } from "./Snake";

export function Arcade() {
  return (
    <div className="arcade">
      <SandTetris />
      <Snake />
    </div>
  );
}

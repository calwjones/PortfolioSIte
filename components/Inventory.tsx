import { INVENTORY } from "@/content/inventory";

export function Inventory() {
  return (
    <div className="inventory">
      <div className="inv-grid">
        {INVENTORY.map((i, idx) => (
          <div
            key={idx}
            className={`slot-box${i.empty ? " empty" : ""}${i.rare ? " " + i.rare : ""}`}
          >
            {i.g}
            <span className="qty">{i.q || (i.empty ? "—" : "×1")}</span>
            <span className="tip">{i.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

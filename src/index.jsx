import { createRoot } from "react-dom/client";
import "./index.scss";

const donkeyArchiveClient = () => {
  return (
    <div className="donkey-archive">
      <h1>Donkey Archive</h1>
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<donkeyArchiveClient />);

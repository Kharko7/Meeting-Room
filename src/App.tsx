import Button from "./components/button/ButtonComponent";
import "./app.scss";
import Modal from "./components/modal/Modal";
import { useState } from "react";
const App = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);


  return (
    <div className="App">
      <Button
        size="large"
        onclick={() => setOpenModal((prev) => !prev)}
      > Open Modal</Button>

      {openModal && <Modal closeModal={setOpenModal} />}
    </div>
  );
};

export default App;

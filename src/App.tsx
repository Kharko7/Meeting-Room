import Button from "./components/button/ButtonComponent";
import "./app.scss";
import Modal from "./components/modal/Modal";
import { useState } from "react";
const App = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);


  return (
    <div className="App">

      <Button
        label="open modal"
        size="large"
        onclick={() => setOpenModal((prev) => !prev)}
      />

      {openModal && <Modal closeModal={setOpenModal} />}
    </div>
  );
};

export default App;

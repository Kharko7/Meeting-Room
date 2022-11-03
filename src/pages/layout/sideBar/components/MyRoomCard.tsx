import { useState } from "react";
import ActionButton from "../../../../components/icon-button/IconButton";
import styles from "../SideBar.module.scss";
import stylesModal from "./modal.module.scss";
import Modal from "../../../../components/modal/Modal";
import Button from "../../../../components/button";
interface Data {
  mockedData: Array<MyroomsData>;
}
interface MyroomsData {
  name: string;
  equipment: {
    projector: boolean;
    TV: boolean;
  };
  capacity: string;
  date: string;
  endTime: string;
  startTime: string;
}
const MyRoomCard = ({ mockedData }: Data) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      {mockedData.map((_, index) => (
        <div className={styles.roomCardContainer} key={index}>
          <div className={styles.headerRoomCard}>
            <span className={styles.labelRoomName}>
              {mockedData[index].name}
            </span>

            <span>
              <ActionButton
                size="small"
                type="edit"
                onclick={() => setOpenEdit(true)}
              />
              <ActionButton
                mg={true}
                size="small"
                type="delete"
                onclick={() => setOpenDelete(true)}
              />
            </span>
          </div>

          <div className={styles.labelTime}>
            {mockedData[index].date}{"  "}{mockedData[index].startTime}
            {" - "}
             {mockedData[index].endTime}
          </div>

          <div className={styles.roomInfo}>
            {mockedData[index].equipment.projector ? (
              <div className={styles.projectorIco}></div>
            ) : (
              <></>
            )}
            {mockedData[index].equipment.TV ? (
              <div className={styles.tvIco}></div>
            ) : (
              <></>
            )}
            <span className={styles.capacityLabel}>
              {mockedData[index].capacity}
              <div className={styles.membersIco}></div>
            </span>
          </div>
        </div>
      ))}

      {openEdit && <ModalRooms closeModal={setOpenEdit}></ModalRooms>}
      {openDelete && (
        <Modal closeModal={setOpenDelete}>
          <form>
            <h1 className={stylesModal.modalh1}>Delete?</h1>
            <p className={stylesModal.modalp}>
              Are you sure you want to delete this booking?
            </p>
            <div className={stylesModal.modalDeleteButtons}>
              <Button type="submit" styleType="error" onclick={() => {}}>
                Accept
              </Button>
              <Button type="submit" onclick={() => {}}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
export default MyRoomCard;

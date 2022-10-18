import ActionButton from "../../../../components/icon-button/IconButton";
import styles from "../SideBar.module.scss";
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
  time: string;
}
const MyRoomCard = ({ mockedData }: Data) => {
  return (
    <>
      {mockedData.map((_, index) => (
        <div className={styles.roomCardContainer}>
          <div className={styles.headerRoomCard}>
            <span className={styles.labelRoomName}>
              {mockedData[index].name}
            </span>

            <span>
              <ActionButton size="small" type="edit" onclick={() => {}} />
              <ActionButton
                mg={true}
                size="small"
                type="delete"
                onclick={() => {}}
              />
            </span>
          </div>

          <div className={styles.labelTime}>
            {mockedData[index].date} {mockedData[index].time}
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
    </>
  );
};
export default MyRoomCard;

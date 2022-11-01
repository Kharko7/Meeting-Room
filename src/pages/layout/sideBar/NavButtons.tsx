 import { Link } from "react-router-dom";
 import styles from "./navButtons.module.scss";
 import cn from "classnames";
 import { useEffect, useState } from "react";
 const NavButtons = () => {
   const [location, setLocation] = useState(
     window.location.pathname.toString()
   );

   useEffect(() => {}, [location]);
   return (
     <div className={styles.navButton}>
       <Link
         to="/rooms"
         onClick={() => setLocation("/rooms")}
         className={cn(
           styles.link,
           location == "/rooms" && styles.current,
           styles.rooms
         )}
       ></Link>
       <Link
         to="/calendar"
         onClick={() => setLocation("/calendar")}
         className={cn(
           styles.link,
           location == "/calendar" && styles.current,
           styles.calendar
         )}
       ></Link>
       <Link
         to="/map"
         onClick={() => setLocation("/map")}
         className={cn(
           styles.link,
           location == "/map" && styles.current,
           styles.map
         )}
       ></Link>
     </div>
   );
 };
 export default NavButtons;
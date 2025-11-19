// import React from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChartPie,
//   faChartLine,
//   faCalendar,
//   faBook,
//   faBars,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";


// const Sidenav = () => {

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <Sidebar
        
//         backgroundColor="#0C4A6E"
//         style={{ color: "#fff", transition: "all 0.3s ease"}}
//       >
//        <div className="mt-5"></div>

//         <Menu
//           menuItemStyles={{
//             button: ({ active }) => ({
//               backgroundColor: active ? "#27293D" : undefined,
//               color: active ? "00BFFF" : "#FFF",
//               borderRadius: "8px",
//               margin: "4px 8px",
//     "&:hover": {
//       color: "black",
//     },
//             }),
//           }}
//         >
//           <MenuItem icon={<FontAwesomeIcon icon={faCalendar}/>}>
//            <Link to='/dashboard' className="text-white no-underline decoration-0"> Dashboard</Link>
//           </MenuItem>

//           <MenuItem icon={<FontAwesomeIcon icon={faCalendar} />}>
//            <Link to='/seller_management' className="text-white no-underline decoration-0">Seller Management</Link>
//           </MenuItem>

//           <MenuItem icon={<FontAwesomeIcon icon={faCalendar} />}>
//             <Link to='/buyer_management' className="text-white no-underline decoration-0">Buyer</Link>
//           </MenuItem>

//           <MenuItem icon={<FontAwesomeIcon icon={faCalendar} />}>
//             Manage Team
//           </MenuItem>

//           <MenuItem icon={<FontAwesomeIcon icon={faBook} />}>
//             Documentation
//           </MenuItem>

//           <MenuItem icon={<FontAwesomeIcon icon={faCalendar} />}>
//             Calendar
//           </MenuItem>
//         </Menu>
//       </Sidebar>
//     </div>
//   );
// };

// export default Sidenav;


import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <>

      {/* DESKTOP SIDEBAR (vertical) */}
      <div className="hidden md:flex h-screen">
        <Sidebar backgroundColor="#0C4A6E" className="text-white w-64">
          <div className="mt-5" />

          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active ? "#27293D" : undefined,
                color: active ? "00BFFF" : "#FFF",
                borderRadius: "8px",
                margin: "4px 8px",
                "&:hover": { color: "black" },
              }),
            }}
          >
            <MenuItem component={<Link to="/dashboard" />} icon={<FontAwesomeIcon icon={faCalendar} />}>
              Dashboard
            </MenuItem>

            <MenuItem component={<Link to="/seller_management" />} icon={<FontAwesomeIcon icon={faCalendar} />}>
              Seller Management
            </MenuItem>

            <MenuItem component={<Link to="/buyer_management" />} icon={<FontAwesomeIcon icon={faCalendar} />}>
              Buyer
            </MenuItem>

            <MenuItem component={<Link to="/page" />} icon={<FontAwesomeIcon icon={faCalendar} />}>Manage Team</MenuItem>

            <MenuItem component={<Link to="/page" />} icon={<FontAwesomeIcon icon={faBook} />}>
              Documentation
            </MenuItem>

            <MenuItem component={<Link to="/calender" />} icon={<FontAwesomeIcon icon={faCalendar} />}>Calendar</MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/* MOBILE BOTTOM NAVBAR (horizontal) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-sky-900 text-white flex justify-around py-3 shadow-xl z-50">

        <Link to="/dashboard" className="flex flex-col items-center text-sm">
          <FontAwesomeIcon icon={faCalendar} className="text-xl" />
          <span>Dashboard</span>
        </Link>

        <Link to="/seller_management" className="flex flex-col items-center text-sm">
          <FontAwesomeIcon icon={faCalendar} className="text-xl" />
          <span>Seller</span>
        </Link>

        <Link to="/buyer_management" className="flex flex-col items-center text-sm">
          <FontAwesomeIcon icon={faCalendar} className="text-xl" />
          <span>Buyer</span>
        </Link>

        <Link to="/page" className="flex flex-col items-center text-sm">
          <FontAwesomeIcon icon={faBook} className="text-xl" />
          <span>Docs</span>
        </Link>

        <Link to="/calender" className="flex flex-col items-center text-sm">
          <FontAwesomeIcon icon={faCalendar} className="text-xl" />
          <span>Calendar</span>
        </Link>

      </div>
    </>
  );
};

export default Sidenav;

import React, { useState , useContext} from 'react'
import axios from 'axios'
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';




//mock data for the dashboard

const userData={
  name:"John Doe",
  email:"john123@gmail.com",
  role:"Administration"
}
const storeData=[
  {title:'Total users',value:'2,842',change:'+12%',icon:'U'},
  {title:'Total Revenue',value:'$24,751',change:'+18%',icon:'R'},
  {title:'New Order',value:'1,427',change:'-3%',icon:'O'},
  {title:'Support Tickets',value:'56',change:'+4%',icon:'ST'}
];
const recentActivities=[
  {user:'Sara Connor',action:'Placed a New Order',time:'2 min ago'},
   {user:'John Doe',action:'Updated Payment methods',time:'15 min ago'},
    {user:'Pretty Moon',action:'Completed a purchase',time:'32 min ago'},
     {user:'Mike Haisan',action:'Submitted a support ticket',time:'1 hour ago'}
]

const Dashboard=()=>{
   const {theme,handleOnClick}=useContext(ThemeContext);
  const[sidebarOpen,setSidebarOpen]=useState(true);
  const[activepage,setActivePage]=useState('dashboard');

  const toggleSidebar=()=>{
    setSidebarOpen(!sidebarOpen);
  }


  return(
    <>
      <div className={`dashboard-container ${theme==="dark"?"light":"dark"}  ${sidebarOpen?'sidebar-open':'sidebar-collapsed'}`}>

      <div className={`sidebar ${theme==="dark"?"light":"dark"}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          {/* <button className='logout-btn'><Link to='/sign' style={{color:"white",textDecoration:"none"}}>Logout</Link></button> */}
          <button className='sidebar-toggle' onClick={toggleSidebar}>
            █ █ █
          </button>
        </div>
        <nav className='sidebar-nav'>
          <ul>
            <li className={activepage === 'dashboard'?'active':''}>
            <a href="/" onClick={()=>setActivePage('dashboard')}>
              Dashboard
            </a>

            </li>
             <li className={activepage === 'users'?'active':''}>
            <a href="/user" onClick={()=>setActivePage('users')}>
              Users
            </a>

            </li>

            <li className={activepage === 'add_users'?'active':''}>
            <a href="/add_user" onClick={()=>setActivePage('add_users')}>
            Add_Users
            </a>

            </li>

             <li className={activepage === 'orders'?'active':''}>
            <a href="#orders" onClick={()=>setActivePage('orders')}>
              Orders
            </a>

            </li>
             <li className={activepage === 'products'?'active':''}>
            <a href="/product" onClick={()=>setActivePage('products')}>
              Products
            </a>

            </li>
             <li className={activepage === 'setting'?'active':''}>
            <a href="#setting" onClick={()=>setActivePage('setting')}>
              Setting
            </a>

            </li>

            <li className={activepage === 'setting'?'active':''}>
            <a href="/sign" onClick={()=>setActivePage('sign')}>
              Sign-Up
            </a>

            </li>

             <button className={`btn ${theme==="light"? "btn-dark" : "btn-light"} bnt`} onClick={handleOnClick}>Theme-{theme==="dark"?"light":"dark"}</button>

           
          </ul>
        </nav>
      </div>

        {/* MAin Content */}

        <div className={`main-content ${theme==="dark"?"light":"dark"}`}>
        {/* header */}

        <header className='dashboard-header'>
          <div className={`header-left ${theme==="dark"?"light":"dark"}`}>
            <h1>Welcome back, {userData.name}</h1>
          <p>Here's what's happening with your store today </p>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <input type="search" name="" id="" />
            </div>
            <div className="user-menu">
              <div className="user-info">
                <span className={`user-name ${theme==="dark"?"light":"dark"}`}>{userData.name}</span>
                <span className={`user-role ${theme==="dark"?"light":"dark"}`}>{userData.email}</span>
              </div>
              <div className="user-avtar">
                {userData.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Stats Card */}

          <div className="stats-grid">
            {storeData.map((stat,index)=>(
              <div key={index} className={`stat-card ${theme==="dark"?"light":"dark"}`}>
              <div className={`stat-info ${theme==="dark"?"light":"dark"}`}>
              <h3>{stat.value}</h3>
            <p><span> <span className='ic'>{stat.icon}</span> {stat.title}</span>  </p>
              </div>
              <div className={`stat-change ${stat.change.includes("+")?'positive':'negative'}`}>
              {stat.change}

              </div>
              </div>
            ))}
          </div>

            {/* Charts and additional content */}
            <div className="content-grid">

              {/* Chart Section */}

              <div className={`chart-container ${theme==="dark"?"light":"dark"}`}>
                <div className={`chart-header ${theme==="dark"?"light":"dark"}`}>
                  <h3>Revenue Overview</h3>
                  <select defaultValue="last-week">
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-year">Last year</option>
                  </select>
                </div>
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    <div className="bar" style={{height:'60%'}}></div>
                     <div className="bar" style={{height:'45%'}}></div>
                      <div className="bar" style={{height:'75%'}}></div>
                       <div className="bar" style={{height:'50%'}}></div>
                        <div className="bar" style={{height:'65%'}}></div>
                         <div className="bar" style={{height:'80%'}}></div>
                          <div className="bar" style={{height:'70%'}}></div>
                    
                  </div>
                </div>
              </div>
              {/* Recent Activity */}
              <div className={`activity-container ${theme==="dark"?"light":"dark"}`}>
                <div className={`activity-header ${theme==="dark"?"light":"dark"}`}>
                
                   <h3>Recent Activity</h3>
                  <a href="#view-all">View All</a>
                </div>
                 
                  <div className="activity-list">
                  {recentActivities.map((activity,index)=>(
                    <div key={index} className='activity-item'>
                    <div className="activity-avatar">
                      {activity.user.charAt(0)}
                    </div>
                    <div className={`activity-details ${theme==="dark"?"light":"dark"}`}>
                      <p>
                        <span className={`activity-user ${theme==="dark"?"light":"dark"}`}>{activity.user}</span>&nbsp;{activity.action}
                      </p>
                      <span className={`activity-time ${theme==="dark"?"light":"dark"}`}>{activity.time}</span>
                    </div>
                    </div>
                  ))}


                  </div>
                </div>
              </div>
              {/* Additional Section */}

              <div className="additional-section">
                <div className={`quick-actions ${theme==="dark"?"light":"dark"}`}>
                  <h3>Quick Actions</h3>
                  <div className="action-buttons">
                    <button className='action-btn'>
                    Add Product
                    </button>
                    <button className='action-btn'>
                    Generate Report
                    </button>
                    <button className='action-btn'>
                    Send Message
                    </button>
                    <button className='action-btn'>
                    Manage users
                    </button>
                  </div>
                </div>

                  <div className={`upcoming-events ${theme==="dark"?"light":"dark"}`}>
                    <h3>Upcoming Events</h3>
                    <div className="event-item">
                      <div className="event-date">
                        <span className='event-day'>15</span>
                        <span className="event-month">Sep</span>
                      </div>
                      <div className="event-details">
                        <p>Team Meeting</p>
                        <span>10:00 AM-Conferenece Room</span>
                      </div>
                    </div>
                    <div className="event-item">
                      <div className="event-date">
                        <span className="event-day">18</span>
                        <span className="event-month">Sep</span>
                      </div>
                      <div className="event-details">
                        <p>Product Launch</p>
                        <span>2:00 Main Hall</span>
                      </div>
                    </div>
                  </div>

              </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;



import React,{useContext,useEffect,useState} from 'react'
import './Add_User.css'
import { ThemeContext } from '../../context/themeContext';
import axios from 'axios';



const userData={
  name:"John Doe",
  email:"john123@gmail.com",
  role:"Administration"
}

const Add_User = () => {
     const {theme,handleOnClick}=useContext(ThemeContext);
     const[sidebarOpen,setSidebarOpen]=useState(true);
     const[activepage,setActivePage]=useState('dashboard');
     const[state,setState]=useState({
        name:"",
        mob:"",
        email:"",
        address:""
     })

     const[users,setUsers]=useState([]);
     const toggleSidebar=()=>{
    setSidebarOpen(!sidebarOpen);
  }
  
  const handler=(event)=>{
    const{name,value}=event.target;
    setState({...state,[name]:value})
  }
  useEffect(()=>{
    axios.get("http://localhost:3002/user")
    .then((res)=>{
        console.log(res);
        setUsers(res.data);
        
    })
    .then((err)=>{
        console.log(err);
        
    })

  },[])
  const SaveData=(event)=>{
    event.preventDefault();
    axios.post("http://localhost:3002/user",state)
    .then((res)=>{
        console.log(res);
        
    })
    .then((err)=>{
        console.log(err);
        
    })
    event.target.reset();

  }

  return (
    <>
      <div className="user_container">
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
            <a href="/dashboard" onClick={()=>setActivePage('dashboard')}>
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

             <button className={`btn ${theme==="light"? "btn-dark" : "btn-light"} bnt`} onClick={handleOnClick}>Theme-{theme==="dark"?"light":"dark"}</button>

           
          </ul>
        </nav>
      </div>
      {/* header */}
       <div className={`main-content ${theme==="dark"?"light":"dark"}`}>

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

        {/* adduser */}

        <div className="adduser">
            <div className="top">
                <input type="search" className="search" placeholder='Search Users...'/>
                {/* <button>Add User</button> */}


                {/* <!-- Button trigger modal --> */}
<button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
 +Add User
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add New User</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="" onSubmit={SaveData}>
      <div class="modal-body">
      
      <div className="entry"> <input type="text" name="name" id="" onChange={handler} placeholder='Enter Name'/></div>
      <div className="entry"><input type="text" name="mob" id="" onChange={handler} placeholder='Enter Mobile No.'/></div>
      <div className="entry"><input type="text" name="email" id="" onChange={handler} placeholder='Enter Email'/></div>
      <div className="entry"><input type="text" name="address" id="" onChange={handler} placeholder='Enter Address'/></div>
        
        
      </div>
      {/* <div class="modal-footer"> */}
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Add User</button>
      {/* </div> */}
      </form>
    </div>
  </div>
</div>


            </div>
            <table className="table">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Name</th>
      <th scope="col">Mobile No.</th>
      <th scope="col">Email</th>
      <th scope="col">Address 1</th>
      
    </tr>
  </thead>
  <tbody>
  {users.map((data,index)=>(
    <tr key={data.id}>
      <th scope="row" >{index+1}</th>
      <td>{data.name}</td>
      <td>{data.mob}</td>
      <td>{data.email}</td>
      <td>{data.address}</td>
    </tr>
  ))}
    
   
  </tbody>
</table>
        </div>
      </div>
      </div>
    </>
  )
}

export default Add_User

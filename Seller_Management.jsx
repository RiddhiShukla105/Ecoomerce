import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import Sidenav from './Sidenav';
import Nav from './Nav';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Seller_Management = () => {
    const [customers, setCustomers] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
        name: "",
        email: "",
        gst: "",
        mob_num: "",
        b_name: ""
    });

    useEffect(() => {
        axios.get("http://localhost:4004/seller")
        .then((res)=>{
            setCustomers(res.data);
        })
        .catch((error)=>{
            console.log(error)
        })
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:4004/seller/${id}`);
            setCustomers(customers.filter((user) => user._id !== id));
            toast.success("User delted", {
                       position: "top-right",
                       autoClose: 2000,
                     })
        } catch (error) {
            console.log(error);
            toast.error("Error Deleteing User", {
                       position: "top-right",
                       autoClose: 2000,
                     })
        }
    };

    const blockUser = async (id) => {
        try {
            await axios.put(`http://localhost:4004/seller/block/${id}`);
            setCustomers(prev =>
                prev.map((user) =>
                    user._id === id ? { ...user, isBlocked: true } : user
                )
            );
            toast.success("User blocked", {
                       position: "top-right",
                       autoClose: 2000,
                     })
        } catch (error) {
            console.log(error);
            toast.error( "User cannot be blocked", {
                       position: "top-right",
                       autoClose: 2000,
                     })
        }
    };

    const unblockUser = async (id) => {
        try {
            await axios.put(`http://localhost:4004/seller/unblock/${id}`);
            setCustomers(prev =>
                prev.map((user) =>
                    user._id === id ? { ...user, isBlocked: false } : user
                )
            );
            toast.success("User is unblocked", {
                       position: "top-right",
                       autoClose: 2000,
                     })
        } catch (error) {
            console.log(error);
            toast.error("User cannot be unblocked", {
                       position: "top-right",
                       autoClose: 2000,
                     })
        }
    };

    // ========================= Open Edit Form =============================
    const openEditForm = (user) => {
        setSelectedUser(user);
        setShowEdit(true);
    };

    // ========================= Save Edited User =============================
    const saveUser = async () => {
        try {
            await axios.patch(`http://localhost:4004/seller/edit/${selectedUser._id}`, selectedUser);

            setCustomers(prev =>
                prev.map(user =>
                    user._id === selectedUser._id ? selectedUser : user
                )
            );

            setShowEdit(false);
            toast.success("User updated successfully", {
                       position: "top-right",
                       autoClose: 2000,
                     })
        } catch (error) {
            console.log(error);
            toast.error("Error updating user", {
                       position: "top-right",
                       autoClose: 2000,
                     })
        }
    };

    return (
        <>
        <Nav/>
        <div className='flex'>
        <Sidenav />
        <div className="p-6 w-full overflow-hidden">

        <div className="hidden md:block">
    <DataTable
      value={customers}
      paginator
      rows={5}
      stripedRows
      showGridlines
      className="w-full bg-white shadow-xl rounded-2xl border border-gray-200 p-6"
      tableClassName="rounded-2xl"
    >
      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column field="gst" header="GST" />
      <Column field="b_name" header="Business" />
      <Column field="mob_num" header="Contact" />

      <Column
        header="Action"
        body={(user) => (
          <div className="flex gap-4 items-center justify-center">

            {user.isBlocked ? (
              <i
                className="pi pi-lock text-2xl cursor-pointer"
                style={{ color: "red" }}
                onClick={() => unblockUser(user._id)}
              />
            ) : (
              <i
                className="pi pi-lock-open text-2xl cursor-pointer"
                style={{ color: "green" }}
                onClick={() => blockUser(user._id)}
              />
            )}

            <i
              className="pi pi-pencil text-2xl text-blue-600 cursor-pointer"
              onClick={() => openEditForm(user)}
            />

            <i
              className="pi pi-trash text-2xl text-red-600 cursor-pointer"
              onClick={() => deleteUser(user._id)}
            />

          </div>
        )}
      />
    </DataTable>
  </div>

        {/* ========================= EDIT MODAL ============================= */}
        {showEdit && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-xl w-[400px]">
                    <h2 className="text-xl font-bold mb-4">Edit User</h2>

                    <input
                        className="w-full p-2 border mb-2"
                        value={selectedUser.name}
                        onChange={(e) =>
                            setSelectedUser({ ...selectedUser, name: e.target.value })
                        }
                        placeholder="Name"
                    />

                    <input
                        className="w-full p-2 border mb-2"
                        value={selectedUser.email}
                        onChange={(e) =>
                            setSelectedUser({ ...selectedUser, email: e.target.value })
                        }
                        placeholder="Email"
                    />

                    <input
                        className="w-full p-2 border mb-2"
                        value={selectedUser.mob_num}
                        onChange={(e) =>
                            setSelectedUser({ ...selectedUser, mob_num: e.target.value })
                        }
                        placeholder="Mobile"
                    />

                    <input
                        className="w-full p-2 border mb-2"
                        value={selectedUser.gst}
                        onChange={(e) =>
                            setSelectedUser({ ...selectedUser, gst: e.target.value })
                        }
                        placeholder="GST Number"
                    />

                    <input
                        className="w-full p-2 border mb-2"
                        value={selectedUser.b_name}
                        onChange={(e) =>
                            setSelectedUser({ ...selectedUser, b_name: e.target.value })
                        }
                        placeholder="Business Name"
                    />

                    <div className="flex justify-between mt-4">
                        <button
                            className="bg-gray-400 px-4 py-2 rounded text-white"
                            onClick={() => setShowEdit(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className="bg-blue-600 px-4 py-2 rounded text-white"
                            onClick={saveUser}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )}
            {/* ================= MOBILE CARDS ================= */}
  <div className="md:hidden grid gap-4">
    {customers.map((user) => (
      <div
        key={user._id}
        className="bg-white shadow-lg rounded-xl p-4 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-blue-700">{user.name}</h2>

        <div className="mt-3 text-gray-700 space-y-1">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>GST:</strong> {user.gst}</p>
          <p><strong>Business:</strong> {user.b_name}</p>
          <p><strong>Contact:</strong> {user.mob_num}</p>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t">

          {/* Block / Unblock */}
          {user.isBlocked ? (
            <button
              className="px-3 py-1 bg-red-600 text-white rounded-lg"
              onClick={() => unblockUser(user._id)}
            >
              Unblock
            </button>
          ) : (
            <button
              className="px-3 py-1 bg-green-600 text-white rounded-lg"
              onClick={() => blockUser(user._id)}
            >
              Block
            </button>
          )}

          {/* Edit */}
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded-lg"
            onClick={() => openEditForm(user)}
          >
            Edit
          </button>

          {/* Delete */}
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-lg"
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </button>

        </div>
      </div>
    ))}
  </div>
        </div>
        </div>
        </>
    );
};

export default Seller_Management;

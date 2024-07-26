// AccountDialog.js
import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { addAdmin, getAdmins, editAdmin, deleteAdmin } from '../utils/indexedDB';
import './styles/AccountDialog.css';

const AccountDialog = ({ open, onClose, refreshAdminInfo }) => {
  const [newAdmin, setNewAdmin] = useState({ account: '', password: '' });
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle form visibility
  const [adminList, setAdminList] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null); // State to handle editing

  useEffect(() => {
    const fetchAdmins = async () => {
      const admins = await getAdmins();
      setAdminList(admins);
    };

    fetchAdmins();
  }, [open, refreshAdminInfo]);

  if (!open) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingAdmin) {
      await editAdmin({ ...editingAdmin, ...newAdmin });
    } else {
      await addAdmin(newAdmin);
    }
    await refreshAdminInfo(); // Refresh admin info after adding/editing a new admin
    setNewAdmin({ account: '', password: '' }); // Clear the form
    setShowAddForm(false); // Hide the form after submission
    setEditingAdmin(null); // Reset editing state
  };

  const handleEdit = (admin) => {
    setNewAdmin({ account: admin.account, password: admin.password });
    setEditingAdmin(admin);
    setShowAddForm(true);
  };

  const handleDelete = async (adminId) => {
    await deleteAdmin(adminId);
    await refreshAdminInfo(); // Refresh admin info after deleting an admin
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setEditingAdmin(null); // Reset editing state when toggling form
    setNewAdmin({ account: '', password: '' }); // Clear form when toggling
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>Account Details</h2>
        </div>
        <div className="dialog-body">
          {adminList.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminList.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.account}</td>
                    <td>{admin.password}</td>
                    <td>
                      <button className="action-button" onClick={() => handleEdit(admin)}><FaEdit /></button>
                      <button className="action-button" onClick={() => handleDelete(admin.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <FaInfoCircle size={50} />
          )}
          <button onClick={toggleAddForm} className="toggle-form-button">
            {showAddForm ? 'Hide Form' : 'Add New Admin'} <FaPlusCircle />
          </button>
          <div className={`add-admin-form ${showAddForm ? 'show' : ''}`}>
            <h3>{editingAdmin ? 'Edit Admin' : 'Add New Admin'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="account">Account:</label>
                <input
                  type="text"
                  id="account"
                  name="account"
                  value={newAdmin.account}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newAdmin.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="dialog-submit-button">
                {editingAdmin ? 'Update Admin' : 'Add Admin'}
              </button>
            </form>
          </div>
        </div>
        <div className="dialog-footer">
          <button onClick={onClose} className="dialog-close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AccountDialog;

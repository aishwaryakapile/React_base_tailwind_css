import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const formdata = {
  name: '',
  role: ''
}
const EditUser = () => {
  const param = useParams();
  const [userForm, setUserForm] = useState(formdata)
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const userId = param.id === 0 ? "" : param.id;
  const getUserDetails = async () => {
    setEditMode(true);
    try {

      const response = await axios.get(`http://localhost:5178/users/${userId}`)
      const data = response.data;
      setUserForm({
        name: data.name || '',
        role: data.role || ''
      })

    } catch (error) {
      console.log(error)
      setEditMode(false);
    }

  }
  useEffect(() => {
    getUserDetails()
  }, [userId])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((preData) => ({
      ...preData,
      [name]: value

    }))

  }
  const renderItems = (label, name, value, onChange) => (
    <>
      <label className='text-start'>{label}</label>
      <div className='mb-4'>
        <input type="text" className='border border-gray-300 rounded p-2 mb-4 w-[50%]'
          name={name}
          value={value}
          onChange={onChange} /></div>
    </>
  )

  const editUser = async () => {
    const payload = {
      name: userForm.name,
      role: userForm.role
    }
    try {
      const response = await axios.put(`http://localhost:5178/users/${userId}`, payload)
      alert('User updated successfully')
      navigate('/')
      console.log('User updated successfully:', response.data)
    } catch (error) {
      console.log(error)
      alert('Error updating user')
    }

  }

  const addUser = async () => {
    try {

      const response = await axios.post('http://localhost:5178/users', userForm)
      alert('User added successfully')
      navigate('/')
      console.log('User added successfully:', response.data)
    } catch (error) {
      console.log(error)
      alert('Error adding user')
    }
  }

  const backToList = () => {
    navigate('/')
  }
  return (
    <>
      <div className='my-6 text-xl font-bold'>
        {
          editMode ? 'Edit User' : 'Add User'
        }
      </div>
      <div className='flex justify-end'>
            <button className='bg-blue-500 text-white rounded px-4 py-2 flex mx-10 my-5' onClick={backToList}>Back To list</button>
        </div>
      <form>
        <div>
          {renderItems('Name', 'name', userForm.name, handleInputChange)}
        </div>
        <div>
          {renderItems('Role', 'role', userForm.role, handleInputChange)}
        </div>
      </form>
      <button onClick={editMode ? editUser : addUser} className='bg-blue-500 text-white rounded px-4 py-2'>
        {
          editMode ? 'Update User' : 'Add User'
        }
      </button>
    </>

  )
}

export default EditUser
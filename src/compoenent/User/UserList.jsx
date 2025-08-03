import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../style.css'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

const UserList = () => {
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    const fetchUSerData = async () => {
        try {
            const response = await axios.get('http://localhost:5178/users')
            setUserData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUSerData()
    }, [])

    const onEditClick = (item) => {
        console.log('item', item)
        const id = item.id ? item.id : 0;
        navigate(`/editUsers/${id}`)

    }
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5178/users/${id}`)
            fetchUSerData()
        } catch (error) {
            console.log(error)
        }
    }

    const addUser = () => {
        navigate('/addUser')
    }

    return (<>
        <div className='my-6 text-xl font-bold'>User List</div>
        <div className='flex justify-end'>
            <button className='bg-blue-500 text-white rounded px-4 py-2 flex mx-10 my-5' onClick={addUser}>Add User</button>
        </div>
        <div className='border border-black rounded-md p-4 mb-6 mx-10'>
            <div className='userContainer w-full mb-6 font-bold border-b border-black pb-3' >
                <div className='w-[20%]'>User Name</div>
                <div className='w-[20%]'>Role</div>
                <div className='w-[20%]'>Edit</div>
                <div className='w-[20%]'>Delete</div>
            </div>
            {
                userData.length > 0 ?
                    userData.map((item) => (
                        <div className='userContainer w-full mb-6' key={item.id}>
                            <div className='w-[20%]'>{item.name} </div>
                            <div className='w-[20%]'>{item.role} </div>
                            <div className='padding-left w-[20%]' onClick={() => onEditClick(item)}>Edit</div>
                            <div className='padding-left red-text w-[20%]' onClick={() => deleteUser(item.id)}
                            >Delete</div>
                        </div>
                    ))
                    : <div className='w-full text-center'>No User List Found</div>
            }
        </div>

    </>
    )
}

export default UserList
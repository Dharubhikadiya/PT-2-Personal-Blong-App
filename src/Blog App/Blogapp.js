import React, { useState, useEffect } from 'react';
import './Blogapp.css';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBell } from "react-icons/bs";
import { LiaEditSolid } from "react-icons/lia";
import no from './notask.jpg';
import { SlOptions } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Blogapp() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [taskToDelete, setTaskToDelete] = useState(null); 
    const [isWriting, setIsWriting] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    const saveTasksToLocalStorage = (updatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleAddTask = () => {
        const updatedTasks = [...tasks, { title, content }];
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
        setTitle('');
        setContent('');
        setIsWriting(false);
    };

    const handleDeleteTask = () => {
        const updatedTasks = tasks.filter((task, i) => i !== taskToDelete);
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
        toast.success("Blog deleted successfully");
        setShowDeleteModal(false); 
    };

    const handleEditTask = (index) => {
        setEditingTask(index);
        setTitle(tasks[index].title);
        setContent(tasks[index].content);
        setShowModal(true);
    };

    const handleUpdateTask = () => {
        const updatedTasks = tasks.map((task, index) =>
            index === editingTask ? { title, content } : task
        );
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
        setShowModal(false);
        setEditingTask(null);
        setIsWriting(false);
        setTitle('');
        setContent('');
    };

    const confirmDeleteTask = (index) => {
        setTaskToDelete(index);
        setShowDeleteModal(true);
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <header className='bg-white border-bottom px-4 py-1 mb-5'>
                <div className='d-flex justify-content-between align-items-center'>
                    <ul className='d-flex align-items-center list-unstyled mb-0'>
                        <li><h1 className='fw-bold sansita-extrabold'>BLOG</h1></li>
                        <li>
                            <input
                                type='text'
                                placeholder='Search by title or content'
                                className='ms-4 border-0 rounded-4 bg-light p-2'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ fontFamily: 'Sansita', width: '300px' }}

                            />
                        </li>
                    </ul>
                    <ul className='d-flex align-items-center list-unstyled mb-0'>
                        <li className='write-btn'>
                            <span style={{ cursor: 'pointer' }} className='d-flex align-items-center me-4' onClick={() => setIsWriting(!isWriting)}>
                                <LiaEditSolid className='me-2' style={{ fontSize: '25px' }} />
                                Write
                            </span>
                        </li>
                        <li><BsBell className='me-2 fs-5' /></li>
                    </ul>
                </div>
                <div></div>
            </header>

            <div className="container">
                {isWriting && (
                    <div className="search-blog  p-4 mb-5 border-bottom">
                        <div className=''>
                            <div className="mb-3">
                                <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} className='border-0 rounded-4 p-2 fs-1' style={{ fontFamily: 'Sansita' }} />
                            </div>

                            <div className="mb-3 my-4" style={{ marginRight: '190px' }}>
                                <textarea className='border-0 rounded-4 p-2 fs-4' placeholder='Tell Your Story...' value={content} onChange={(e) => setContent(e.target.value)} style={{ fontFamily: 'Sansita' }}></textarea>
                            </div>

                            <div>
                                <Button className='bg-success text-white px-3 py-1 rounded-4 mt-5' style={{ marginLeft: '-330px' }} onClick={handleAddTask} >
                                    Publish
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task, index) => (
                            <div key={index} className="mb-3 d-flex justify-content-center align-items-center">
                                <div className=" d-flex justify-content-between w-75 border-bottom">
                                    <div>
                                        <h5 className="card-title fs-2 sansita-extrabold">{task.title}</h5>
                                        <p className="card-text fs-5 sansita-extrabold fw-light mt-3">{task.content}</p>
                                    </div>
                                    <div>
                                        <span className='more-option' style={{ position: 'relative', cursor: 'pointer' }}>
                                            <SlOptions className='option-icon' />
                                            <div className='dropdown'>
                                                <ul className='list-unstyled bg-dark text-white px-3 rounded-3 py-2'>
                                                    <li className='cursor-pointer mb-1' onClick={() => handleEditTask(index)}>Edit</li>
                                                    <li className='cursor-pointer' onClick={() => confirmDeleteTask(index)}>Delete</li>
                                                </ul>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">
                            <img src={no} width={'18%'} />
                        </div>
                    )}
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Body>
                        <div className="mb-3">
                            <div>
                                <span className='fw-bold fs-2 sansita-extrabold'>Title</span>
                            </div>

                            <input type='text' placeholder='Enter task title' value={title} onChange={(e) => setTitle(e.target.value)} className='border-0 rounded-4 p-2 fs-4 mt-3 w-100' style={{ fontFamily: 'Sansita' }} />
                        </div>

                        <Form.Group className="mb-3">
                            <div>
                                <span className='fw-bold fs-2 sansita-extrabold'>Content</span>
                            </div>
                            <input type='text' placeholder='Enter task content' value={content} onChange={(e) => setContent(e.target.value)} className='border-0 rounded-4 p-2 fs-4 mt-3 w-100' style={{ fontFamily: 'Sansita' }} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-start'>
                        <Button variant="danger" onClick={() => setShowModal(false)}>
                            <span style={{ fontFamily: 'Sansita' }}>Cancel</span>
                        </Button>
                        <Button variant="success" className='sansita-extrabold' onClick={handleUpdateTask}>
                            <span style={{ fontFamily: 'Sansita' }}>Save</span>
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Body>
                        <h5 className='fw-bold sansita-extrabold fs-3'>Are you sure you want to delete this blog?</h5>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-start'>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            <span style={{ fontFamily: 'Sansita' }}>Cancel</span>
                        </Button>
                        <Button variant="danger" onClick={handleDeleteTask}>
                            <span style={{ fontFamily: 'Sansita' }}>Delete</span>
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <ToastContainer />
        </div>
    );
}

export default Blogapp;

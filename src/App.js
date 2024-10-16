import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './login';

const App = () => {
    const [activeSection, setActiveSection] = useState('login');
    const [employees, setEmployees] = useState([]);

    // Fetch employees from server
    useEffect(() => {
        fetch('http://localhost:5000/employees')
            .then((res) => res.json())
            .then((data) => setEmployees(data))
            .catch((err) => console.error(err));
    }, []);

    const showSection = (sectionId) => {
        setActiveSection(sectionId);
    };

    const addEmployee = (employee) => {
        fetch('http://localhost:5000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        })
            .then((res) => res.json())
            .then((newEmployee) => {
                setEmployees([...employees, newEmployee]);
                showSection('employee');
            })
            .catch((err) => console.error('Error adding employee:', err));
    };

    const deleteEmployee = (id) => {
        fetch(`http://localhost:5000/employees/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setEmployees(employees.filter((emp) => emp._id !== id));
            })
            .catch((err) => console.error('Error deleting employee:', err));
    };

    return (
        <div className="app-container">
            <nav>
                <h2>Admin Dashboard</h2>
                <ul>
                    <li><a href="#" onClick={() => showSection('dashboard')}>Dashboard</a></li>
                    <li><a href="#" onClick={() => showSection('employee')}>Manage Employees</a></li>
                    <li><a href="#" onClick={() => showSection('payroll')}>Payroll</a></li>
                    <li><a href="#" onClick={() => showSection('performance')}>Performance Management</a></li>
                    <li><a href="#" onClick={() => showSection('leave')}>Leave Management</a></li>
                    <li><a href="#" onClick={() => showSection('login')}>Logout</a></li>
                </ul>
            </nav>

            <main>
            <Section id="login" active={activeSection === 'login'}>
                    <h2>Login</h2>
                    <form>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Login</button>
                    </form>
                </Section>

                <Section id="dashboard" active={activeSection === 'dashboard'}>
                    <h3>Welcome to the HR Management System</h3>
                    <p>Select an option from the menu to get started.</p>
                    <div className="card-container">
                        <Card title="View Available Jobs" onClick={() => alert('Viewing available jobs...')} />
                        <Card title="View Employee Attendance" onClick={() => alert('Viewing employee attendance...')} />
                        <Card title="Take Skill Assessments" onClick={() => alert('Taking skill assessments...')} />
                        <Card title="View Assessment Grades" onClick={() => alert('Viewing assessment grades...')} />
                    </div>
                    <h3 style={{marginTop:"30px"}}>Working Projects</h3>
                    <div>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>Project Title</th>
                                    <th>Project Id</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HR Management System</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>Attendance Tracker</td>
                                    <td>2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Section>

                <Section id="employee" active={activeSection === 'employee'}>
                    <h3>Employee Management</h3>
                    <a href="#" onClick={() => showSection('addEmployee')} className="btn">Add Employee</a>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.salary}</td>
                                    <td>
                                        <a href="#" onClick={() => showSection('editEmployee')}>Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <a href="#" onClick={() => deleteEmployee(emp._id)}>Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Section>

                <Section id="addEmployee" active={activeSection === 'addEmployee'}>
                    <h3>Add Employee</h3>
                    <EmployeeForm onAddEmployee={addEmployee} />
                </Section>
                <Section id="editEmployee" active={activeSection === 'editEmployee'}>
                    <h3>Edit Employee</h3>
                    {/* Edit Employee form logic can go here */}
                </Section>

                <Section id="payroll" active={activeSection === 'payroll'}>
                    <h3>Payroll Management</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Monthly Salary</th>
                                <th>Bonus</th>
                                <th>Total Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td>{emp.name}</td>
                                    <td>{emp.salary}</td>
                                    <td>$500</td> {/* Example bonus */}
                                    <td>{parseFloat(emp.salary.replace('$', '')) + 500}</td> {/* Total Salary Example */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Section>

                <Section id="performance" active={activeSection === 'performance'}>
                    <h3>Performance Management</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Performance Reviews</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td>{emp.name}</td>
                                    <td>{emp.performance.length} Review(s)</td>
                                    <td>
                                        <a href="#" onClick={() => showSection('addReview')}>Add Review</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <img src="https://assets.visme.co/templates/banners/thumbnails/i_Employee-Performance-Gauge-Chart_full.jpg" alt="Graph 1" />
                    <h3 style={{marginTop:"30px"}}>Profile Analytics</h3>
                    <div>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Software Engineer</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>HR Manager</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>Designing</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>System Testing</td>
                                    <td>12</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                        <img src="https://www.researchgate.net/profile/Sola-Fajana/publication/289459719/figure/fig1/AS:990436722212864@1613149924324/A-graph-showing-the-linear-relationship-between-job-performance-and-motivation-in.png" alt="Graph 2" />
                </Section>

                <Section id="leave" active={activeSection === 'leave'}>
                    <h3>Leave Management</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Leave Requests</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td>{emp.name}</td>
                                    <td>{emp.leaves.length} Leave(s)</td>
                                    <td>
                                        <a href="#" onClick={() => showSection('addLeave')}>Add Leave</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Section>

                <Section id="addReview" active={activeSection === 'addReview'}>
                    <h3>Add Performance Review</h3>
                    {/* Add Review Form logic can go here */}
                </Section>

                <Section id="addLeave" active={activeSection === 'addLeave'}>
                    <h3>Add Leave Request</h3>
                    {/* Add Leave Request Form logic can go here */}
                </Section>

                <Section id="profile" active={activeSection === 'profile'}>
                    <h3>Profile Analytics</h3>
                    <div>
                        <img src="images/graph.png" alt="Graph 1" />
                        <img src="images/graph2.png" alt="Graph 2" />
                        <table>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Software Engineer</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>HR Manager</td>
                                    <td>5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Section>

            </main>
        </div>
    );
};

const Section = ({ id, active, children }) => {
    return (
        <div id={id} className={`section ${active ? 'active' : ''}`}>
            {children}
        </div>
    );
};

const Card = ({ title, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <h4>{title}</h4>
        </div>
    );
};

const EmployeeForm = ({ onAddEmployee }) => {
    const [formData, setFormData] = useState({ name: '', email: '', salary: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEmployee(formData);
        setFormData({ name: '', email: '', salary: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
            <input type="text" name="salary" placeholder="Salary" required value={formData.salary} onChange={handleChange} />
            <button type="submit">Add Employee</button>
        </form>
    );
};

export default App;

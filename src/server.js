const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  salary: String,
  performance: Array,
  leaves: Array,
});

const Employee = mongoose.model('Employee', employeeSchema);

app.use(cors());
app.use(express.json());

// Get all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new employee
app.post('/employees', async (req, res) => {
    try {
      const newEmployee = new Employee(req.body);
      await newEmployee.save();
      res.status(201).json(newEmployee); // Ensure JSON response
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Delete employee by ID
app.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

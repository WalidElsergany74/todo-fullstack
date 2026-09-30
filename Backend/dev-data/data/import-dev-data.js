const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Todo = require('../../models/TodoModel');

// Load environment variables
const configPath = path.resolve(__dirname, '../../config.env');
dotenv.config({ path: configPath });

const DB = process.env.DATABASE
  ? process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
  : process.env.DATABASE_LOCAL;

mongoose
  .connect(DB)
  .then(() => console.log('✅ DB connection successful for Data Seeder!'))
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });

// Read JSON File (100 Todos)
const todosPath = path.resolve(__dirname, 'todos.json');
const todos = JSON.parse(fs.readFileSync(todosPath, 'utf-8'));

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Todo.create(todos);
    console.log(`🎉 Successfully loaded ${todos.length} Todos into the database!`);
  } catch (err) {
    console.error('❌ Error importing data:', err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DATABASE
const deleteData = async () => {
  try {
    await Todo.deleteMany();
    console.log('🗑️ All Todos successfully deleted from the database!');
  } catch (err) {
    console.error('❌ Error deleting data:', err);
  }
  process.exit();
};

// Handle CLI flags
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log(`
ℹ️ Usage Instructions:
  - To seed 100 fake todos:   node dev-data/data/import-dev-data.js --import
  - To delete all todos:      node dev-data/data/import-dev-data.js --delete
  `);
  process.exit();
}

"use client";

import React, { useEffect } from "react";
import { useLocalObservable, observer } from "mobx-react-lite";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import TodoCount from "./TodoCount";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

interface Todo {
  id: string;
  text: string;
  description: string;
  completed: boolean;
}

const style = {
  // Styles...
  bg: `p-4 bg-dark-mode bg-no-repeat bg-cover bg-center`,
  container: `bg-dark-table min-h-screen max-w-[100vw] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-300 p-2`,
  form: `flex flex-col md:flex-row gap-2 md:gap-4`,
  input: `bg-gray-200 p-2 w-full md:w-3/4 text-xl text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
  button: `p-4 ml-2 bg-purple-500 text-slate-100 rounded hover:bg-purple-600 transition-colors duration-300`,
  count: `text-center p-2 text-white`,
  table: `table w-full mt-8`,
  tableHeader: `bg-table-head text-black font-bold uppercase text-sm p-2`,
  tableRow: `border-b`,
  tableCell: `p-4 text-white text-center items-center justify-center break-all `,
  tableActions: `flex items-center justify-center`,
  editButton: `p-2 ml-2 text-blue-500 hover:scale-125`,
  deleteButton: `p-2 ml-2 text-red-500 hover:scale-125`,
  modal: `fixed top-0 left-0 w-full h-full flex items-center justify-center`,
  modalContent: `bg-gray-700 rounded-lg p-4 max-w-md w-full`,
  modalHeader: `flex items-center justify-between mb-4 text-black`,
  modalTitle: `text-lg font-bold`,
  modalCloseButton: `text-red-600 hover:text-red-800`,
  modalBody: `mb-4 text-black`,
  modalActions: `flex justify-end`,
};

const TodoList: React.FC = observer(() => {
  const todoStore = useLocalObservable(() => ({
    todos: [] as Todo[],
    input: "",
    description: "",
    completed: false,
    editMode: false,
    editTodoId: "",
    showEditModal: false,
    showDeleteModal: false,
    deleteTodoId: "",

    clearInputs() {
      this.input = "";
      this.description = "";
      this.completed = false;
    },

    createOrUpdateTodo() {
      if (!this.input) {
        alert("Please enter a valid todo");
        return;
      }

      if (this.editMode) {
        const updatedTodos = this.todos.map((todo) => {
          if (todo.id === this.editTodoId) {
            return {
              ...todo,
              text: this.input,
              description: this.description,
            };
          }
          return todo;
        });
        this.todos = updatedTodos;
        this.editMode = false;
        this.editTodoId = "";
        this.showEditModal = false;
      } else {
        const newTodo: Todo = {
          id: String(Date.now()),
          text: this.input,
          description: this.description,
          completed: this.completed,
        };
        this.todos.push(newTodo);
      }
      this.clearInputs();
      this.saveTodosToLocalStorage(); // Save the todos to localStorage after modification
    },

    editTodo(id: string) {
      const todoToEdit = this.todos.find((todo) => todo.id === id);
      if (todoToEdit) {
        this.editMode = true;
        this.editTodoId = todoToEdit.id;
        this.input = todoToEdit.text;
        this.description = todoToEdit.description;
        this.completed = todoToEdit.completed;
        this.showEditModal = true;
      }
    },

    deleteTodo(id: string) {
      this.deleteTodoId = id;
      this.showDeleteModal = true;
    },

    confirmDeleteTodo() {
      const updatedTodos = this.todos.filter(
        (todo) => todo.id !== this.deleteTodoId
      );
      this.todos = updatedTodos;
      this.showDeleteModal = false;
      this.saveTodosToLocalStorage(); // Save the todos to localStorage after deletion
    },

    closeModal() {
      this.showEditModal = false;
      this.showDeleteModal = false;
      this.clearInputs();
    },

    toggleCompletion(id: string) {
      const updatedTodos = this.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      this.todos = updatedTodos;
      this.saveTodosToLocalStorage(); // Save the todos to localStorage after completion toggle
    },

    get todoText() {
      return this.todos.length === 1 ? "task" : "tasks";
    },

    loadTodosFromLocalStorage() {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    },

    saveTodosToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  }));

  useEffect(() => {
    todoStore.loadTodosFromLocalStorage();
  }, []);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Task Management App</h3>
        <TodoForm
          input={todoStore.input}
          description={todoStore.description}
          editMode={todoStore.editMode}
          onInputChange={(value) => (todoStore.input = value)}
          onDescriptionChange={(value) => (todoStore.description = value)}
          onSave={todoStore.createOrUpdateTodo}
        />
        <div className="overflow-x-auto">
          <table className={style.table}>
            <thead>
              <tr>
                <th className={style.tableHeader}>#</th>
                <th className={style.tableHeader}>Tasks</th>
                <th className={style.tableHeader}>Description</th>
                <th className={style.tableHeader}>Status</th>
                <th className={style.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todoStore.todos.map((todo: TodoItem, index: number) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onToggleCompletion={todoStore.toggleCompletion}
                  onEdit={todoStore.editTodo}
                  onDelete={todoStore.deleteTodo}
                />
              ))}
            </tbody>
          </table>
        </div>
        {todoStore.todos.length > 0 && (
          <TodoCount todoCount={todoStore.todos.length} />
        )}
        {todoStore.showEditModal && (
          <EditModal
            input={todoStore.input}
            description={todoStore.description}
            onInputChange={(value: string) => (todoStore.input = value)}
            onDescriptionChange={(value: string) =>
              (todoStore.description = value)
            }
            onSave={todoStore.createOrUpdateTodo}
            onCancel={todoStore.closeModal}
          />
        )}
        {todoStore.showDeleteModal && (
          <DeleteModal
            onConfirm={todoStore.confirmDeleteTodo}
            onCancel={todoStore.closeModal}
          />
        )}
      </div>
    </div>
  );
});

export default TodoList;

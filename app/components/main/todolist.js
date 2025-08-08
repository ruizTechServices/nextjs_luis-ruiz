import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createClient } from '../../../lib/utils/supabase/supabaseClient';

const TodoList = () => {
    const supabase = useMemo(() => createClient(), []);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Fetch todos from the database
    const fetchTodos = useCallback(async () => {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.log('Error fetching todos:', error);
        } else {
            setTodos(sortTodos(data || [])); // Ensure data is sorted
        }
    }, [supabase]);

    // Function to sort todos by completion status
    const sortTodos = (todos) => {
        return todos.sort((a, b) => (a.is_completed === b.is_completed ? 0 : a.is_completed ? 1 : -1));
    };

    // Add a new todo to the database
    const addTodo = async (description) => {
        const { data, error } = await supabase
            .from('todos')
            .insert([{ description }])
            .single();

        if (error) {
            console.log('Error adding todo:', error);
        } else if (data) {
            setTodos(prev => sortTodos([data, ...prev]));
        }
    };

    // Toggle todo completion
    const toggleCompletion = async (id, isCompleted) => {
        const { data, error } = await supabase
            .from('todos')
            .update({ is_completed: !isCompleted })
            .match({ id })
            .single();

        if (error) {
            console.log('Error updating todo:', error);
        } else if (data) {
            setTodos(prev => sortTodos(prev.map(todo => {
                if (todo.id === id) return { ...todo, is_completed: !todo.is_completed };
                return todo;
            })));
        }
    };

    // Subscribe to realtime updates from the Supabase database
    useEffect(() => {
        const allChanges = supabase
            .channel('custom-all-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, payload => {
                console.log('Change received!', payload);
                fetchTodos();  // Refresh todos on any change
            })
            .subscribe();

        // Cleanup function to unsubscribe
        return () => {
            supabase.removeChannel(allChanges);
        };
    }, [supabase, fetchTodos]);

    // Handle new todo input change
    const handleNewTodoChange = (event) => {
        setNewTodo(event.target.value);
    };

    // Handle new todo form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (newTodo.trim() !== '') {
            addTodo(newTodo.trim());
            setNewTodo('');
        }
    };

    // Load todos on component mount
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Add new todo"
                    value={newTodo}
                    onChange={handleNewTodoChange}
                    className='border-2 border-gray-300 rounded-md p-2 w-full'
                />
                <button className='w-20 rounded-lg bg-blue-300 px-2 mx-2' type="submit">Add</button>
            </form>
            <ul className='container mx-auto w-auto flex flex-col gap-5 overflow-y-scroll h-96'>
                {todos.map(todo => (
                    <li className="py-2" key={todo.id} style={{ textDecoration: todo?.is_completed ? 'line-through' : 'none' }}>
                        {todo.description}
                        <button className='bg-blue-300 rounded-lg mx-2 px-2' onClick={() => toggleCompletion(todo.id, todo?.is_completed)}>
                            {todo?.is_completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

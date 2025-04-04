package com.example.taskmanager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Autowired
    private UserRepository userRepository;

    public Task createTask(Task task) {
        // Extract the user ID from the incoming task
        Long userId = task.getUser() != null ? task.getUser().getId() : null;

        if (userId != null) {
            // Fetch the full user entity from the database
            User user = userRepository.findById(userId).orElseThrow(() ->
                    new RuntimeException("User not found with ID: " + userId)
            );

            // Attach the real user entity to the task
            task.setUser(user);
        } else {
            throw new RuntimeException("User ID must be provided");
        }

        return taskRepository.save(task);
    }



    public Task updateTask(Long id, Task updatedTask) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setDueDate(updatedTask.getDueDate());
            task.setPriority(updatedTask.getPriority());
            task.setStatus(updatedTask.getStatus());
            return taskRepository.save(task);
        }
        return null;
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }


}

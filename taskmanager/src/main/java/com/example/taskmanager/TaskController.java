package com.example.taskmanager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    public TaskController() {
        System.out.println("🚀 TaskController loaded!");
    }

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;

    @PostMapping
    public Task createTask(@RequestBody TaskRequest request) {
        User user = userRepository.findById(request.userId).orElseThrow(() ->
                new RuntimeException("User not found with ID: " + request.userId)
        );

        Task task = new Task();
        task.setTitle(request.title);
        task.setDescription(request.description);
        task.setPriority(request.priority);
        task.setStatus(request.status);
        task.setDueDate(LocalDate.parse(request.dueDate));
        task.setUser(user);

        return taskRepository.save(task);
    }



    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/users/{userId}/tasks")
    public List<Task> getTasksForUser(@PathVariable Long userId) {
        return taskService.getTasksByUserId(userId);
    }
    

}

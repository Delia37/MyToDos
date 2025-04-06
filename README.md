# 📋 MyToDos

MyToDos is a full-stack task management application built with Spring Boot (Java) on the backend and React on the frontend. It allows users to register, log in, manage tasks, send and accept friend requests, and edit profile information. It's designed with collaboration in mind, enabling team productivity through shared tasks.

## 🚀 Features

- ✅ Register / Login system
- 🗂️ Create, update, and delete tasks
- 📅 Sort tasks by due date or priority
- 🔔 Friend system (send, accept, reject requests)
- 👥 View and manage friends
- 👤 User profile with username, description, and password editing
- 📬 Notifications for pending friend requests

---

## 🧑‍💻 Tech Stack

**Frontend**: React  
**Backend**: Spring Boot (Java)  
**Database**: PostgreSQL  
**Styling**: Inline CSS + Flexbox  
**ORM**: Spring Data JPA

---

## 🖼️ Screenshots

### 🔐 Login & Register
![Login Page](screenshots/login.jpeg)

---

### 📝 Add Task
![Add Task](screenshots/add_task.jpeg)

---

### 🧾 View Tasks
![My Tasks](screenshots/my_tasks.jpeg)

---

### 🤝 Send Friend Request
![Send Request](screenshots/friend_request_send.jpeg)

---

### 🛎️ Receive Friend Request
![Receive Request](screenshots/friend_request_receive.jpeg)

---

### 👤 My Profile
![My Profile](screenshots/my_profile.jpeg)

---

## 🛠️ Setup Instructions

### 1. Database (PostgreSQL)

1. Make sure PostgreSQL is installed and running.
2. Open a terminal or pgAdmin and run:
    ```sql
    CREATE DATABASE taskmanager;
    ```
3. Optionally, seed the database with some users and tasks:
    ```sql
    INSERT INTO app_user (email, password, username, description)
    VALUES 
      ('bob@example.com', 'password123', 'Bob', 'Let\'s build something'),
      ('lola@example.com', 'password123', 'Lola', 'Loves productivity'),
      ('andrew@example.com', 'password123', 'Andrew', 'Just chilling');
    ```

---

### 2. Backend Setup (Spring Boot)

1. Clone the repo:
    ```bash
    git clone https://github.com/your-username/mytodos.git
    cd mytodos/backend
    ```

2. Update `application.properties` with your PostgreSQL credentials:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager
    spring.datasource.username=your_username
    spring.datasource.password=your_password

    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    ```

3. Run the Spring Boot app:
    - In your IDE: run `TaskManagerApplication.java`
    - Or from terminal:
      ```bash
      ./mvnw spring-boot:run
      ```

---

### 3. Frontend Setup (React)

```bash
cd ../frontend
npm install
npm start

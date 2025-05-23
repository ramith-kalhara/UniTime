# UniTime – AI-Powered Academic Scheduling Platform

UniTime is a web-based academic learning and scheduling platform developed using **Spring Boot** and **React** with a **MySQL** database. It allows academic administrators to manage professors, courses, rooms, and schedules effectively while providing a modern and intelligent scheduling solution.

## 🚀 Project Overview

UniTime is designed to streamline academic scheduling by combining traditional admin tools with smart features powered by AI. It enables the university admin to manage professor assignments, schedule lectures/labs, and allocate rooms efficiently. Students can view courses, enroll in them, and vote for preferred professors to guide AI-driven decision-making.

## 🧠 AI-Powered Novelty Feature – Smart Scheduling with Professor Voting

Implemented as a microservice using Python (scikit-learn) integrated with the core Spring Boot backend. This novelty introduces intelligent automation to academic scheduling.

### 🔍 Features:
- **Student Voting System**: Students vote for their preferred professors per course.
- **AI-Powered Professor Selection**: Balances student preferences and current workloads to recommend the most suitable professor.
- **AI-Driven Room Allocation**: Automatically assigns rooms based on capacity, type (Lab/Lecture Hall), and required facilities (e.g., projector, computer).
- **Conflict-Free Scheduling**: Checks for professor, student, and room availability before suggesting time slots.
- **Automated Notifications**: Sends schedule updates via email to students and professors upon finalization.

---

## 🛠️ Technologies Used

### Backend:
- **Spring Boot**
- **Java**
- **MySQL**
- **Python (AI Microservice)**
- **scikit-learn**
- **Flask** – Python REST API

### Frontend:
- **React.js**
- **Axios**
- **React Router**
- **SweetAlert2**

---

## ⚙️ Getting Started

### 📋 Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [Python 3.8+](https://www.python.org/)
- [Java 17+](https://adoptium.net/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

---

## 🚦 How to Run the Project

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/your-username/UniTime.git](https://github.com/ramith-kalhara/UniTime.git
cd UniTime



🖥️ 2. Start the Frontend (React)

cd frontend/UniTime
npm install
npm run dev



🧠 3. Set Up the AI Microservice (Python)

cd ../../ai_scheduler

a. (Optional) Create a virtual environment
python -m venv venv
venv\Scripts\activate       # Windows
# OR
source venv/bin/activate    # Linux/Mac


b. Install dependencies
pip install -r requirements.txt

c. Train the AI model
python train_time_slot_model.py

d. Start the Flask API
cd app
python app.py


☕ 4. Start the Backend (Spring Boot)
Open the backend folder in IntelliJ IDEA.
Configure database in src/main/resources/application.properties:


spring.datasource.username=root
spring.datasource.password=yourpassword








# Online Fire NOC Issuance System

## 📌 Project Overview
The **Online Fire NOC Issuance System** is a web-based platform that allows citizens to apply for a Fire No Objection Certificate (NOC) online. Applicants can track their application status and download approved NOC documents by scanning a QR code.

## 🚀 Features
- **User Registration & Login** (Citizens, Admins)
- **Online NOC Application Submission**
- **Admin Verification & Approval Process**
- **Automatic QR Code Generation for Approved NOCs**
- **Download & Access NOCs via QR Code**
- **Admin Panel for Managing Applications**

## 🛠️ Tech Stack
### **Frontend:**
- React.js / Next.js (for UI development)
- Tailwind CSS / Bootstrap (for styling)

### **Backend:**
- Node.js (Express.js for API)
- MySQL (for database storage)

## 🔧 Installation & Setup
### **1. Clone the repository**
```bash
git clone https://github.com/your-repo/fire-noc-system.git
cd fire-noc-system
```

### **2. Backend Setup**
```bash
cd backend
npm install
```

- Create a `.env` file and add MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=fire_noc_db
```

- Run the backend server:
```bash
node server.js
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
npm start
```

## 📜 License
This project is licensed under the MIT License.


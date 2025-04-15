
# NextDoor Backend Project

This project contains the backend of the NextDoor application.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Create a `.env` File

In the **root of the project**, create a file named `.env` with the following structure:

```env
DB_SERVER=           # e.g., localhost
DB_DATABASE=         # e.g., nextDoorDB
DB_PORT=             # e.g., 1433
DB_USER=             # e.g., your_sql_user
DB_PASSWORD=         # e.g., your_password
```

> ⚠️ Make sure your SQL Server instance has TCP/IP enabled and is listening on the specified port.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Project

```bash
node index.js
```

---

## ✅ Notes

- Ensure that your SQL Server instance is accessible via TCP/IP.
- The user specified in `.env` must have permission to access the target database.
- This setup is intended for local development.

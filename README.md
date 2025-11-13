# 🖼️ AI Image Generator (MERN)

A full-stack **AI Image Generation** application built using the **MERN** stack.  
Users can enter text prompts to generate high-quality AI images, save them, and manage their history.

---

## 🚀 Features

### 🔹 Frontend
- React + Vite
- Clean and responsive UI
- Prompt input with loader animation
- Gallery view for generated images
- One-click download
- Modern UI with Tailwind CSS

### 🔹 Backend
- Node.js + Express REST API
- AI image generation endpoint
- Input validation and safe request handling
- Configurable AI model provider (OpenAI / Stability / Replicate)

### 🔹 Database
- MongoDB + Mongoose for storing prompts, generated images, timestamps

---

## 🛠️ Tech Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| Frontend     | React, Vite, Tailwind CSS     |
| Backend      | Node.js, Express.js           |
| Database     | MongoDB, Mongoose             |
| AI Provider  | OpenAI / Stability / Replicate |

---

## 📂 Project Structure

    ImageGenerator/
    │
    ├── client/               # React frontend
    │   ├── src/
    │   ├── public/
    │   └── vite.config.js
    │
    ├── server/               # Node.js backend
    │   ├── controllers/
    │   ├── routes/
    │   ├── models/
    │   ├── config/
    │   └── index.js
    │
    ├── .env                  # Environment variables
    ├── package.json
    └── README.md

---

## ⚙️ Environment Variables

Inside `server/.env`, add:

    OPENAI_API_KEY=your_api_key_here
    MONGO_URI=your_mongodb_connection_string
    PORT=5000

---

## ▶️ Running the Project Locally

### 1. Clone the repo

    git clone https://github.com/SuryaanshDev/ImageGenerator.git
    cd ImageGenerator

### 2. Run the frontend

    cd client
    npm install
    npm run dev

### 3. Run the backend

    cd ../server
    npm install
    npm start

Frontend: http://localhost:5173  
Backend: http://localhost:5000

---

## 🧠 API Endpoints

### POST `/api/generate`  
Generate an image from a prompt.

**Request Body:**

    {
      "prompt": "a futuristic city at night"
    }

---

## 📸 Example Outputs

| Prompt | Result |
|--------|--------|
| "cyberpunk street in rain" | 🖼️ AI image |
| "ancient forest temple"    | 🖼️ AI image |

*(Add your own images here.)*

---

## 📦 Build for Production

### Frontend

    cd client
    npm run build

### Backend (optional)

    cd server
    pm2 start index.js

---

## 🌐 Deployment

- **Frontend:** Vercel / Netlify  
- **Backend:** Render / Railway / VPS  
- **Database:** MongoDB Atlas  

---

## 🤝 Contributing

Pull requests are welcome.  
For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License.

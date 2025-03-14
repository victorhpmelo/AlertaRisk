import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import MapView from "./components/MapView"
import PostForm from "./components/PostForm"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/postagem" element={<PostForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App


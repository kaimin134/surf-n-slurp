import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateReview } from "./pages/create-review";
import { SavedReviews } from "./pages/saved-reviews";
import { Navbar } from "./components/navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="/saved-reviews" element={<SavedReviews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

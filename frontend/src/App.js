import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import MyNotes from "./screens/MyNotes/MyNotes";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import SingleNote from "./screens/SingleNote/SingleNote";
import CreateNote from "./screens/createNote/CreateNote";
import LandingPage from "./screens/landingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./screens/Profile/Profile";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <BrowserRouter>
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/sign-up" element={<RegisterScreen />} />
            <Route exact path="/create-note" element={<CreateNote />} />
            <Route exact path="/note/:id" element={<SingleNote />} />
            <Route
              exact
              path="/mynotes"
              element={<MyNotes search={search} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

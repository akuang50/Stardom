import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Shared/Layout";
import { Career } from "./pages/Career";
import { Concert } from "./pages/Concert";
import { CreateGroup } from "./pages/CreateGroup";
import { Explore } from "./pages/Explore";
import { Group } from "./pages/Group";
import { Home } from "./pages/Home";
import { SongStudio } from "./pages/SongStudio";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateGroup />} />
        <Route path="/group" element={<Group />} />
        <Route path="/song" element={<SongStudio />} />
        <Route path="/concert" element={<Concert />} />
        <Route path="/career" element={<Career />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

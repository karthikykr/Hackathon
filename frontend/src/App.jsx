import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import QuestionManagement from "./components/QuestionManagement";
// import QuestionGeneration from "./QuestionGeneration";
// import DownloadQP from "./DownloadQP";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="questions" element={<QuestionManagement />} />
          {/* <Route path="generate-question" element={<QuestionGeneration />} />
          <Route path="download-qp" element={<DownloadQP />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
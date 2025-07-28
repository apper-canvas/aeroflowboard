import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import BoardView from "@/components/pages/BoardView";
import TimelineView from "@/components/pages/TimelineView";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<BoardView />} />
            <Route path="/project/:projectId" element={<BoardView />} />
            <Route path="/project/:projectId/timeline" element={<TimelineView />} />
            <Route path="/timeline" element={<TimelineView />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="toast-container"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;
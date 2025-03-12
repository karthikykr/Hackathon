import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import QuestionManagement from './components/QuestionManagement';
import { AuthProvider } from './AuthProvider';
import Login from './components/Login';
import QuestionGeneration from './components/QuestionGeneration';
import UserProfile from './components/UserProfile';
// import DownloadQP from "./DownloadQP";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Dashboard />}>
                        <Route
                            path='questions'
                            element={<QuestionManagement />}
                        />
                        <Route
                            path='generate-question'
                            element={<QuestionGeneration />}
                        />
                        {/* <Route path='download-qp' element={<DownloadQP />} /> */}
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/profile' element={<UserProfile />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

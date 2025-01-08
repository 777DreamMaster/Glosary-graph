import {Navigate, Route, Routes} from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import Glossary from "./pages/glossary/Glossary";
import SemanticGraph from "./pages/semantic-graph/SemanticGraph";

export const App = () => (
    <Routes>
        <Route path="/glossary" element={<Glossary/>}/>
        <Route path="/semantic-graph" element={<SemanticGraph/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="*" element={<Navigate to="/glossary" replace />}/>
    </Routes>
);

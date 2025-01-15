import { Routes, Route, useParams } from 'react-router-dom';
import Home from './Pages/Home';
import TemplateSelection from './Pages/TemplateSelection';
import { e1, e2, e3 } from './components/TemplateEditors';
import Dashboard from './Pages/Dashboard';
import Info from './Pages/infoPage';
import LoginPage from "./Pages/loginSinginPage";
import PropTypes from 'prop-types';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/templates" element={<TemplateSelection />} />
            <Route path="/editor/:templateId" element={<EditorWrapper editors={{ 1: e1, 2: e2, 3: e3 }} />} />

            <Route path='/infoPage' element={<Info />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

function EditorWrapper({ editors }) {
    const { templateId } = useParams();
    const Editor = editors[templateId];

    if (!Editor) {
        return <div>Invalid template ID</div>;
    }

    return <Editor />;
}

EditorWrapper.propTypes = {
    editors: PropTypes.objectOf(PropTypes.elementType).isRequired
};

export default App;

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from "../../api";
import "./glossary.css"


const Glossary = () => {
    const [nodes, setNodes] = useState([]);
    const [newTerm, setNewTerm] = useState({ term: '', definition: '', x: 0, y: 0, url: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchNodes().then(() => console.log("Nodes loaded"));
    }, []);

    const fetchNodes = async () => {
        try {
            const response = await api.get('/terms');
            setNodes(response.data);
        } catch (error) {
            console.error('Error fetching nodes:', error);
        }
    };

    const handleAddTerm = async () => {
        try {
            await api.post('/terms', newTerm);
            setNewTerm({ term: '', definition: '', x: 200, y: 200, url: '' });
            setIsModalOpen(false);
            fetchNodes().then(() => console.log("Nodes loaded"));
        } catch (error) {
            console.error('Error adding term:', error);
        }
    };

    const handleCardClick = (url) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <div className="glossary-container">
            <h1 className="glossary-title">Glossary</h1>
            <div className="tiles-container">
                {nodes.map((node) => (
                    <div key={node.id} className="tile" onClick={() => handleAddTerm(node.url)}>
                        <h2 className="tile-title">{node.term}</h2>
                        <p className="tile-definition">{node.definition}</p>
                    </div>
                ))}
                <div className="tile plus-tile" onClick={() => setIsModalOpen(true)}>
                    <h2 className="plus-icon">+</h2>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <h2 className="modal-title">Add New Term</h2>
                <input
                    type="text"
                    placeholder="Term"
                    value={newTerm.term}
                    onChange={(e) => setNewTerm({ ...newTerm, term: e.target.value })}
                    className="modal-input"
                />
                <textarea
                    placeholder="Definition"
                    value={newTerm.definition}
                    onChange={(e) => setNewTerm({ ...newTerm, definition: e.target.value })}
                    className="modal-textarea"
                />
                <textarea
                    placeholder="URL"
                    value={newTerm.url}
                    onChange={(e) => setNewTerm({ ...newTerm, url: e.target.value })}
                    className="modal-textarea"
                />
                <div className="modal-buttons">
                    <button onClick={handleAddTerm} className="modal-button primary">Add Term</button>
                    <button onClick={() => setIsModalOpen(false)} className="modal-button secondary">Cancel</button>
                </div>
            </Modal>
        </div>
    );
};

export default Glossary;

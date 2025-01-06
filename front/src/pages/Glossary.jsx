import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from "../api";
import "../../public/glossary.css"


const Glossary = () => {
    const [nodes, setNodes] = useState([]);
    const [newTerm, setNewTerm] = useState({ term: '', definition: '', graphData: { coordinates: { x: 0, y: 0 } } });
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
            setNewTerm({ term: '', definition: '', graphData: { coordinates: { x: 0, y: 0 } } });
            setIsModalOpen(false);
            fetchNodes().then(() => console.log("Nodes loaded"));
        } catch (error) {
            console.error('Error adding term:', error);
        }
    };

    return (
        <div className="glossary-container">
            <h1 className="glossary-title">Glossary</h1>
            <div className="tiles-container">
                {nodes.map((node) => (
                    <div key={node.id} className="tile">
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
                <h2>Add New Term</h2>
                <input
                    type="text"
                    placeholder="Term"
                    value={newTerm.term}
                    onChange={(e) => setNewTerm({ ...newTerm, term: e.target.value })}
                />
                <textarea
                    placeholder="Definition"
                    value={newTerm.definition}
                    onChange={(e) => setNewTerm({ ...newTerm, definition: e.target.value })}
                />
                <button onClick={handleAddTerm}>Add Term</button>
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </Modal>
        </div>
    );
};

export default Glossary;

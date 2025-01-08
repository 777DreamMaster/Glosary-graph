import React, { useState, useEffect } from 'react';
import api from "../../api";

function AdminPage() {
    const [terms, setTerms] = useState([]);
    const [edges, setEdges] = useState([]);
    const [newTerm, setNewTerm] = useState({ term: '', definition: '',  x: 0, y: 0 });
    const [newEdge, setNewEdge] = useState({ term1: 1, term2: 1, relation: '' });

    useEffect(() => {
        fetchTerms().then(() => console.log("Terms loaded"));
        fetchEdges().then(() => console.log("Edges loaded"));
    }, []);

    const fetchTerms = async () => {
        try {
            const response = await api.get('/terms');
            setTerms(response.data);
        } catch (error) {
            console.error('Error fetching terms:', error);
        }
    };

    const fetchEdges = async () => {
        try {
            const response = await api.get('/edges');
            setEdges(response.data);
        } catch (error) {
            console.error('Error fetching edges:', error);
        }
    };

    const handleAddTerm = async () => {
        try {
            await api.post('/terms', newTerm);
            setNewTerm({ term: '', definition: '',  x: 0, y: 0 });
            await fetchTerms();
        } catch (error) {
            console.error('Error adding term:', error);
        }
    };

    const handleAddEdge = async () => {
        try {
            await api.post('/edges', newEdge);
            setNewEdge({ term1: 1, term2: 1, relation: '' });
            await fetchEdges();
        } catch (error) {
            console.error('Error adding edge:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Glossary</h1>

            <h2>Add Term</h2>
            <input
                type="text"
                placeholder="Term"
                value={newTerm.term}
                onChange={(e) => setNewTerm({ ...newTerm, term: e.target.value })}
            />
            <input
                type="text"
                placeholder="Definition"
                value={newTerm.definition}
                onChange={(e) => setNewTerm({ ...newTerm, definition: e.target.value })}
            />
            <input
                type="number"
                placeholder="X Coordinate"
                value={newTerm.x}
                onChange={(e) =>
                    setNewTerm({
                        ...newTerm,
                        x: +e.target.value,
                    })
                }
            />
            <input
                type="number"
                placeholder="Y Coordinate"
                value={newTerm.y}
                onChange={(e) =>
                    setNewTerm({
                        ...newTerm,
                        y: +e.target.value,
                    })
                }
            />
            <button onClick={handleAddTerm}>Add Term</button>

            <h2>Add Edge</h2>
            <select
                value={newEdge.term1}
                onChange={(e) => setNewEdge({ ...newEdge, term1: +e.target.value })}
            >
                <option value="">Select Term 1</option>
                {terms.map((term) => (
                    <option key={term.id} value={term.id}>
                        {term.term}
                    </option>
                ))}
            </select>
            <select
                value={newEdge.term2}
                onChange={(e) => setNewEdge({ ...newEdge, term2: +e.target.value })}
            >
                <option value="">Select Term 2</option>
                {terms.map((term) => (
                    <option key={term.id} value={term.id}>
                        {term.term}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Relation"
                value={newEdge.relation}
                onChange={(e) => setNewEdge({ ...newEdge, relation: e.target.value })}
            />
            <button onClick={handleAddEdge}>Add Edge</button>

            <h2>Terms</h2>
            <ul>
                {terms.map((term) => (
                    <li key={term.id}>
                        {term.term}: {term.definition} (x: {term.x}, y: {term.y})
                    </li>
                ))}
            </ul>

            <h2>Edges</h2>
            <ul>
                {edges.map((edge, index) => (
                    <li key={index}>
                        Term {edge.term1} - Term {edge.term2}: {edge.relation}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPage;

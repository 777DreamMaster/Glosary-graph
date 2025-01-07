import React, {useState, useEffect} from 'react';
import {Network} from 'vis-network';
import api from '../api';
import './semantic-graph.css';

const SemanticGraph = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        fetchGraphData().then(() => console.log("Data loaded"));
    }, []);

    useEffect(() => {
        if (nodes.length && edges.length) {
            renderGraph();
        }
        console.log(nodes)
    }, [nodes, edges]);

    function preTitle(text) {
        const container = document.createElement("pre");
        container.innerText = text;
        return container;
    }

    const fetchGraphData = async () => {
        try {
            const nodesResponse = await api.get('/terms');
            const edgesResponse = await api.get('/edges');
            setNodes(nodesResponse.data.map(node => ({
                id: node.id,
                label: node.term,
                title: preTitle(node.definition),
                x: node.x,
                y: node.y
            })));
            setEdges(edgesResponse.data.map(edge => ({
                from: edge.term1,
                to: edge.term2,
                label: edge.relation
            })));
        } catch (error) {
            console.error('Error fetching graph data:', error);
        }
    };


    const renderGraph = () => {
        const container = document.getElementById('graph-container');
        const data = {
            nodes,
            edges,
        };
        const options = {
            nodes: {
                shape: 'box',
                size: 50,
                color: {
                    background: '#007BFF',
                    border: '#0056b3',
                    highlight: {
                        background: '#0056b3',
                        border: '#003c82',
                    },
                },
                font: {
                    size: 14,
                    color: '#fff',
                },
            },
            edges: {
                arrows: {
                    to: {enabled: true, scaleFactor: 1.5}, // Make arrows longer
                },
                font: {
                    align: 'middle',
                },
                color: {
                    color: '#848484',
                    highlight: '#505050',
                },
            },
            physics: {
                enabled: true,
            },
            interaction: {
                dragNodes: true,
                // hover: true, // Enable hover interactions
            }
        };

        new Network(container, data, options);
    };

    return (
        <div className="semantic-graph-container">
            <h1 className="semantic-graph-title">Semantic Graph</h1>
            <div id="graph-container" className="graph-container"></div>
        </div>
    );
};

export default SemanticGraph;

import { useState } from 'react';
import { Container, Navbar, Row, Col, Card, Form, Button } from 'react-bootstrap';
import cases from './data/cases.json';
import './App.css'; // We'll add custom styles here

function App() {
    const [count, setCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCases = cases.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app-container"> {/* Added wrapper div */}
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand className="fw-bold">BC Cold Cases</Navbar.Brand>
                </Container>
            </Navbar>

            <Container className="py-4">
                {/* Search Bar */}
                <Form.Group className="mb-4 bg-light p-3 rounded shadow-sm">
                    <Form.Control
                        type="search"
                        placeholder="Search by name or location..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="fs-5 p-3"
                    />
                </Form.Group>

                {/* Case Cards */}
                <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredCases.map((caseData) => (
                        <Col key={caseData.id}>
                            <Card className="h-100 shadow-sm">
                                {caseData.photo && (
                                    <Card.Img
                                        variant="top"
                                        src={caseData.photo}
                                        alt={`${caseData.name} case photo`}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fs-4 fw-bold text-primary">
                                        {caseData.name} ({caseData.year})
                                    </Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">
                    <span className="d-inline-block bg-light px-2 py-1 rounded">
                      {caseData.location}
                    </span> • {caseData.status}
                                    </Card.Subtitle>
                                    <Card.Text className="flex-grow-1" style={{ wordWrap: 'break-word' }}>
                                        {caseData.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Counter - Optional */}
                <div className="text-center mt-5">
                    <Button
                        variant="outline-primary"
                        size="lg"
                        onClick={() => setCount(c => c + 1)}
                        className="px-4"
                    >
                        Total Views: {count}
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default App;
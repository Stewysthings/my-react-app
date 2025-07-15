import { Card } from 'react-bootstrap';

interface Case {
    id: number;
    name: string;
    year: number;
    location: string;
    status: string;
}

export default function CaseCard({ name, year, location, status }: Case) {
    return (
        <Card>
            <Card.Img variant="top" src={caseData.photo} />
            <Card.Body>
                <Card.Title>{caseData.name} ({caseData.year})</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {caseData.location} • {caseData.status}
                </Card.Subtitle>
                <Card.Text>{caseData.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}
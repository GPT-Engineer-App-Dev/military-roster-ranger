import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit, Save } from "lucide-react";

const Index = () => {
  const [personnel, setPersonnel] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', rank: '', unit: '', deploymentDate: '', returnDate: '' });
  const [editingId, setEditingId] = useState(null);

  const addPerson = () => {
    if (newPerson.name && newPerson.rank && newPerson.unit && newPerson.deploymentDate) {
      setPersonnel([...personnel, { ...newPerson, id: Date.now() }]);
      setNewPerson({ name: '', rank: '', unit: '', deploymentDate: '', returnDate: '' });
    }
  };

  const removePerson = (id) => {
    setPersonnel(personnel.filter(person => person.id !== id));
  };

  const startEditing = (person) => {
    setEditingId(person.id);
    setNewPerson({ ...person });
  };

  const saveEdit = () => {
    setPersonnel(personnel.map(person => 
      person.id === editingId ? { ...newPerson, id: editingId } : person
    ));
    setEditingId(null);
    setNewPerson({ name: '', rank: '', unit: '', deploymentDate: '', returnDate: '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewPerson({ name: '', rank: '', unit: '', deploymentDate: '', returnDate: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Military Deployment Roster Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Input
          placeholder="Name"
          value={newPerson.name}
          onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
        />
        <Input
          placeholder="Rank"
          value={newPerson.rank}
          onChange={(e) => setNewPerson({...newPerson, rank: e.target.value})}
        />
        <Input
          placeholder="Unit"
          value={newPerson.unit}
          onChange={(e) => setNewPerson({...newPerson, unit: e.target.value})}
        />
        <Input
          type="date"
          placeholder="Deployment Date"
          value={newPerson.deploymentDate}
          onChange={(e) => setNewPerson({...newPerson, deploymentDate: e.target.value})}
        />
        <Input
          type="date"
          placeholder="Return Date"
          value={newPerson.returnDate}
          onChange={(e) => setNewPerson({...newPerson, returnDate: e.target.value})}
        />
      </div>
      
      {editingId ? (
        <div className="flex gap-2 mb-6">
          <Button onClick={saveEdit}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
          <Button variant="outline" onClick={cancelEdit}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={addPerson} className="mb-6">
          <Plus className="mr-2 h-4 w-4" /> Add Personnel
        </Button>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Deployment Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {personnel.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.rank}</TableCell>
              <TableCell>{person.unit}</TableCell>
              <TableCell>{person.deploymentDate}</TableCell>
              <TableCell>{person.returnDate || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => startEditing(person)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => removePerson(person.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Edit } from "lucide-react";

const Index = () => {
  const [personnel, setPersonnel] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', rank: '', unit: '', deploymentDate: '', returnDate: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addPerson = () => {
    if (newPerson.name && newPerson.rank && newPerson.unit && newPerson.deploymentDate) {
      setPersonnel([...personnel, { ...newPerson, id: Date.now() }]);
      setNewPerson({ name: '', rank: '', unit: '', deploymentDate: '', returnDate: '' });
      setIsDialogOpen(false);
    }
  };

  const removePerson = (id) => {
    setPersonnel(personnel.filter(person => person.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Military Deployment Roster Tracker</h1>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6">
            <Plus className="mr-2 h-4 w-4" /> Add Personnel
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Personnel</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
          <Button onClick={addPerson}>Add Personnel</Button>
        </DialogContent>
      </Dialog>

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
                <Button variant="destructive" size="sm" onClick={() => removePerson(person.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/shared/components/ui/alert-dialog';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Search, Edit, Trash2, Plus, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';

interface DispatchRecord {
  id: string;
  date: string;
  vehicleNumber: string;
  material: string;
  quantity: number;
  destination: string;
  ownerName: string;
  partnerId: string;
  driverName?: string;
  driverPhone?: string;
  loadingTime?: string;
  unloadingTime?: string;
  status?: string;
  notes?: string;
  createdAt: string;
}

interface DieselRecord {
  id: string;
  date: string;
  vehicleNumber: string;
  volume: number;
  item: string;
  fuelStation: string;
  status: string;
  partnerId: string;
  createdAt: string;
}

interface Partner {
  id: string;
  name: string;
  partnerId: string;
}

export default function DataManagementPage() {
  const [dispatchData, setDispatchData] = useState<DispatchRecord[]>([]);
  const [dieselData, setDieselData] = useState<DieselRecord[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [editingRecord, setEditingRecord] = useState<DispatchRecord | DieselRecord | null>(null);
  const [editingType, setEditingType] = useState<'dispatch' | 'diesel' | null>(null);

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch dispatch data
      const dispatchResponse = await fetch('/api/admin/data-management/dispatch');
      const dispatchResult = await dispatchResponse.json();
      
      // Fetch diesel data
      const dieselResponse = await fetch('/api/admin/data-management/diesel');
      const dieselResult = await dieselResponse.json();
      
      // Fetch partners
      const partnersResponse = await fetch('/api/admin/data-management/partners');
      const partnersResult = await partnersResponse.json();

      if (dispatchResult.success) setDispatchData(dispatchResult.data);
      if (dieselResult.success) setDieselData(dieselResult.data);
      if (partnersResult.success) setPartners(partnersResult.data);
      
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data
  const filteredDispatchData = dispatchData.filter(record => {
    const matchesSearch = 
      record.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPartner = selectedPartner === 'all' || record.partnerId === selectedPartner;
    const matchesDate = !dateFilter || record.date === dateFilter;
    
    return matchesSearch && matchesPartner && matchesDate;
  });

  const filteredDieselData = dieselData.filter(record => {
    const matchesSearch = 
      record.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.fuelStation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.item.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPartner = selectedPartner === 'all' || record.partnerId === selectedPartner;
    const matchesDate = !dateFilter || record.date === dateFilter;
    
    return matchesSearch && matchesPartner && matchesDate;
  });

  // Edit record
  const handleEdit = (record: DispatchRecord | DieselRecord, type: 'dispatch' | 'diesel') => {
    setEditingRecord(record);
    setEditingType(type);
  };

  // Save edited record
  const handleSave = async (updatedRecord: any) => {
    try {
      const response = await fetch(`/api/admin/data-management/${editingType}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecord),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success(`${editingType === 'dispatch' ? 'Dispatch' : 'Diesel'} record updated successfully`);
        setEditingRecord(null);
        setEditingType(null);
        fetchData(); // Refresh data
      } else {
        toast.error(result.error || 'Failed to update record');
      }
    } catch (error) {
      toast.error('Failed to update record');
      console.error('Error updating record:', error);
    }
  };

  // Delete record
  const handleDelete = async (id: string, type: 'dispatch' | 'diesel') => {
    try {
      const response = await fetch(`/api/admin/data-management/${type}/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success(`${type === 'dispatch' ? 'Dispatch' : 'Diesel'} record deleted successfully`);
        fetchData(); // Refresh data
      } else {
        toast.error(result.error || 'Failed to delete record');
      }
    } catch (error) {
      toast.error('Failed to delete record');
      console.error('Error deleting record:', error);
    }
  };

  // Export data
  const handleExport = async (type: 'dispatch' | 'diesel') => {
    try {
      const data = type === 'dispatch' ? filteredDispatchData : filteredDieselData;
      const csvContent = convertToCSV(data, type);
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-data-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast.success(`${type === 'dispatch' ? 'Dispatch' : 'Diesel'} data exported successfully`);
    } catch (error) {
      toast.error('Failed to export data');
      console.error('Error exporting data:', error);
    }
  };

  const convertToCSV = (data: any[], type: 'dispatch' | 'diesel') => {
    if (type === 'dispatch') {
      const headers = ['Date', 'Vehicle Number', 'Material', 'Quantity', 'Destination', 'Owner Name', 'Driver Name', 'Driver Phone', 'Loading Time', 'Unloading Time', 'Status', 'Notes'];
      const rows = data.map(record => [
        record.date,
        record.vehicleNumber,
        record.material,
        record.quantity,
        record.destination,
        record.ownerName,
        record.driverName || '',
        record.driverPhone || '',
        record.loadingTime || '',
        record.unloadingTime || '',
        record.status || '',
        record.notes || ''
      ]);
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    } else {
      const headers = ['Date', 'Vehicle Number', 'Volume', 'Item', 'Fuel Station', 'Status'];
      const rows = data.map(record => [
        record.date,
        record.vehicleNumber,
        record.volume,
        record.item,
        record.fuelStation,
        record.status
      ]);
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Management</h1>
        <p className="text-gray-600">View, edit, and delete dispatch and diesel records</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search vehicles, owners, materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="partner">Partner</Label>
              <Select value={selectedPartner} onValueChange={setSelectedPartner}>
                <SelectTrigger>
                  <SelectValue placeholder="All partners" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All partners</SelectItem>
                  {partners.map(partner => (
                    <SelectItem key={partner.id} value={partner.id}>
                      {partner.name} ({partner.partnerId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedPartner('all');
                  setDateFilter('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Tabs */}
      <Tabs defaultValue="dispatch" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dispatch">
            Dispatch Data ({filteredDispatchData.length})
          </TabsTrigger>
          <TabsTrigger value="diesel">
            Diesel Data ({filteredDieselData.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dispatch">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Dispatch Records</CardTitle>
              <Button onClick={() => handleExport('dispatch')} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Vehicle</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Material</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Quantity</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Destination</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Owner</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDispatchData.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{record.date}</td>
                        <td className="border border-gray-200 px-4 py-2 font-mono">{record.vehicleNumber}</td>
                        <td className="border border-gray-200 px-4 py-2">{record.material}</td>
                        <td className="border border-gray-200 px-4 py-2">{record.quantity} M.T</td>
                        <td className="border border-gray-200 px-4 py-2">{record.destination}</td>
                        <td className="border border-gray-200 px-4 py-2">{record.ownerName}</td>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEdit(record, 'dispatch')}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Dispatch Record</DialogTitle>
                                </DialogHeader>
                                <EditDispatchForm 
                                  record={record as DispatchRecord} 
                                  onSave={handleSave} 
                                  onCancel={() => setEditingRecord(null)}
                                />
                              </DialogContent>
                            </Dialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Record</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this dispatch record? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(record.id, 'dispatch')}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diesel">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Diesel Records</CardTitle>
              <Button onClick={() => handleExport('diesel')} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Vehicle</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Volume</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Item</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Fuel Station</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDieselData.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{record.date}</td>
                        <td className="border border-gray-200 px-4 py-2 font-mono">{record.vehicleNumber}</td>
                        <td className="border border-gray-200 px-4 py-2">{record.volume} L</td>
                        <td className="border border-gray-200 px-4 py-2">{record.item}</td>
                        <td className="border border-gray-200 px-4 py-2">{record.fuelStation}</td>
                        <td className="border border-gray-200 px-4 py-2">
                          <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                            {record.status}
                          </Badge>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEdit(record, 'diesel')}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Diesel Record</DialogTitle>
                                </DialogHeader>
                                <EditDieselForm 
                                  record={record as DieselRecord} 
                                  onSave={handleSave} 
                                  onCancel={() => setEditingRecord(null)}
                                />
                              </DialogContent>
                            </Dialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Record</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this diesel record? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(record.id, 'diesel')}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Edit Forms
function EditDispatchForm({ record, onSave, onCancel }: { record: DispatchRecord; onSave: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(record);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="vehicleNumber">Vehicle Number</Label>
          <Input
            id="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
            required
          />
        </div>
        <div>
          <Label htmlFor="material">Material</Label>
          <Input
            id="material"
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity (M.T)</Label>
          <Input
            id="quantity"
            type="number"
            step="0.01"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            value={formData.ownerName}
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}

function EditDieselForm({ record, onSave, onCancel }: { record: DieselRecord; onSave: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(record);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="vehicleNumber">Vehicle Number</Label>
          <Input
            id="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
            required
          />
        </div>
        <div>
          <Label htmlFor="volume">Volume (L)</Label>
          <Input
            id="volume"
            type="number"
            step="0.01"
            value={formData.volume}
            onChange={(e) => setFormData({ ...formData, volume: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="item">Item</Label>
          <Input
            id="item"
            value={formData.item}
            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="fuelStation">Fuel Station</Label>
          <Input
            id="fuelStation"
            value={formData.fuelStation}
            onChange={(e) => setFormData({ ...formData, fuelStation: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
} 
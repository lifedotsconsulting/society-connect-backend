const { User, Flat, Complaint, Vehicle, Event } = require('./src/models');

console.log('--- Testing User Model ---');
const user = new User({
    identity: 'usr_123',
    description: 'A test resident user',
    name: 'John Doe',
    flatNumber: 'A-101',
    email: 'john.doe@example.com'
});

console.log('User identity:', user.identity);
console.log('User description:', user.description);
console.log('User name:', user.name);
console.log('User flatNumber:', user.flatNumber);
console.log('User isActive:', user.isActive);
console.log('User createdAt:', user.createdAt);

console.log('\n--- Testing Soft Delete ---');
user.softDelete('admin_1');
console.log('User isActive after soft delete:', user.isActive);
console.log('User updatedBy after soft delete:', user.updatedBy);

console.log('\n--- Testing Other Models ---');
const flat = new Flat({ identity: 'flat_1', block: 'A', flatNumber: 'A-101' });
console.log('Flat block:', flat.block, '| identity:', flat.identity);

const complaint = new Complaint({ identity: 'cmp_1', title: 'Leaking tap', category: 'Plumbing' });
console.log('Complaint title:', complaint.title, '| category:', complaint.category, '| status:', complaint.status);

const event = new Event({ identity: 'evt_1', title: 'Holi Celebration' });
console.log('Event title:', event.title, '| isPublished:', event.isPublished);

const vehicle = new Vehicle({ identity: 'veh_1', vehicleNumber: 'MH01AB1234', type: '4-wheeler' });
console.log('Vehicle number:', vehicle.vehicleNumber, '| type:', vehicle.type);

console.log('\nAll tests passed successfully if no properties are undefined incorrectly.');

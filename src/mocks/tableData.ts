import { Site } from '../types/site.types';

export const mockSites: Site[] = [
  {
    id: '1',
    name: 'London Victoria Station',
    address: {
      line1: 'Victoria Station',
      line2: 'Terminus Place',
      city: 'London',
      state: 'Greater London',
      postalCode: 'SW1E 5ND',
      country: 'UK'
    },
    totalChargers: 12,
    availableChargers: 8,
    chargerTypes: [
      { type: 'CCS', powerKW: 50, count: 8 },
      { type: 'CHAdeMO', powerKW: 50, count: 2 },
      { type: 'Type 2', powerKW: 22, count: 2 }
    ],
    status: 'ONLINE',
    isActive: true,
    createdAt: '2023-11-10T08:00:00Z',
    updatedAt: '2023-11-12T09:30:00Z',
    lastHeartbeat: '2023-11-12T10:00:00Z'
  },
  {
    id: '2',
    name: 'Manchester Arndale',
    address: {
      line1: 'Arndale Shopping Centre',
      line2: 'High Street',
      city: 'Manchester',
      state: 'Greater Manchester',
      postalCode: 'M4 3AQ',
      country: 'UK'
    },
    totalChargers: 10,
    availableChargers: 4,
    chargerTypes: [
      { type: 'CCS', powerKW: 50, count: 6 },
      { type: 'Type 2', powerKW: 22, count: 4 }
    ],
    status: 'MAINTENANCE',
    isActive: true,
    createdAt: '2023-11-09T14:30:00Z',
    updatedAt: '2023-11-12T08:15:00Z',
    lastHeartbeat: '2023-11-12T08:15:00Z'
  },
  {
    id: '3',
    name: 'Edinburgh Airport',
    address: {
      line1: 'Edinburgh Airport',
      line2: 'EH12 9DN',
      city: 'Edinburgh',
      state: 'Scotland',
      postalCode: 'EH12 9DN',
      country: 'UK'
    },
    totalChargers: 15,
    availableChargers: 2,
    chargerTypes: [
      { type: 'CCS', powerKW: 50, count: 10 },
      { type: 'CHAdeMO', powerKW: 50, count: 3 },
      { type: 'Type 2', powerKW: 22, count: 2 }
    ],
    status: 'OFFLINE',
    isActive: false,
    createdAt: '2023-11-08T10:15:00Z',
    updatedAt: '2023-11-12T07:45:00Z',
    lastHeartbeat: '2023-11-11T18:30:00Z'
  },
  {
    id: '4',
    name: 'Birmingham Bullring',
    address: {
      line1: 'Bullring Shopping Centre',
      line2: 'Upper Mall',
      city: 'Birmingham',
      state: 'West Midlands',
      postalCode: 'B5 4BU',
      country: 'UK'
    },
    totalChargers: 8,
    availableChargers: 5,
    chargerTypes: [
      { type: 'CCS', powerKW: 50, count: 4 },
      { type: 'Type 2', powerKW: 22, count: 4 }
    ],
    status: 'ONLINE',
    isActive: true,
    createdAt: '2023-11-07T11:20:00Z',
    updatedAt: '2023-11-12T10:30:00Z',
    lastHeartbeat: '2023-11-12T10:30:00Z'
  },
  {
    id: '5',
    name: 'Cardiff Bay',
    address: {
      line1: 'Mermaid Quay',
      city: 'Cardiff',
      state: 'Wales',
      postalCode: 'CF10 5BZ',
      country: 'UK'
    },
    totalChargers: 6,
    availableChargers: 3,
    chargerTypes: [
      { type: 'CCS', powerKW: 50, count: 3 },
      { type: 'Type 2', powerKW: 22, count: 3 }
    ],
    status: 'ONLINE',
    isActive: true,
    createdAt: '2023-11-06T09:45:00Z',
    updatedAt: '2023-11-12T09:15:00Z',
    lastHeartbeat: '2023-11-12T09:15:00Z'
  }
];

export const generateMockSites = (count: number): Site[] => {
  const sites: Site[] = [];
  const cities = [
    { city: 'London', state: 'Greater London' },
    { city: 'Manchester', state: 'Greater Manchester' },
    { city: 'Edinburgh', state: 'Scotland' },
    { city: 'Birmingham', state: 'West Midlands' },
    { city: 'Cardiff', state: 'Wales' },
    { city: 'Leeds', state: 'West Yorkshire' },
    { city: 'Glasgow', state: 'Scotland' },
    { city: 'Sheffield', state: 'South Yorkshire' },
    { city: 'Bradford', state: 'West Yorkshire' },
    { city: 'Liverpool', state: 'Merseyside' },
    { city: 'Bristol', state: 'South West England' },
    { city: 'Newcastle', state: 'Tyne and Wear' },
    { city: 'Belfast', state: 'Northern Ireland' },
    { city: 'Leicester', state: 'East Midlands' },
    { city: 'Coventry', state: 'West Midlands' }
  ];
  
  const statuses: Array<Site['status']> = ['ONLINE', 'OFFLINE', 'MAINTENANCE'];
  
  for (let i = 1; i <= count; i++) {
    const cityData = cities[Math.floor(Math.random() * cities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const now = new Date().toISOString();
    
    sites.push({
      id: (i + 3).toString(),
      name: `Site ${i + 3}`,
      address: {
        line1: `${Math.floor(Math.random() * 1000) + 100} ${['Main', 'Oak', 'Pine', 'Maple', 'Cedar'][Math.floor(Math.random() * 5)]} ${['St', 'Ave', 'Blvd', 'Dr'][Math.floor(Math.random() * 4)]}`,
        city: cityData.city,
        state: cityData.state,
        postalCode: `${10000 + Math.floor(Math.random() * 90000)}`,
        country: 'USA',
      },
      totalChargers: Math.floor(Math.random() * 15) + 5,
      availableChargers: Math.floor(Math.random() * 5) + 1,
      chargerTypes: [
        { type: 'CCS', powerKW: 50, count: Math.floor(Math.random() * 5) + 3 },
        { type: 'CHAdeMO', powerKW: 50, count: Math.floor(Math.random() * 3) + 1 },
        { type: 'Tesla', powerKW: 250, count: Math.floor(Math.random() * 2) + 1 }
      ],
      status,
      isActive: status !== 'OFFLINE',
      createdAt: now,
      updatedAt: now
    });
  }
  
  return [...mockSites, ...sites];
};

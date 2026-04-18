// ไฟล์: src/data/mockPlans.js

export const mockPlans = [
  {
    planId: 'SP-1006',
    planName: 'Lunar Crater Mapping',
    target: 'Moon',
    telescope: 'Hawaii',
    status: 'CREATED',
    updatedAt: '2025-04-18T10:30:00Z',
    creator: 'Dr. Edwin Hubble',
    funding: '$12,000',
    startDate: '2026-05-01',
    endDate: '2026-05-10',
    objective: 'Detailed mapping of lunar craters in the southern hemisphere.',
    dataProcessing: { fileType: 'FITS', fileQuality: 'Standard', colorMode: 'Grayscale', contrast: '1.0', exposure: '1', brightness: '1', saturation: '1.0', luminance: '1', hue: '0' },
    history: [{ date: 'Apr 18, 2025 10:30:00', log: 'Created plan draft' }]
  },
  {
    planId: 'SP-1002',
    planName: 'Orion Nebula Star Formation',
    target: 'M42',
    telescope: 'Chile',
    status: 'CREATED',
    updatedAt: '2025-04-17T08:15:00Z',
    creator: 'Dr. Edwin Hubble',
    funding: '$25,000',
    startDate: '2026-06-15',
    endDate: '2026-06-20',
    objective: 'Observe early-stage star formation processes within the Orion Nebula.',
    dataProcessing: { fileType: 'RAW', fileQuality: 'Fine', colorMode: 'Color', contrast: '1.5', exposure: '3', brightness: '1.2', saturation: '1.8', luminance: '1.5', hue: '0' },
    history: [{ date: 'Apr 17, 2025 08:15:00', log: 'Updated target coordinates' }]
  },
  {
    planId: 'SP-1001',
    planName: 'Andromeda Galaxy Survey',
    target: 'M31',
    telescope: 'Hawaii',
    status: 'SUBMITTED',
    updatedAt: '2025-04-16T14:22:00Z',
    creator: 'Dr. Edwin Hubble',
    funding: '$50,000',
    startDate: '2026-04-01',
    endDate: '2026-04-15',
    objective: 'Detailed mapping of the Andromeda galaxy spiral arms.',
    dataProcessing: { fileType: 'RAW', fileQuality: 'Fine', colorMode: 'Color', contrast: '1.2', exposure: '2', brightness: '1', saturation: '1.5', luminance: '1', hue: '0' },
    history: [{ date: 'Mar 22, 2026 22:30:00', log: 'Changed funding from "45000" to "50000"' }]
  },
  {
    planId: 'SP-1004',
    planName: 'Alpha Centauri Binary',
    target: 'Alpha Centauri',
    telescope: 'Chile',
    status: 'INVALIDATED',
    updatedAt: '2025-04-15T09:00:00Z',
    creator: 'Dr. Edwin Hubble',
    funding: '$8,500',
    startDate: '2026-07-01',
    endDate: '2026-07-05',
    objective: 'Astrometric measurement of the binary system orbit.',
    dataProcessing: { fileType: 'FITS', fileQuality: 'Standard', colorMode: 'Color', contrast: '1.0', exposure: '0.5', brightness: '1', saturation: '1.0', luminance: '1', hue: '0' },
    history: [{ date: 'Apr 15, 2025 09:00:00', log: 'Observer rejected due to conflicting schedule.' }]
  },
];
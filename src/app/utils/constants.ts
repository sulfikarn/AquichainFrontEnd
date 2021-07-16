/**
 * File - Constants
 * @author Jishna AV (jishna.av@netobjex.com)
 */
export const ASSIGNEE = [
  {
    id: 1,
    name: 'Bruce',
  },
  {
    id: 2,
    name: 'Emma',
  },
];
export const HINT = [
  {
    hint_id: 1,
    hint_message: 'Data is refreshed every 30sec, depending on the data source',
    status: 1,
  },
  {
    hint_id: 2,
    hint_message:
      'Keep your application active on your mobile device for alerts',
    status: 1,
  },
];

export const TASK = [
  {
    task_id: 1,
    assignee: 'Jishna',
    description: 'Please keep #GR0123 and #DF678 at a distance of 1.5m',
    status: 1,
  },
  {
    task_id: 2,
    assignee: 'Anathapadmanabhan',
    description:
      'There is a light leakage in #ER5616. The drum should be replaced.',
    status: 3,
  },
  {
    task_id: 3,
    assignee: 'Unassigned',
    description: '20 drums should be transmitted from Room-X43 to Room-R56.',
    status: 2,
  },
];

export const ALERT = [
  {
    alert_id: 1,
    alert_message: 'The temperature has been increased',
    status: 1,
  },
  {
    alert_id: 2,
    alert_message: 'The temperature has been increased',
    status: 1,
  },
];

export const TOTAL_OVERVIEW = {
  total_air_emissions: 3456,
  total_water_waste: 256,
  total_scope_3: 196,
  total_capacity: 1050,
  actual_quantity: 770,
  no_of_safety_incidents: 0,
  no_of_ongoing_batches: 3,
  monthly_target: 1800,
  target_inprogress: 900,
};

export const TOTAL_CAPACITY_CONTENTS = [
  {
    amount: '500 MT',
    material: 'Raw Material',
  },
  {
    amount: '400 MT',
    material: 'Finished Good',
  },
  {
    amount: '50 MT',
    material: 'Dry Zone',
  },
  {
    amount: '50 MT',
    material: 'Cold Storage',
  },
  {
    amount: '100 MT',
    material: 'Flammable Store',
  },
  {
    amount: '50 MT',
    material: 'Oven Room',
  },
];

export const ACTUAL_QUANTITY_CONTENTS = [
  {
    amount: '400 MT',
    material: 'Raw Material',
  },
  {
    amount: '200 MT',
    material: 'Finished Good',
  },
  {
    amount: '40 MT',
    material: 'Dry Zone',
  },
  {
    amount: '40 MT',
    material: 'Cold Storage',
  },
  {
    amount: '50 MT',
    material: 'Flammable Store',
  },
  {
    amount: '40 MT',
    material: 'Oven Room',
  },
];

export const TRUCK_LINK_ICON = 
{
  url: './assets/images/icon-img/truck-solid.svg',
  scaledSize: {
      width: 28,
      height: 30
  }
}
export const SHIP_LINK_ICON = 
{
  url: './assets/images/icon-img/ship-solid.svg',
  scaledSize: {
      width: 30,
      height: 30
  }
}
export const PLANE_LINK_ICON = 
{
  url: './assets/images/icon-img/plane-solid.svg',
  scaledSize: {
      width: 30,
      height: 30
  }
}
export const LOCATION_LINK_ICON = 
{
  url: './assets/images/icon-img/circle-solid.svg',
  scaledSize: {
      width: 15,
      height: 30
  }
}
export const CAR_LINK_ICON = 
{
  url: './assets/images/icon-img/car-solid.svg',
  scaledSize: {
      width: 25,
      height: 30
  }
}


export const SHIPMENT_TRACKER = [
  // right
  {
    truckLat: 25.1,
    truckLng: 80.809007,
    shipLat: 20,
    shipLng: 67,
    locationLat: 20,
    locationLng: 73,
  },
  // down
  {
    truckLat: 21,
    truckLng: 79.1,
    planeLat: 14,
    planeLng: 88.2,
    locationLat: 12.9716,
    locationLng: 77.5946,
  },
  // left
  {
    truckLat: 24.1,
    truckLng: 74.809007,
    locationLat: 28.6139,
    locationLng: 77.209,
  },
];

export const EMPLOYEE_TRAVEL = [
  // right
  {
    carLat: 56.1,
    carLng: 75.809007,
    planeLat: 51.6,
    planeLng: 76.5,
    locationLat: 53.3,
    locationLng: 88.2,
  },
  // left
  {
    carLat: 50.8,
    carLng: 25.809007,
    planeLat: 41.3,
    planeLng: 28.2,
    locationLat: 45.6,
    locationLng: 16.5,
  },
  // down
  {
    carLat: 12.1,
    carLng: 25.809007,
    planeLat: 0.6,
    planeLng: 20.5,
    locationLat: 0.3,
    locationLng: 30.2,
  },

  // canada( left end)
  {
    carLat: 50.8,
    carLng: -95.809007,
    planeLat: 41.3,
    planeLng: -98.2,
    locationLat: 45.6,
    locationLng: -106.5,
  },
];

export const FLIGHTLATLNG = [
  [12.9716, 77.5946],
  [15.87, 100.9925],
];

export const ROADSHIPLATLNG = [
  [25.2048, 55.2708],
  [25.2048, 60.2708],
  [20, 67],
  [20, 73],
  [21.1458, 79.0882],
  [23.6102, 80.0882],
  [23.6102, 85.2799],
  [23.9, 82.9462],
  [25.1, 80.809007],
  [26.8467, 80.9462],
  [29.0008, 79.6193],
  [28.6139, 77.209],
  [27.0238, 74.2179],
  [24.1, 74.809007],
  [20, 73],
];

export const ONGOING_DELIVERY = {
  deliveryTitle: 'AceticAcid_Banglore-Mumbai',
  totalDistance: 850,
  totalDistanceElappsed: 110,
  estimatedCarbonEmission: 52.8,
  eta: 120,

  truckLoad: 95,
  fuelCapacity: 150,
  averageFuel: 7,
  vehicleType: 'HDV',
  fuelType: 'Diesel',

  averageSpeed: 65,
  overSpeedingInstances: 2,
  totalDurationOverSpeeding: 15,
  totalStopsMade: 1,
  totalStopsDuration: 10,

  estimatedFuelConsumption: 60,
  currentFuelConsumption: 12,
  distanceToCover: 190,
  expectedAdditionalFuelCost: 10,
  additionalCarbonEmission: 32,

  driverName: 'Paul',
  age: 38,
  fatigueLevel: 'Normal',
};

export const FINISHED_DELIVERY = {
  deliveryTitle: 'Benzene_Banglore-Delhi',
  totalDistance: 360,
  totalDistanceElappsed: 360,
  estimatedCarbonEmission: 1.02,
  eta: 0,

  truckLoad: 100,
  fuelCapacity: 120,
  averageFuel: 8,
  vehicleType: 'HDV',
  fuelType: 'Diesel',

  averageSpeed: 61,
  overSpeedingInstances: 8,
  totalDurationOverSpeeding: 68,
  totalStopsMade: 4,
  totalStopsDuration: 90,

  estimatedFuelConsumption: 60,
  currentFuelConsumption: 12,
  distanceToCover: 0,
  expectedAdditionalFuelCost: 200,
  additionalCarbonEmission: 200,

  driverName: 'Morris',
  age: 40,
  fatigueLevel: 'High',
};

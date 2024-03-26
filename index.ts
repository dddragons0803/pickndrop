type Point = string;
type Trip = Point[];

function isValidTrip(trip: Trip, pickups: Point[], dropoffs: Point[]): boolean {
    const tripPickups = trip.filter(point => pickups.includes(point));
    const tripDropoffs = trip.filter(point => dropoffs.includes(point));
    
    // All pick up points and drop points of the shipment should be covered in the trips
    const uncoveredPickups = pickups.filter(p => !tripPickups.includes(p) && p !== trip[trip.length - 1]);
    const uncoveredDropoffs = dropoffs.filter(d => !tripDropoffs.includes(d) && d !== trip[0]);

    // A trip can have multiple pick up points, drop points, and a via point (warehouse)
    return uncoveredPickups.length === 0 && uncoveredDropoffs.length === 0;
}

function validateShipment(pickups: Point[], dropoffs: Point[], trips: Trip[]): boolean {
    // Check if all pickups and dropoffs are covered
    const allTripPoints = trips.flat();
    const uncoveredPickups = pickups.filter(p => !allTripPoints.includes(p) && !dropoffs.includes(p));
    const uncoveredDropoffs = dropoffs.filter(d => !allTripPoints.includes(d) && !pickups.includes(d));

    return uncoveredPickups.length === 0 && uncoveredDropoffs.length === 0;
}

// Example
const pickups: Point[] = ['A', 'B'];
const dropoffs: Point[] = ['C', 'D'];
const trips: Trip[] = [
    ['F', 'W'],
    ['B', 'W'],
    ['W', 'C'],
    ['W', 'D']
];

console.log(validateShipment(pickups, dropoffs, trips));
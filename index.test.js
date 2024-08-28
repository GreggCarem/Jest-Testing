const { Room, Booking } = require("./index");

describe("Room class tests", () => {
  let room;
  let booking1, booking2;

  beforeEach(() => {
    room = new Room("Deluxe Room", 10000, 10);
    booking1 = new Booking(
      "John Axwell",
      "john@gmail.com",
      new Date("2024-08-01"),
      new Date("2024-08-05"),
      5,
      room
    );
    booking2 = new Booking(
      "Jane Doe",
      "jane@gmail.com",
      new Date("2024-08-10"),
      new Date("2024-08-12"),
      0,
      room
    );
    room.bookings.push(booking1, booking2);
  });

  test("Room isOccupied() method should return true if date is occupied", () => {
    expect(room.isOccupied(new Date("2024-08-03"))).toBe(true);
  });

  test("Room isOccupied() method should return false if date is not occupied", () => {
    expect(room.isOccupied(new Date("2024-08-06"))).toBe(false);
  });

  test("Room occupancyPercentage() method should return correct percentage of occupancy", () => {
    expect(
      room.occupancyPercentage(new Date("2024-08-01"), new Date("2024-08-12"))
    ).toBeCloseTo(50);
  });

  test("Room static method totalOccupancyPercentage() should return correct total occupancy percentage", () => {
    let room2 = new Room("Standard Room", 8000, 0);
    let booking3 = new Booking(
      "Alice",
      "alice@gmail.com",
      new Date("2024-08-01"),
      new Date("2024-08-03"),
      0,
      room2
    );
    room2.bookings.push(booking3);

    expect(
      Room.totalOccupancyPercentage(
        [room, room2],
        new Date("2024-08-01"),
        new Date("2024-08-12")
      )
    ).toBeCloseTo(33.33);
  });

  test("Room static method availableRooms() should return rooms that are not occupied for the entire duration", () => {
    let room2 = new Room("Standard Room", 8000, 0);
    let availableRooms = Room.availableRooms(
      [room, room2],
      new Date("2024-08-06"),
      new Date("2024-08-09")
    );
    expect(availableRooms).toContain(room2);
  });
});

describe("Booking class tests", () => {
  let room;
  let booking;

  beforeEach(() => {
    room = new Room("Deluxe Room", 10000, 10);
    booking = new Booking(
      "John Doe",
      "john@gmail.com",
      new Date("2024-08-01"),
      new Date("2024-08-05"),
      5,
      room
    );
  });

  test("Booking fee method should return correct fee including discounts", () => {
    expect(booking.fee).toBe(34200);
  });
});

class Room {
  constructor(name, rate, discount) {
    this.name = name;
    this.bookings = [];
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date) {
    return this.bookings.some(
      (booking) => date >= booking.checkIn && date < booking.checkOut
    );
  }

  occupancyPercentage(startDate, endDate) {
    let totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    let occupiedDays = 0;

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      if (this.isOccupied(new Date(d))) {
        occupiedDays++;
      }
    }

    return (occupiedDays / totalDays) * 100;
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    let totalOccupiedDays = 0;
    let totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    rooms.forEach((room) => {
      totalOccupiedDays +=
        (room.occupancyPercentage(startDate, endDate) * totalDays) / 100;
    });
    return (totalOccupiedDays / (rooms.length * totalDays)) * 100;
  }

  static availableRooms(rooms, startDate, endDate) {
    return rooms.filter((room) => {
      return !room.bookings.some((booking) => {
        return booking.checkIn < endDate && booking.checkOut > startDate;
      });
    });
  }
}

class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  get fee() {
    const stayDuration = (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24);
    const roomRate = this.room.rate * stayDuration;
    const roomDiscountedRate = roomRate - (roomRate * this.room.discount) / 100;
    const finalFee =
      roomDiscountedRate - (roomDiscountedRate * this.discount) / 100;
    return Math.round(finalFee);
  }
}

module.exports = { Room, Booking };

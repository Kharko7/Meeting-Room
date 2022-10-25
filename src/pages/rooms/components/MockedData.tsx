const MockedData = [
  {
    name: "room1",
    floor: 1,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "2-8",
  },
  {
    name: "room2",
    floor: 1,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "2-12",
  },
  {
    name: "room3",
    floor: 1,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "3-15",
  },
  {
    name: "room4",
    floor: 1,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "2-12",
  },
  {
    name: "room5",
    floor: 1,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "3-15",
  },
  {
    name: "room6",
    floor: 1,
    equipment: {
      projector: false,
      TV: false,
    },

    capacity: "3-12",
  },
  {
    name: "room7",
    floor: 1,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room8",
    floor: 1,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "7-12",
  },
  {
    name: "room9",
    floor: 1,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "2-14",
  },
  {
    name: "room10",
    floor: 1,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "4-8",
  },
  {
    name: "room11",
    floor: 1,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "3-12",
  },
  {
    name: "room12",
    floor: 1,
    equipment: {
      projector: false,
      TV: false,
    },

    capacity: "4-142",
  },
  {
    name: "room13",
    floor: 2,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "1-13",
  },
  {
    name: "room14",
    floor: 2,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room15",
    floor: 2,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room16",
    floor: 2,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room17",
    floor: 2,
    equipment: {
      projector: false,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room18",
    floor: 2,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room19",
    floor: 2,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room20",
    floor: 2,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room21",
    floor: 2,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room22",
    floor: 2,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room23",
    floor: 2,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room24",
    floor: 3,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room25",
    floor: 3,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room26",
    floor: 3,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room27",
    floor: 3,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room28",
    floor: 3,
    equipment: {
      projector: false,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room29",
    floor: 3,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room30",
    floor: 3,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room31",
    floor: 4,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room32",
    floor: 4,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room33",
    floor: 4,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room34",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room35",
    floor: 4,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room36",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room37",
    floor: 4,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room38",
    floor: 4,
    equipment: {
      projector: true,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room39",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room40",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room41",
    floor: 4,
    equipment: {
      projector: false,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room42",
    floor: 4,
    equipment: {
      projector: false,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room43",
    floor: 4,
    equipment: {
      projector: false,
      TV: false,
    },

    capacity: "4-12",
  },
  {
    name: "room44",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room45",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room46",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room47",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room48",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
  {
    name: "room49",
    floor: 4,
    equipment: {
      projector: true,
      TV: true,
    },

    capacity: "4-12",
  },
];

export default MockedData;

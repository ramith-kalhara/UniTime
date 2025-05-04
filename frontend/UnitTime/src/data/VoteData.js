import team1 from "../assets/user/img/team-1.jpg";
import team2 from "../assets/user/img/team-2.jpg";


const VoteData = [
  {
    id: 0,
    startTime: "10:00 AM",
    endTime: "5:00 PM",
    moduleId: "IT2030",
    Professors: [ // <-- array of objects
      {
        id: 1,
        imageUrl: team2,
        name: "Jhone Smith",
        module: "Art Teacher"
      },
      {
        id: 0,
        imageUrl: team1,
        name: "Julia Smith",
        module: "Music Teacher"
      },
      {
        id: 1,
        imageUrl: team2,
        name: "Jhone Smith",
        module: "Art Teacher"
      },
      {
        id: 0,
        imageUrl: team1,
        name: "Julia Smith",
        module: "Music Teacher"
      },
      {
        id: 1,
        imageUrl: team2,
        name: "Jhone Smith",
        module: "Art Teacher"
      },
      {
        id: 0,
        imageUrl: team1,
        name: "Julia Smith",
        module: "Music Teacher"
      }

    ]
  },
  {
    id: 1,
    startTime: "10:00 AM",
    endTime: "5:00 PM",
    moduleId: "IT2030",
    Professors: [ // <-- array of objects
      {
        id: 1,
        imageUrl: team2,
        name: "Jhone Smith",
        module: "Art Teacher"
      },
      {
        id: 0,
        imageUrl: team1,
        name: "Julia Smith",
        module: "Music Teacher"
      }
    ]
  },

];

export default VoteData;

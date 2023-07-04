export interface ITrip {
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    photos: string[];
    tags: string[];
    accomodation: [
        {
            name: string;
            address: string;
            checkIn: Date;
            checkOut: Date;

        }
    ];

    activities: [
        {
            name: string;
            description: string;
            location: string;
        }
    ];
    transportation: [
        {
            name: string;
            description: string;
        }
    ];
    totalFavorites: number;
    favoritesBy: string[];
    createdAt: Date;
    updatedAt: Date;
}

export default class Car {
    _id: string | null = null;
    make: string = '';
    color: string = '';
    colorHexCode: string | null = null;
    year: number = new Date().getFullYear();
    miles: number = 0;
    displayMiles: string | null = null;
    price: number = 0;
    displayPrice: string | null = null;
    hasSunroof: boolean = false;
    isFourWheelDrive: boolean = false;
    hasNavigation: boolean = false;
    hasHeatedSeats: boolean = false;
    hasPowerWindows: boolean = false;
    isActive: boolean | null = null;
}
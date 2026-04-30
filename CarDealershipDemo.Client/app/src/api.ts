import Car from './Cars/Car'

export async function fetchCars(args: CarFilterArgs, controller: AbortController, cars?: Car[]): Promise<CarsResult> {
    let uri: string = 'api/cars';
    uri += `?page=${args.page}`;
    uri += `&pageSize=${args.pageSize}`;
    uri += args.strictSearch ? `&strictSearch=${args.strictSearch}` : '';
    uri += args.hasLowMiles ? `&lowMileageThreshold=${args.lowMileageThreshold}&hasLowMiles=${args.hasLowMiles}` : '';
    uri += args.isFourWheelDrive ? `&isFourWheelDrive=${args.isFourWheelDrive}` : '';
    uri += args.hasSunroof ? `&hasSunroof=${args.hasSunroof}` : '';
    uri += args.hasNavigation ? `&hasNavigation=${args.hasNavigation}` : '';
    uri += args.hasHeatedSeats ? `&hasHeatedSeats=${args.hasHeatedSeats}` : ''
    uri += args.hasPowerWindows ? `&hasPowerWindows=${args.hasPowerWindows}` : ''
    uri += args.color > '' ? `&color=${args.color}` : '';
    
    const result = new CarsResult();
    const signal = controller.signal;
    try {
        const response = await fetch(uri, { signal })
        if (response.ok) {
            result.cars = await response.json();
        } else {
            const err = await response.json();
            const error = new ErrorResult();
            error.status = err.status;
            error.title = err.title;
            error.detail = err.detail ?? '';
            error.errors = err.errors ?? null;
            result.error = error;
            console.error(err);            
        }
    } catch (ex: any) {
        if (ex.name === 'AbortError') {
            console.warn(ex);
            if (cars) {
                result.cars = cars;
            }
            return result;
        }
        result.error = new ErrorResult();
        result.error.status = -1;
        result.error.title = ex.message;
        console.error(ex);
    }

    return result;
}

export class CarFilterArgs {
    page: number = 1;
    pageSize: number = 25;
    lowMileageThreshold: number = 25000;
    strictSearch: boolean = false;
    hasLowMiles: boolean = false;
    isFourWheelDrive: boolean = false;
    hasSunroof: boolean = false;
    hasNavigation: boolean = false;
    hasHeatedSeats: boolean = false;
    hasPowerWindows: boolean = false;
    color: string = '';
}

export class CarsResult {
    cars: Car[] | null = null;
    error: ErrorResult | null = null;
}

export class ErrorResult {
    status: number = 0;
    title: string = '';
    detail: string = '';
    errors: any;
}
import { objectToSnake } from "src/common/case-convert";
import { CalculateRateDTO } from "src/modules/rates/dtos/calculate-rate.dto";

export class CityLinkRequestDTO {
    constructor(input: CalculateRateDTO) {
        const cityLinkRequest = {
            originCountry: input?.departureCountryCode || 'MY',
            originState: input?.departureStateName || 'Kuala Lumpur',
            originPostcode: input.departurePostCode,
            destinationCountry: input?.arrivalCountryCode || 'MY',
            destinationState: input?.arrivalStateName || 'Perlis',
            destinationPostcode: input.arrivalPostCode,
            length: input.itemLength,
            width: input.itemWidth,
            height: input.itemHeight,
            selectedType: 1,
            parcelWeight: input.itemWeight,
        }
        Object.assign(this, cityLinkRequest)
    }

    originCountry: string;
    originState: string;
    originPostcode: number;
    destinationCountry: string;
    destinationState: string;
    destinationPostcode: number;
    length: number;
    width: number;
    height: number;
    selectedType: number;
    parcelWeight: number;

    toRequest() {
        return objectToSnake(this)
    }
}
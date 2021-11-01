import { JsonConverter, JsonCustomConvert} from "json2typescript";

@JsonConverter
export class DateConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        try {
            return date.toUTCString();
        }
        catch (ex) {
            return '';
        }
        
    }
    deserialize(date: any): Date {
        return DateConverter.stringToDate(date);
    }

    public static stringToDate(date: any): Date {
        try {
            if (date && date.iso)
                return new Date(date.iso);
            else if (date)
                return new Date(date);
            else
                return undefined;
        }
        catch (ex) {
            return undefined;
        }
    }
}
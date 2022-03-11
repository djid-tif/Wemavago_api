
export class Utils {


    public static isValidPassword(password:string) {
        const regexp:RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
        return regexp.test(password);
    }


}
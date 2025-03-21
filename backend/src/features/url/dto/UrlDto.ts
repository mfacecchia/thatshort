class UrlDto {
    id: string;
    redirectTo: string;

    constructor(id: string, redirectTo: string) {
        this.id = id;
        this.redirectTo = redirectTo;
    }
}

export default UrlDto;

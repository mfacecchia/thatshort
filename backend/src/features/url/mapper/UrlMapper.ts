import { url } from "@prisma/client";
import UrlDto from "../dto/UrlDto";

class UrlMapper {
    public static mapToDto(url: url): UrlDto {
        const urlDto: UrlDto = new UrlDto(url.id, url.redirect_to);
        return urlDto;
    }
}

export default UrlMapper;

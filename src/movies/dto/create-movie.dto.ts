// src/movies/dto/create-movie.dto.ts
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  // @IsNotEmpty()
  // @IsUrl()
  imageUrl: any;
}

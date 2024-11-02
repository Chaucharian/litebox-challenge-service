import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('featured')
  async getFeaturedMovie() {
    return this.moviesService.getFeaturedMovie();
  }

  @Get('popular')
  async getPopularMovies() {
    return this.moviesService.getPopularMovies();
  }

  @Get('my')
  async getMyMovies() {
    return this.moviesService.getMyMovies();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('imageUrl'))
  async uploadMovies(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    return await this.moviesService.addMovie(file, createMovieDto);
  }
}

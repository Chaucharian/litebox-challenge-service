import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FirebaseService } from 'src/firebase/firebase.service';

export interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

@Injectable()
export class MoviesService {
  private readonly tmdbApiKey: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly firebaseService: FirebaseService,
  ) {
    this.tmdbApiKey = this.configService.get<string>('TMDB_API_KEY');
  }

  async getFeaturedMovie(): Promise<Movie | null> {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.tmdbApiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    const movie = response.data.results[0];

    return {
      id: movie.id.toString(),
      title: movie.title,
      imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      description: movie.overview,
    };
  }

  async getPopularMovies(): Promise<Movie[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.tmdbApiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data.results.slice(0, 4).map((movie) => ({
      id: movie.id.toString(),
      title: movie.title,
      imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      description: movie.overview,
    }));
  }

  async getMyMovies(): Promise<Movie[]> {
    return this.firebaseService.getMovies();
  }

  async addMovie(
    file: Express.Multer.File,
    createMovieDto: CreateMovieDto,
  ): Promise<Movie> {
    const imageUrl = await this.cloudinaryService.uploadImage(file);

    const newMovie = {
      title: createMovieDto.title,
      imageUrl,
    };

    const movieId = await this.firebaseService.addMovie(newMovie);
    return { id: movieId, ...newMovie };
  }
}

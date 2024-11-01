// src/movie/movie.module.ts
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FirebaseService } from '../firebase/firebase.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService, CloudinaryService, FirebaseService],
})
export class MoviesModule {}

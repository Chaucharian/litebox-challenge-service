import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Firestore } from 'firebase-admin/firestore';


@Injectable()
export class FirebaseService {
  private db: Firestore;

  constructor(private readonly configService: ConfigService) {
    this.db = new Firestore({
      projectId: this.configService.get<string>('firebase.project_id'),
      credentials: {
        client_email: this.configService.get<string>('firebase.client_email'),
        private_key: this.configService.get<string>('firebase.private_key'),
      },
    });
  }

  async getMovies(): Promise<any[]> {
    try {
      const myMoviesCollection = this.db.collection('movies');
      const snapshot = await myMoviesCollection.get();
      const movies = snapshot.docs.map(doc => ({
        id: doc.id,
        createdAt: doc.createTime.toDate(),
        ...doc.data()
      }));
      return movies;
    } catch (error) {
      throw new Error(`Failed to retrieve movies from Firebase: ${error.message}`);
    }
  }

  async addMovie(data: { title: string; imageUrl: string }) {
    const movieCollection = this.db.collection('movies');
    const newDoc = await movieCollection.add(data);
    return newDoc.id;
  }

  
}

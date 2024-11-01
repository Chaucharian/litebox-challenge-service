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

  async addMovie(data: { title: string; imageUrl: string }) {
    const movieCollection = this.db.collection('movies');
    const newDoc = await movieCollection.add(data);
    return newDoc.id;
  }

  
}

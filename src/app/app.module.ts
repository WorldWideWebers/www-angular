import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';


import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  connectFunctionsEmulator,
  FunctionsModule,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
  enableMultiTabIndexedDbPersistence,
} from '@angular/fire/firestore';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
import { provideAuth, connectAuthEmulator, getAuth } from '@angular/fire/auth';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { PostListComponent } from './blog/post-list/post-list.component';
import { ViewPostComponent } from './blog/view-post/view-post.component';
import { EditPostComponent } from './blog/edit-post/edit-post.component';
import { CreatePostComponent } from './blog/create-post/create-post.component';
import { PostComponent } from './blog/post/post.component';

let resolvePersistenceEnabled: (enabled: boolean) => void;

export const persistenceEnabled = new Promise<boolean>((resolve) => {
  resolvePersistenceEnabled = resolve;
});

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, BlogListComponent, PostListComponent, ViewPostComponent, EditPostComponent, CreatePostComponent, PostComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      enableMultiTabIndexedDbPersistence(firestore).then(
        () => resolvePersistenceEnabled(true),
        () => resolvePersistenceEnabled(false)
      );
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      return functions;
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

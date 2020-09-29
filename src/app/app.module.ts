import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { MyPostComponent } from './my-post/my-post.component';
import { BarsInLocationComponent } from './bars-in-location/bars-in-location.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { PostApiService } from './_services/post-api.service';
import { AuthGuard } from './_guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { PostDataService } from './_services/post-data.service';
import { SignupComponent } from './signup/signup.component';
import { SpinnerComponent } from './spinner/spinner-components';
import { PostComponent } from './post/post.component';
import { PostCardComponent } from './post-card/post-card.component';
import { LocationPostComponent } from './location-post/location-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { UserInLocationComponent } from './user-in-location/user-in-location.component';
import { UserInLocationRatingComponent } from './user-in-location-rating/user-in-location-rating.component';
import { LocationRatingPostComponent } from './location-rating-post/location-rating-post.component';
import { BarInLocationRatingComponent } from './bar-in-location-rating/bar-in-location-rating.component';
import { BarNamePipe } from './_pipes/bar-name.pipe';
import { UniqueBarNamePipe } from './_pipes/unique-bar-name.pipe';
import { NborhoodInLocationComponent } from './nborhood-in-location/nborhood-in-location.component';
import { NborhoodInLocationRatingComponent } from './nborhood-in-location-rating/nborhood-in-location-rating.component';
import { MyPostCollegeComponent } from './my-post-college/my-post-college.component';
import { NborhoodInCollegeComponent } from './nborhood-in-college/nborhood-in-college.component';
import { NborhoodInCollegeRatingComponent } from './nborhood-in-college-rating/nborhood-in-college-rating.component';
import { CollegePostComponent } from './college-post/college-post.component';
import { CollegePostRatingComponent } from './college-post-rating/college-post-rating.component';
import { BarInCollegeComponent } from './bar-in-college/bar-in-college.component';
import { BarInCollegeRatingComponent } from './bar-in-college-rating/bar-in-college-rating.component';
import { UserInCollegeComponent } from './user-in-college/user-in-college.component';
import { UserInCollegeRatingComponent } from './user-in-college-rating/user-in-college-rating.component';
import { CreateCollegePostComponent } from './create-college-post/create-college-post.component';
import { EditCollegePostComponent } from './edit-college-post/edit-college-post.component';
import { CollegePostCardComponent } from './college-post-card/college-post-card.component';
import { MyCollegePostCardComponent } from './my-college-post-card/my-college-post-card.component';
import { UniqueNbhoodNamePipe } from './_pipes/unique-nbhood-name.pipe';
import { UniqueRegNamePipe } from './_pipes/unique-reg-name.pipe';



@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      MyPostComponent,
      BarsInLocationComponent,
      CreatePostComponent,
      LoginComponent,
      SignupComponent,
      SpinnerComponent,
      PostComponent,
      PostCardComponent,
      LocationPostComponent,
      EditPostComponent,
      UserInLocationComponent,
      UserInLocationRatingComponent,
      LocationRatingPostComponent,
      BarInLocationRatingComponent,
      BarNamePipe,
      UniqueBarNamePipe,
      NborhoodInLocationComponent,
      NborhoodInLocationRatingComponent,
      MyPostCollegeComponent,
      NborhoodInCollegeComponent,
      NborhoodInCollegeRatingComponent,
      CollegePostComponent,
      CollegePostRatingComponent,
      BarInCollegeComponent,
      BarInCollegeRatingComponent,
      UserInCollegeComponent,
      UserInCollegeRatingComponent,
      CreateCollegePostComponent,
      EditCollegePostComponent,
      CollegePostCardComponent,
      MyCollegePostCardComponent,
      UniqueNbhoodNamePipe,
      UniqueRegNamePipe
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes),
      BsDropdownModule.forRoot(),
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      InfiniteScrollModule
   ],
   providers: [
      ErrorInterceptorProvider,
      PostApiService,
      AuthGuard,
      AuthService,
      PostDataService,
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

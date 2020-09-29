import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guard/auth.guard'
import { BarsInLocationComponent } from './bars-in-location/bars-in-location.component';
import { MyPostComponent } from './my-post/my-post.component';
import { LocationPostComponent } from './location-post/location-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SignupComponent } from './signup/signup.component';
import { UserInLocationComponent } from './user-in-location/user-in-location.component';
import { BarInLocationRatingComponent } from './bar-in-location-rating/bar-in-location-rating.component';
import { LocationRatingPostComponent } from './location-rating-post/location-rating-post.component';
import { UserInLocationRatingComponent } from './user-in-location-rating/user-in-location-rating.component';
import { MyPostCollegeComponent } from './my-post-college/my-post-college.component';
import { BarInCollegeComponent } from './bar-in-college/bar-in-college.component';
import { BarInCollegeRatingComponent } from './bar-in-college-rating/bar-in-college-rating.component';
import { CollegePostComponent } from './college-post/college-post.component';
import { CollegePostRatingComponent } from './college-post-rating/college-post-rating.component';
import { CreateCollegePostComponent } from './create-college-post/create-college-post.component';
import { NborhoodInCollegeComponent } from './nborhood-in-college/nborhood-in-college.component';
import { NborhoodInCollegeRatingComponent } from './nborhood-in-college-rating/nborhood-in-college-rating.component';
import { NborhoodInLocationComponent } from './nborhood-in-location/nborhood-in-location.component';
import { NborhoodInLocationRatingComponent } from './nborhood-in-location-rating/nborhood-in-location-rating.component';
import { UserInCollegeComponent } from './user-in-college/user-in-college.component';
import { UserInCollegeRatingComponent } from './user-in-college-rating/user-in-college-rating.component';




export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'post/user', component: MyPostComponent },
      { path: 'location/:loc', component: LocationPostComponent },
      { path: 'post/create', component: CreatePostComponent },
      { path: 'locBar/:locBar', component: BarsInLocationComponent },
      { path: 'locUser/:locUser', component: UserInLocationComponent },
      { path: 'locBar/r/:locBar', component: BarInLocationRatingComponent},
      { path: 'location/r/:loc', component: LocationRatingPostComponent },
      { path: 'locUser/r/:locUser', component: UserInLocationRatingComponent },
      { path: 'post/school/user', component: MyPostCollegeComponent },
      { path: 'schoolbar/:schoolbar', component: BarInCollegeComponent },
      { path: 'schoolbar/r/:schoolbar', component: BarInCollegeRatingComponent },
      { path: 'school/:school', component: CollegePostComponent },
      { path: 'school/r/:school', component: CollegePostRatingComponent },
      { path: 'post/school/create', component: CreateCollegePostComponent },
      { path: 'nbhood/:locNbhood', component: NborhoodInLocationComponent },
      { path: 'nbhood/r/:locNbhood', component: NborhoodInLocationRatingComponent },
      { path: 'schoolreg/:schoolreg', component: NborhoodInCollegeComponent },
      { path: 'schoolreg/r/:schoolreg', component: NborhoodInCollegeRatingComponent },
      { path: 'schooluser/:schooluser', component: UserInCollegeComponent },
      { path: 'schooluser/r/:schooluser', component: UserInCollegeRatingComponent },
      { path: '**', pathMatch:'full', redirectTo: '/home' }
    ]
  },
  { path: '**', pathMatch:'full', redirectTo: '' }
];



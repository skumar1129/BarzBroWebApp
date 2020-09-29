import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from 'aws-amplify';
import { Observable } from 'rxjs';
import { RequestSigner } from 'aws4';




@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  API_CITY: string = 'https://vzpsdsnfc7.execute-api.us-east-2.amazonaws.com/prod';
  API_COLLEGE: string = 'https://wznyup28l6.execute-api.us-east-2.amazonaws.com/prod';
  options;

  constructor(private http: HttpClient) { }


  async setOptionsCity(path = '/', method = '', body = '') {
    const host = new URL(this.API_CITY);

    this.options = {
      service: 'dev-barzbro-api-city',
      region: 'us-east-2',
      hostname: host.hostname,
      path: path,
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      }
    };

    if (method === 'GET') {
      delete this.options.body;
    }

  }

  async setOptionsCollege(path = '/', method = '', body = '') {
    const host = new URL(this.API_COLLEGE);

    this.options = {
      service: 'dev-barzbro-api-college',
      region: 'us-east-2',
      hostname: host.hostname,
      path: path,
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      }
    };

    if (method === 'GET') {
      delete this.options.body;
    }

  }





  addPost(item) {
    const path = '/post/add/' + localStorage.getItem('name');
    const endpoint = this.API_CITY + path;
    let itemData;

    if (item.neighborhood) {
      itemData = {
        Content: item.content,
        Location: item.location,
        Bar: item.bar.toLowerCase(),
        LocBar: item.location + '-' + item.bar.toLowerCase(),
        LocUser: item.location + '-' + localStorage.getItem('name'),
        LocNeighborhood: item.location + '-' + item.neighborhood.toLowerCase(),
        Rating: item.rating,
        Neighborhood: item.neighborhood.toLowerCase()
      };
    }
    else {
      itemData = {
        Content: item.content,
        Location: item.location,
        Bar: item.bar.toLowerCase(),
        LocBar: item.location + '-' + item.bar.toLowerCase(),
        LocUser: item.location + '-' + localStorage.getItem('name'),
        LocNeighborhood: null,
        Rating: item.rating,
        Neighborhood: null
      };
    }

    const reqBody = {
      Item: itemData
    };

    this.setOptionsCity(path, 'POST', JSON.stringify(reqBody));
    return this.http.post(endpoint, reqBody, this.options);

  }

  deletePost(loc: string, ts: number) {
    const path = `/post/delete/lt/${loc}/${ts}`;
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'DELETE');
    return this.http.delete(endpoint, this.options);
  }

  updatePost(item) {
    const path = `/post/update`;
    const endpoint = this.API_CITY + path;

    const itemData = {
      Content: item.content,
      Bar: item.bar,
      Username: item.username,
      Rating: item.rating,
      Location: item.location,
      Timestamp: item.timestamp,
      Id: item.id,
      LocBar: item.locBar,
      LocUser: item.locUser,
      Neighborhood: item.neighborhood.toLowerCase(),
      LocNeighborhood: item.locNeighborhood
    };

    const reqBody = {
      Item: itemData
    };

    this.setOptionsCity(path, 'PATCH', JSON.stringify(reqBody));
    return this.http.patch(endpoint, reqBody, this.options);
  }



  getLocPosts(loc: string, start?: number): Observable<any> {
    let path = '/post/l/' + loc + '?limit=5';
    if (start > 0){
      path += '&start=' + start;
    }
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getLocPostsRating(loc: string, start?: number, rating?: number): Observable<any> {
    let path = '/post/lr/' + loc + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&rating=' + rating;
    }
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getLocUserTime(locUser: string, start?: number, loc?: string): Observable<any> {
    let path = '/post/lut/' + locUser + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&location=' + loc;;
    }
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getLocUserRating(locUser: string, start?: number, loc?: string, rating?: number): Observable<any> {
    let path = '/post/lur/' + locUser + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&location=' + loc + '&rating=' + rating;
    }
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getLocBarTime(locBar: string, start?: number, loc?: string): Observable<any> {
    let path = '/post/lbt/' + locBar + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&location=' + loc;
    }
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getLocBarRating(locBar: string, start?: number, loc?: string, rating?: number): Observable<any> {
    let path = '/post/lbr/' + locBar + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&location=' + loc + '&rating=' + rating;
    }
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }


  getUserPost(start?: number, loc?: string): Observable<any> {

    let path = '/post/u/' + localStorage.getItem('name') + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&location=' + loc;
    }
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getBarsInLoc(location: string) {
    const path = '/post/bar/'+ location;
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getPostNbhood(location: string) {
    const path = '/post/nbhood/' + location;
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getPostNbhoodRating(locNeighborhood: string, start?: number, loc?: string, rating?: number): Observable<any> {
    let path = '/post/nbhood/nr/' + locNeighborhood + '?limit=5';
    if (start > 0) {
      path += `&start=${start}&location=${loc}&rating=${rating}`;
    }
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getPostNbhoodTime(locNeighborhood: string, start?: number, loc?: string): Observable<any> {
    let path = `/post/nbhood/nt/${locNeighborhood}?limit=5`;
    if (start > 0) {
      path += `&start=${start}&location=${loc}`;
    }
    const endpoint = this.API_CITY + path;
    this.setOptionsCity(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  addCollegePost(item) {
    const path = '/post/college/create/' + localStorage.getItem('name');
    const endpoint = this.API_COLLEGE + path;
    let itemData;

    if (item.region) {
      itemData = {
        Content: item.content,
        School: item.school,
        Bar: item.bar.toLowerCase(),
        SchoolBar: item.school + '-' + item.bar.toLowerCase(),
        SchoolUser: item.school + '-' + localStorage.getItem('name'),
        SchoolReg: item.school + '-' + item.region.toLowerCase(),
        Rating: item.rating,
        Region: item.region.toLowerCase()
      };
    }
    else {
      itemData = {
        Content: item.content,
        School: item.school,
        Bar: item.bar.toLowerCase(),
        SchoolBar: item.school + '-' + item.bar.toLowerCase(),
        SchoolUser: item.school + '-' + localStorage.getItem('name'),
        SchoolReg: null,
        Rating: item.rating,
        Region: null
      }
    }

    const reqBody = {
      Item: itemData
    };

    this.setOptionsCollege(path, 'POST', JSON.stringify(reqBody));
    return this.http.post(endpoint, reqBody, this.options);
  }

  deleteCollegePost(school: string, ts: number) {
    const path = `/post/college/delete/${school}/${ts}`;
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'DELETE');
    return this.http.delete(endpoint, this.options);
  }

  updateCollegePost(item) {
    const path = `/post/college/update`;
    const endpoint = this.API_COLLEGE + path;

    const itemData = {
      Content: item.content,
      Bar: item.bar,
      Username: item.username,
      Rating: item.rating,
      School: item.school,
      Timestamp: item.timestamp,
      Id: item.id,
      SchoolBar: item.schoolBar,
      SchoolUser: item.schoolUser,
      Region: item.region,
      SchoolReg: item.schoolReg
    };

    const reqBody = {
      Item: itemData
    };

    this.setOptionsCollege(path, 'PATCH', JSON.stringify(reqBody));
    return this.http.patch(endpoint, reqBody, this.options);
  }

  getSchoolPostsTime(school: string, start?: number): Observable<any> {
    let path = '/post/school/sr/' + school  + '?limit=5';
    if (start > 0){
      path += '&start=' + start;
    }
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getSchoolPostsRating(school: string, start?: number, rating?: number): Observable<any> {
    let path = '/post/school/st/' + school + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&rating=' + rating;
    }
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getSchoolBarRating(schoolBar: string, start?: number, school?: string, rating?: number): Observable<any> {
    let path = '/post/schoolbar/sbr/' + schoolBar + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&school=' + school + '&rating=' + rating;
    }
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
   }

   getSchoolBarTime(schoolBar: string, start?: number, school?: string): Observable<any> {
    let path = '/post/schoolbar/sbt/' + schoolBar + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&school=' + school;
    }
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getSchoolBar(school: string): Observable<any> {
    const path = '/post/schoolbar/sbb/' + school;
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getSchoolRegRating(schoolReg: string, start?: number, school?: string, rating?: number): Observable<any> {
    let path = '/post/schoolreg/srr/' + schoolReg + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&school=' + school + '&rating=' + rating;
    }
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
   }

   getSchoolRegTime(schoolReg: string, start?: number, school?: string): Observable<any> {
    let path = '/post/schoolreg/srt/' + schoolReg + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&school=' + school;
    }
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
   }

   getSchoolReg(school: string): Observable<any> {
    const path = '/post/schoolreg/srs/' + school;
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
  }

  getSchoolUserRating(schoolUser: string, start?: number, school?: string, rating?: number): Observable<any> {
    let path = '/post/schooluser/sur/' + schoolUser + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&school=' + school + '&rating=' + rating;
    }
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
   }

   getSchoolUserTime(schoolUser: string, start?: number, school?: string): Observable<any> {
    let path = '/post/schooluser/sut/' + schoolUser + '?limit=5';
    if (start > 0){
      path += '&start=' + start + '&school=' + school;
    }
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
   }

   getSchoolUser(start?: number, school?: string): Observable<any> {
    let path = '/post/school/u/' + localStorage.getItem('name') + '?limit=5';
    if (start > 0) {
      path += `&start=${start}&school=${school}`;
    }
    const endpoint = this.API_COLLEGE + path;
    this.setOptionsCollege(path, 'GET');
    return this.http.get(endpoint, this.options);
   }

}



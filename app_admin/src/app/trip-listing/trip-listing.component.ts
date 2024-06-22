import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})

export class TripListingComponent implements OnInit {

  trips!: Trip[];
  
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  public addTrip(): void {
    console.log('TripListingComponent#addTrip routing to TripAddComponent');
    this.router.navigate(['/add-trip']);
  }

  private getTrips(): void {
    console.log('TripListingComponent#getTrips calling TripDataService#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService
      .getTrips()
      .then(foundTrips => {
        this.message = foundTrips.length > 0 ? '' : 'No trips found';
        this.trips = foundTrips;
      });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }



  ngOnInit() {
    this.getTrips();
  }

}
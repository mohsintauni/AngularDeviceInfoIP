import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  deviceInfo : DeviceInfo;
  title = 'device-detection-sample';
  latitude!: number;
  longitude!: number;
  ipAddress = '';
  ipAddressLocal = '';
  country_name = '';
  city = '';
  postal = '';
  state = '';
  country_code = '';
  

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: HttpClient,
    private deviceDetectorService: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.getIPAddress();
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
    });
  }

  getIPAddress() {

    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
    });

    this.http.get("https://geolocation-db.com/json/").subscribe((res: any) => {
      this.ipAddressLocal = res.IPv4;
      this.country_name = res.country_name;
      this.country_code = res.country_code;
      this.city = res.city;
      this.postal = res.postal;
      this.state = res.state;
      this.latitude = res.latitude;
      this.longitude = res.longitude;
    });

  }

  onMapClicked(event: any) {
    console.table(event.coords);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

}

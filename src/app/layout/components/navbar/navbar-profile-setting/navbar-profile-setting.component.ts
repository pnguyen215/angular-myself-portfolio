import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EnvService } from "@core/services/env.service";
import { AuthenticationService } from "app/auth/service";
import { LineSys } from "app/model/routes/line-sys.route";
import { Logger } from "ngx-api-sdk";

@Component({
  selector: "app-navbar-profile-setting",
  templateUrl: "./navbar-profile-setting.component.html",
  styleUrls: ["./navbar-profile-setting.component.scss"],
})
export class NavbarProfileSettingComponent implements OnInit {
  protected logger = new Logger(NavbarProfileSettingComponent.name);

  path_login = LineSys.path.path_login;
  hasProfileSetting = false;

  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authService
   * @param {EnvService} _envService
   */
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _envService: EnvService
  ) {}

  ngOnInit(): void {
    this.onConfig();
  }

  onConfig() {
    this.hasProfileSetting = this._envService.isAvailableProfileAndSetting();
  }

  /**
   * Logout method
   */
  logout() {
    this._authService.logout();
    this._router.navigate([`${LineSys.path.path_login}`]);
  }

  /**
   * @description - goto page profile and setting
   */
  redirectToSetting() {
    this._router.navigate([`${LineSys.path.path_profile_setting}`]);
  }

  isAvailable(): boolean {
    return this._authService.isAvailable();
  }
}

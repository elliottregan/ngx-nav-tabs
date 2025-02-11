import { TabbableRoute } from "nav-tabs";
import { Injectable, signal } from "@angular/core";
import { AppTabsCopyModel } from "../models/copy";
import { tabbableRoutes, translatedRoutes } from "../app.routes";

@Injectable({
  providedIn: 'root'
})
export class DynamicRoutesService {
  private dynamicRoutes = signal<(TabbableRoute | TabbableRoute<AppTabsCopyModel>)[]>([]);
  private baseRoutes: (TabbableRoute | TabbableRoute<AppTabsCopyModel>)[];

  constructor() {
    this.baseRoutes = [...tabbableRoutes, ...translatedRoutes];
    this.init();
  }

  private init() {
    this.dynamicRoutes.set([...this.baseRoutes]);
  }

  getRoutes() {
    return this.dynamicRoutes.asReadonly();
  }

  addRoute(route: TabbableRoute | TabbableRoute<AppTabsCopyModel>) {
    this.dynamicRoutes.update(routes => [...routes, route]);
  }

  removeRoute(routeToRemove: TabbableRoute | TabbableRoute<AppTabsCopyModel>) {
    this.dynamicRoutes.update(routes => {
      return routes.filter(route => route.path !== routeToRemove.path);;
    });
  }
}


/// <reference types="vite/client" />

// Add Mapbox GL JS typings
declare module 'mapbox-gl' {
  export interface MapboxOptions {
    container: string | HTMLElement;
    style: string;
    center?: [number, number];
    zoom?: number;
    bearing?: number;
    pitch?: number;
    minZoom?: number;
    maxZoom?: number;
    interactive?: boolean;
    attributionControl?: boolean;
    customAttribution?: string | string[];
    logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    renderWorldCopies?: boolean;
    maxBounds?: LngLatBoundsLike;
    scrollZoom?: boolean | object;
    boxZoom?: boolean;
    dragRotate?: boolean;
    dragPan?: boolean;
    keyboard?: boolean;
    doubleClickZoom?: boolean;
    touchZoomRotate?: boolean;
    trackResize?: boolean;
    projection?: string;
    cooperativeGestures?: boolean;
  }
  
  export interface Map {
    addControl(control: Control, position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'): this;
    remove(): void;
    getCenter(): LngLat;
    setCenter(center: LngLatLike): this;
    getZoom(): number;
    setZoom(zoom: number): this;
    easeTo(options: CameraOptions & AnimationOptions): this;
    on(type: string, listener: (ev: any) => void): this;
    off(type: string, listener: (ev: any) => void): this;
    getPitch(): number;
    flyTo(options: CameraOptions & AnimationOptions): this;
    panTo(lnglat: LngLatLike, options?: AnimationOptions): this;
    setBearing(bearing: number, eventData?: any): this;
    setStyle(style: string): void;
    setFog(options: object): void;
  }
  
  export class Map {
    constructor(options: MapboxOptions);
    // Map methods are declared in interface above
  }
  
  export class Marker {
    constructor(options?: any);
    setLngLat(lnglat: LngLatLike): this;
    addTo(map: Map): this;
    remove(): this;
    setPopup(popup?: Popup): this;
    getElement(): HTMLElement;
    setOffset(offset: PointLike): this;
  }
  
  export class Popup {
    constructor(options?: any);
    setLngLat(lnglat: LngLatLike): this;
    setHTML(html: string): this;
    setDOMContent(htmlNode: Node): this;
    addTo(map: Map): this;
    remove(): this;
    setMaxWidth(maxWidth: string): this;
  }
  
  export class NavigationControl {
    constructor(options?: { showCompass?: boolean; showZoom?: boolean; visualizePitch?: boolean });
  }
  
  export class GeolocateControl {
    constructor(options?: any);
  }
  
  export type LngLatLike = [number, number] | { lng: number; lat: number } | LngLat;
  export type PointLike = [number, number] | { x: number; y: number } | Point;
  export type LngLatBoundsLike = [LngLatLike, LngLatLike] | [number, number, number, number] | LngLatBounds;
  
  export interface CameraOptions {
    center?: LngLatLike;
    zoom?: number;
    bearing?: number;
    pitch?: number;
    around?: LngLatLike;
    padding?: number | PaddingOptions;
  }
  
  export interface AnimationOptions {
    duration?: number;
    easing?: (t: number) => number;
    offset?: PointLike;
    animate?: boolean;
    essential?: boolean;
  }
  
  export interface PaddingOptions {
    top: number;
    bottom: number;
    left: number;
    right: number;
  }
  
  export class LngLat {
    constructor(lng: number, lat: number);
    lng: number;
    lat: number;
    wrap(): LngLat;
    toArray(): [number, number];
    toString(): string;
    static convert(input: LngLatLike): LngLat;
  }
  
  export class LngLatBounds {
    constructor(sw?: LngLatLike, ne?: LngLatLike);
    setNorthEast(ne: LngLatLike): this;
    setSouthWest(sw: LngLatLike): this;
    extend(obj: LngLatLike | LngLatBoundsLike): this;
    getCenter(): LngLat;
    getSouthWest(): LngLat;
    getNorthEast(): LngLat;
    getNorthWest(): LngLat;
    getSouthEast(): LngLat;
    getWest(): number;
    getSouth(): number;
    getEast(): number;
    getNorth(): number;
    toArray(): [[number, number], [number, number]];
    toString(): string;
    isEmpty(): boolean;
    contains(lnglat: LngLatLike): boolean;
  }
  
  export class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
    clone(): Point;
    add(point: Point): Point;
    subtract(point: Point): Point;
    mult(k: number): Point;
    div(k: number): Point;
    rotate(angle: number): Point;
    matMult(m: number[]): Point;
    unit(): Point;
    perp(): Point;
    round(): Point;
    mag(): number;
    equals(point: Point): boolean;
    dist(point: Point): number;
    distSqr(point: Point): number;
    angle(): number;
    angleTo(point: Point): number;
    angleWidth(point: Point): number;
    angleWithSep(x: number, y: number): number;
  }
  
  export type Control = NavigationControl | GeolocateControl;
}

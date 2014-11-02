var GoPro = GoPro || {};

GoPro.Settings = {};

GoPro.Status = {
    InternalBatteryPresent: 1,
    InternalBatteryLevel: 2,
    ExternalBatteryPresent: 3,
    ExternalBatteryLevel: 4,
    CurrentTemperature: 5,
    SystemHot: 6,
    SystemBusy: 8,
    QuickCaptureActive: 9,
    EncodingActive: 10,
    LcdLockActive: 11,
    CameraLocateActive: 45,
    Mode: 43,
    SubMode: 44,
    Xmode: 12,
    VideoProgressCounter: 13,
    VideoProtuneDefault: 46,
    PhotoProtuneDefault: 47,
    MultiShotProtuneDefault: 48,
    MultiShotCountDown: 49,
    BroadcastProgressCounter: 14,
    BroadcastViewersCount: 15,
    BroadcastBstatus: 16,
    WirelessEnable: 17,
    WirelessPairState: 19,
    WirelessPairType: 20,
    WirelessScanState: 22,
    WirelessScanTime: 23,
    WirelessScanCurrentTime: 18,
    WirelessPairing: 28,
    WirelessRemoveControlVersion: 26,
    WirelessRemoveControlConnected: 27,
    WirelessAppCount: 31,
    WirelessProvisionStatus: 24,
    WirelessRssiBars: 25,
    WirelessWlanSsid: 29,
    WirelessApSsid: 30,
    SdStatus: 33,
    RemainingPhotos: 34,
    RemainingVideoTime: 35,
    NumGroupPhotos: 36,
    NumGroupVideos: 37,
    NumTotalPhotos: 38,
    NumTotalVideos: 39,
    DateTime: 40,
    FWUpdateOtaStatus: 41,
    FWUpdateDownloadCancelRequestPending: 42
};

/*
**  Modes
*/
GoPro.Settings.Modes = {
    Video: 0,
    Photo: 1,
    Burst: 2,
    Broadcast: 3,
    Playback: 4,
    Settings: 5
};

/*
**  Submodes
*/
GoPro.Settings.Submodes = {
    Video: {
        Video: 0,
        VideoPhoto: 2,
        Looping: 3
    },
    Photo: {
        Single: 0,
        Continuous: 1,
        Night: 2
    },
    Burst: {
        Burst: 0,
        Timelapse: 1,
        NightLapse: 2
    }
};

/*
**  Settings ids
*/
GoPro.Settings.VIDEO_DEFAULT_SUB_MODE = 1;
GoPro.Settings.VIDEO_CURRENT_SUB_MODE = 68;
GoPro.Settings.VideoSubmode = {
    Video: 0,
    VideoPhoto: 2,
    Looping: 3
};

GoPro.Settings.VIDEO_RESOLUTION = 2;
GoPro.Settings.VideoResolution = {
    R4K: 1,
    R27K: 4,
    R1440: 7,
    R1080S: 8,
    R1080: 9,
    R960: 10,
    R720S: 11,
    R720: 12,
    WVGA: 13
};

GoPro.Settings.VIDEO_FPS = 3;
GoPro.Settings.VideoFPS = {
    F240: 0,
    F120: 1,
    F100: 2,
    F90: 3,
    F80: 4,
    F60: 5,
    F50: 6,
    F48: 7,
    F30: 8,
    F25: 9,
    F24: 10,
    F15: 11,
    F12: 12
};

GoPro.Settings.VIDEO_FOV = 4;
GoPro.Settings.VideoFOV = {
    Wide: 0,
    Medium: 1,
    Narrow: 2
};

GoPro.Settings.VIDEO_TIMELAPSE_INTERVAL = 5;
GoPro.Settings.VideoTimelapseInterval = {
    IHALFSEC: 0,
    I1S: 1,
    I2S: 2,
    I5S: 3,
    I10S: 4,
    I30S: 5,
    I60S: 6
};

GoPro.Settings.VIDEO_LOOPING_INTERVAL = 6;
GoPro.Settings.VideoLoopingInterval = {
    MAX: 0,
    I5M: 1,
    I20M: 2,
    I60M: 3,
    I120M: 4
};

GoPro.Settings.VIDEO_PIV_INTERVAL = 7;
GoPro.Settings.VideoPivInterval = {
    I5S: 1,
    I10S: 2,
    I30S: 3,
    I60S: 4
};

GoPro.Settings.VIDEO_LOW_LIGHT = 8;
GoPro.Settings.VideoLowLight = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.VIDEO_SPOT_METER = 9;
GoPro.Settings.VideoSpotMeter = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.VIDEO_PROTUNE = 10;
GoPro.Settings.VideoProtune = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.VIDEO_PROTUNE_WHITE_BALANCE = 11;
GoPro.Settings.VideoProtuneWhiteBalance = {
    Auto: 0,
    B3000K: 1,
    B5500K: 2,
    B6500K: 3,
    Native: 4
};

GoPro.Settings.VIDEO_PROTUNE_COLOR = 12;
GoPro.Settings.VideoProtuneColor = {
    GoProColor: 0,
    Flat: 1
};

GoPro.Settings.VIDEO_PROTUNE_SHARPNESS = 14;
GoPro.Settings.VideoProtuneSharpness = {
    High: 0,
    Medium: 1,
    Low: 2
};

GoPro.Settings.VIDEO_PROTUNE_EV = 15;
GoPro.Settings.VideoProtuneEV = {
    M2: 8,
    M1C5: 7,
    M1: 6,
    M0C5: 5,
    P0: 4,
    P0C5: 3,
    P1: 2,
    P1C5: 1,
    P2: 0
};

GoPro.Settings.VIDEO_PROTUNE_ISO = 13;
GoPro.Settings.VideoProtuneIso = {
    I6400: 0,
    I1600: 1,
    I400: 2
};

GoPro.Settings.PHOTO_DEFAULT_SUB_MODE = 16;
GoPro.Settings.PHOTO_CURRENT_MODE = 69;
GoPro.Settings.PhotoSubmode = {
    Single: 0,
    Continuous: 1,
    Night: 2
};

GoPro.Settings.PHOTO_CONTINUOUS_INTERVAL = 18;
GoPro.Settings.PhotoContinuousInterval = {
    I3SPS: 0,
    I5SPS: 1,
    I10SPS: 2
};

GoPro.Settings.PHOTO_RESOLUTION = 17;
GoPro.Settings.PhotoResolution = {
    R12MPWide: 0,
    R7MPWide: 1,
    R7MPMedium: 2,
    R5MPMedium: 3
};

GoPro.Settings.PHOTO_EXPOSURE_TIME = 19;
GoPro.Settings.PhotoExposureTime = {
    Auto: 0,
    E2S: 5,
    E5S: 6,
    E10S: 1,
    E15S: 2,
    E20S: 3,
    E30S: 4
};

GoPro.Settings.PHOTO_SPOT_METER = 20;
GoPro.Settings.PhotoSpotMeter = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.PHOTO_PROTUNE = 20;
GoPro.Settings.PhotoProtune = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.PHOTO_PROTUNE_WHITE_BALANCE = 22;
GoPro.Settings.PhotoProtuneWhiteBalance = {
    Auto: 0,
    B3000K: 1,
    B5500K: 2,
    B6500K: 3,
    Native: 4
};

GoPro.Settings.PHOTO_PROTUNE_COLOR = 23;
GoPro.Settings.PhotoProtuneColor = {
    GoProColor: 0,
    Flat: 1
};

GoPro.Settings.PHOTO_PROTUNE_SHARPNESS = 25;
GoPro.Settings.PhotoProtuneSharpness = {
    High: 0,
    Medium: 1,
    Low: 2
};

GoPro.Settings.PHOTO_PROTUNE_EV = 26;
GoPro.Settings.PhotoProtuneEV = {
    M2: 8,
    M1C5: 7,
    M1: 6,
    M0C5: 5,
    P0: 4,
    P0C5: 3,
    P1: 2,
    P1C5: 1,
    P2: 0
};

GoPro.Settings.PHOTO_PROTUNE_ISO = 24;
GoPro.Settings.PhotoProtuneIso = {
    I800: 0,
    I400: 1,
    I200: 2,
    I100: 3
};

GoPro.Settings.BURST_DEFAULT_MODE = 27;
GoPro.Settings.BURST_CURRENT_MODE = 70;
GoPro.Settings.BurstMode = {
    Burst: 0,
    Timelapse: 1,
    Nightlapse: 2
};

GoPro.Settings.BURST_RATE = 29;
GoPro.Settings.BurstRate = {
    R3P1S: 0,
    R5P1S: 1,
    R10P1S: 2,
    R10P2S: 3,
    R10P3S: 4,
    R30P1S: 5,
    R30P2S: 6,
    R30P3S: 7
};

GoPro.Settings.BURST_TIMELAPSE_INTERVAL = 30;
GoPro.Settings.BurstTimelapseInterval = {
    I0C5S: 0,
    I1S: 1,
    I2S: 2,
    I5S: 3,
    I10S: 4,
    I30S: 5,
    I60S: 6
};


GoPro.Settings.BURST_NIGHTLAPSE_INTERVAL = 32;
GoPro.Settings.BurstNightlapseInterval = {
    I15S: 1,
    I20S: 2,
    I30S: 3,
    I60S: 4,
    I2M: 5,
    I5M: 6,
    I30M: 7,
    I60M: 8,
    Continuous: 9
};

GoPro.Settings.BURST_RESOLUTION = 28;
GoPro.Settings.BurstResolution = {
    R12MPWide: 0,
    R7MPWide: 1,
    R7MPMedium: 2,
    R5MPMedium: 3
};

GoPro.Settings.BURST_EXPOSURE_TIME = 31;
GoPro.Settings.BurstExposureTime = {
    Auto: 0,
    E2S: 5,
    E5S: 6,
    E10S: 1,
    E15S: 2,
    E20S: 3,
    E30S: 4
};

GoPro.Settings.BURST_SPOT_METER = 33;
GoPro.Settings.BurstSpotMeter = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.BURST_PROTUNE = 34;
GoPro.Settings.BurstProtune = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.BURST_PROTUNE_WHITE_BALANCE = 35;
GoPro.Settings.BurstProtuneWhiteBalance = {
    Auto: 0,
    B3000K: 1,
    B5500K: 2,
    B6500K: 3,
    Native: 4
};

GoPro.Settings.BURST_PROTUNE_COLOR = 36;
GoPro.Settings.BurstProtuneColor = {
    GoProColor: 0,
    Flat: 1
};

GoPro.Settings.BURST_PROTUNE_SHARPNESS = 38;
GoPro.Settings.BurstProtuneSharpness = {
    High: 0,
    Medium: 1,
    Low: 2
};

GoPro.Settings.BURST_PROTUNE_EV = 39;
GoPro.Settings.BurstProtuneEV = {
    M2: 8,
    M1C5: 7,
    M1: 6,
    M0C5: 5,
    P0: 4,
    P0C5: 3,
    P1: 2,
    P1C5: 1,
    P2: 0
};

GoPro.Settings.BURST_PROTUNE_ISO = 37;
GoPro.Settings.BurstProtuneIso = {
    I800: 0,
    I400: 1,
    I200: 2,
    I100: 3
};

GoPro.Settings.SETUP_LCD_DISPLAY = 72;
GoPro.Settings.SetupLcdDisplay = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.SETUP_LCD_BRIGHTNESS = 49;
GoPro.Settings.SetupLcdBrightness = {
    High: 0,
    Medium: 1,
    Low: 2
};

GoPro.Settings.SETUP_LCD_LOCK = 50;
GoPro.Settings.SetupLcdLock = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.SETUP_LCD_SLEEP = 51;
GoPro.Settings.SetupLcdSleep = {
    Never: 0,
    S1M: 1,
    S2M: 2,
    S3M: 3
};

GoPro.Settings.SETUP_ORIENTATION = 52;
GoPro.Settings.SetupOrientation = {
    UP: 1,
    DOWN: 2
};

GoPro.Settings.SETUP_DEFAULT_APP_MODE = 53;
GoPro.Settings.SetupDefaultAppMode = {
    Video: 0,
    Photo: 1,
    MultiShot: 2
};

GoPro.Settings.SETUP_QUICK_CAPTURE = 54;
GoPro.Settings.SetupQuickCapture = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.SETUP_LED_BLINK = 55;
GoPro.Settings.SetupLedBlink = {
    OFF: 0,
    L2: 1,
    L4: 2
};

GoPro.Settings.SETUP_BEEP_VOLUME = 56;
GoPro.Settings.SetupBeepVolume = {
    P100: 0,
    P70: 1,
    OFF: 2
};

GoPro.Settings.SETUP_VIDEO_FORMAT = 57;
GoPro.Settings.SetupVideoFormat = {
    NTSC: 0,
    PAL: 1
};

GoPro.Settings.SETUP_OSD = 58;
GoPro.Settings.SetupOSD = {
    ON: 1,
    OFF: 0
};

GoPro.Settings.SETUP_AUTO_POWER_DOWN = 59;
GoPro.Settings.SetupAutoPowerDown = {
    Never: 0,
    D1M: 1,
    D2M: 2,
    D3M: 3
};

GoPro.Settings.SETUP_WIRELESS_MODE = 63;
GoPro.Settings.SetupWirelessMode = {
    OFF: 0,
    App: 1,
    Rc: 2,
    Smart: 4
};

GoPro.Settings.SETUP_SECONDARY_STREAM_GOP_SIZE = 60;
GoPro.Settings.SetupSecondaryStreamGOPSize = {
    Default: 0,
    S3: 3,
    S4: 4,
    S8: 8,
    S15: 15,
    S30: 30
};

GoPro.Settings.SETUP_SECONDARY_STREAM_IDR_INTERVAL = 61;
GoPro.Settings.SetupSecondaryStreamIDRInterval = {
    Default: 0,
    I1: 1,
    I2: 2,
    I4: 4
};

GoPro.Settings.SETUP_SECONDARY_STREAM_BIT_RATE = 62;
GoPro.Settings.SetupSecondaryStreamBitRate = {
    S250KBPS: 250000,
    S400KBPS: 400000,
    S600KBPS: 600000,
    S800KBPS: 800000,
    S1MBPS: 1000000,
    S1C2MBPS: 1200000,
    S1C6MBPS: 1600000,
    S2MBPS: 2000000,
    S240000: 2400000
};

GoPro.Settings.SETUP_SECONDARY_STREAM_WINDOW_SIZE = 64;
GoPro.Settings.SetupSecondaryStreamWindowSize = {
    Defaut: 0,
    S240: 1,
    S240I3P4: 2,
    S240I1P2: 3,
    S480: 4,
    S480I3P4: 5,
    S480I1P2: 6
};
module.exports = GoPro;
#Main sources:

* https://gist.github.com/KonradIT
* https://github.com/citolen/goproh4/blob/master/lib/index.js
* http://goprouser.freeforums.org/hd4-to-app-pairing-has-changed-t20381.html
* https://gist.github.com/rulkens/21372e829aceb0dff7c3

#HERO4 Black Wifi hacking, ep 1

URL for streaming: http://10.5.5.9/gp/gpExec?p1=gpTsFeeder&a1=%22%22&c1=restart&p2=gpStream&a2=%22%22&c2=restart

###Android decopilation APK

*Seems like apk have mix of an old and new api? Most of this methods didn't works on gopro4*

* AUDIO_INPUT_MODE: http://10.5.5.9/camera/AI
* AUTO_POWER_OFF: http://10.5.5.9/camera/AO
* BACPAC_BATTERY_LEVEL: http://10.5.5.9/bacpac/blx
* BACPAC_CV: http://10.5.5.9/bacpac/cv
* BRACKETING_MODE: http://10.5.5.9/camera/BR
* BROADCAST_SETTING: http://10.5.5.9/camera/BX
* BURST_MODE: http://10.5.5.9/camera/BU
* CAMERA_BATTERY_LEVEL: http://10.5.5.9/camera/blx
* CAMERA_POWER: http://10.5.5.9/bacpac/PW
* CAMERA_VERSION: http://10.5.5.9/camera_version
* COLOR: http://10.5.5.9/camera/CO
* CONTINUOUS_SHOT: http://10.5.5.9/camera/CS
* DEFAULT_AT_POWER_UP: http://10.5.5.9/camera/DM
* DELETE_ALL: http://10.5.5.9/camera/DA
* DELETE_FILE: http://10.5.5.9/camera/DF
* DELETE_GROUP: http://10.5.5.9/camera/DG
* DELETE_LAST_FILE: http://10.5.5.9/camera/DL
* DUAL_HERO_BACPAC_MAJOR_VERSION: http://10.5.5.9/dual_hero_bacpac_major_version
* DUAL_HERO_BACPAC_MINOR_VERSION: http://10.5.5.9/dual_hero_bacpac_minor_version
* EDIT_CAMERA_NAME: http://10.5.5.9/camera/CN
* EXPOSURE_COMPENSATION: http://10.5.5.9/camera/EV
* EXTERNAL_BATTERY_LEVEL: http://10.5.5.9/external_battery
* FIELD_OF_VIEW: http://10.5.5.9/camera/FV
* FRAME_RATE: http://10.5.5.9/camera/FS
* GAIN: http://10.5.5.9/camera/GA
* HLS_SEGMENT_SIZE: http://10.5.5.9/camera/SS
* IS_BOMBIE_ATTACHED: http://10.5.5.9/bombie_attached
* IS_BROADCASTING: http://10.5.5.9/is_boradcasting
* IS_LCD_ATTACHED: http://10.5.5.9/lcd_attached
* IS_LIVE_FEED: http://10.5.5.9/is_live_feed
* IS_PREVIEW_ACTIVE: http://10.5.5.9/is_preview_active
* IS_PREVIEW_AVAILABLE: http://10.5.5.9/is_preview_available
* IS_PROTUNE_CUSTOM: http://10.5.5.9/is_protune_custom
* IS_SD_ERROR: http://10.5.5.9/is_sderror
* IS_UPLOADING: http://10.5.5.9/is_uploading
* LCD_BRIGHTNESS: http://10.5.5.9/camera/LN
* LCD_SLEEP_TIMER: http://10.5.5.9/camera/LS
* LCD_VOLUME: http://10.5.5.9/camera/LV
* LED: http://10.5.5.9/camera/LB
* LOCATE_CAMERA_TOGGLE: http://10.5.5.9/camera/LL
* LOOPING_VIDEO_MODE: http://10.5.5.9/camera/LO
* LOW_LIGHT: http://10.5.5.9/camera/LW
* MICROPHONE_MODE: http://10.5.5.9/camera/MM
* MODE: http://10.5.5.9/camera/CM
* NTSC_PAL: http://10.5.5.9/camera/VM
* ONE_BUTTON_MODE: http://10.5.5.9/camera/OB
* ON_SCREEN_DISPLAY_OSD: http://10.5.5.9/camera/DS
* OTA_CANCELLED: http://10.5.5.9/ota_cancelled
* OTA_FW_UPDATE_MODE: http://10.5.5.9/camera/OM
* OTA_INITIATE_UPDATE: http://10.5.5.9/camera/OF
* PHOTO_IN_V* IDEO: http://10.5.5.9/camera/PN
* PHOTO_RESOLUTION: http://10.5.5.9/camera/PR
* PLAYBACK_MODE: http://10.5.5.9/camera/PM
* PLAYBACK_POSITION: http://10.5.5.9/camera/PB
* PREVIEW: http://10.5.5.9/camera/PV
* PROTUNE: http://10.5.5.9/camera/PT
* PROTUNE_RESET_TO_DEFAULT: http://10.5.5.9/reset_default_advanced_settings
* SECONDARY_CAMERA_AVAILABLE_PHOTO_COUNT: http://10.5.5.9/secondary_camera_available_photo_count
* SECONDARY_CAMERA_AVAILABLE_VIDEO_MINUTES: http://10.5.5.9/secondary_camera_available_v* IDeo_minutes
* SECONDARY_CAMERA_BATTERY_LEVEL: http://10.5.5.9/secondary_camera_battery_level
* SECONDARY_CAMERA_IS_SD_ERROR: http://10.5.5.9/secondary_camera_is_sderror
* SECONDARY_CAMERA_STORED_PHOTO_COUNT: http://10.5.5.9/secondary_camera_stored_photo_count
* SECONDARY_CAMERA_STORED_VIDEO_COUNT: http://10.5.5.9/secondary_camera_stored_v* IDeo_count
* SET_DATE_AND_TIME: http://10.5.5.9/camera/TM
* SET_WIFI_MODE: http://10.5.5.9/bacpac/WI
* SHARPNESS: http://10.5.5.9/camera/SP
* SHUTTER: http://10.5.5.9/bacpac/SH
* SLIDESHOW_SETTING: http://10.5.5.9/camera/PS
* SOUND: http://10.5.5.9/camera/BS
* SPOT_METER: http://10.5.5.9/camera/EX
* THREE_D_CAMERAS_INCOMPATIBLE: http://10.5.5.9/camera_3D_incompatible
* THREE_D_READY: http://10.5.5.9/camera_3D_ready
* TIME_LAPSE: http://10.5.5.9/camera/TI
* TIME_LAPSE_STYLE: http://10.5.5.9/camera/TS
* UP_DOWN: http://10.5.5.9/camera/UP
* USB_MODE: http://10.5.5.9/camera/UM
* VIDEO_LOOP_COUNTER: http://10.5.5.9/v* IDeo_loop_counter
* VIDEO_RESOLUTION: http://10.5.5.9/camera/VV
* VIDEO_RESOLUTION_AND_RATE: http://10.5.5.9/camera/VR
* WHITE_BALANCE: http://10.5.5.9/camera/WB
* WIFI_CONFIGURE: http://10.5.5.9/bacpac/WP
* WIFI_RESET_MODULE: http://10.5.5.9/bacpac/RS
* WIFI_SSID: http://10.5.5.9/bacpac_SSID
* WIFI_VERSION: http://10.5.5.9/bacpac_version

---

###Firmware studies

*seems like prefix must be http://10.5.5.9/gp/gpControl/command/... !*

* ID: GPCAMERA_SHUTTER, Name: Start or stop capture, URL: http://10.5.5.9/command/shutter
* ID: GPCAMERA_XMODE, Name: Set Mode and Sub-Mode, URL: http://10.5.5.9/command/xmode
* ID: GPCAMERA_MODE, Name: Set Mode, URL: http://10.5.5.9/command/mode
* ID: GPCAMERA_SUBMODE, Name: Set Mode and Sub-Mode, URL: http://10.5.5.9/command/sub_mode
* ID: GPCAMERA_POWER_ID, Name: Power Off Camera, URL: http://10.5.5.9/command/system/sleep
* ID: GPCAMERA_FWUPDATE_DOWNLOAD_START, Name: Notify start FW Update File Download, URL: http://10.5.5.9/command/fwupdate/download/start
* ID: GPCAMERA_FWUPDATE_DOWNLOAD_DONE, Name: Notify completion of FW Update File Download, URL: http://10.5.5.9/command/fwupdate/download/done
* ID: GPCAMERA_FWUPDATE_DOWNLOAD_CANCEL, Name: Cancel FW Update File Download, URL: http://10.5.5.9/command/fwupdate/download/cancel
* ID: GPCAMERA_FACTORY_RESET, Name: Reset to Factory Defaults, URL: http://10.5.5.9/command/system/factory/reset
* ID: GPCAMERA_SLEEP, Name: Power Saving Sleep Mode, URL: http://10.5.5.9/command/system/sleep
* ID: GPCAMERA_USE_CURRENT_WIRELESS_REMOTE_ID, Name: Use with Current Wi-Fi Remote, URL: http://10.5.5.9/setting/63/2
* ID: GPCAMERA_USE_NEW_WIRELESS_REMOTE_ID, Name: Use with New Wi-Fi Remote, URL: http://10.5.5.9/command/wireless/rc/pair
* ID: GPCAMERA_VIDEO_PROTUNE_RESET_TO_DEFAULT, Name: Reset to Default, URL: http://10.5.5.9/command/v* IDeo/protune/reset
* ID: GPCAMERA_MULTISHOT_PROTUNE_RESET_TO_DEFAULT, Name: Reset to Default, URL: http://10.5.5.9/command/multi_shot/protune/reset
* ID: GPCAMERA_PHOTO_PROTUNE_RESET_TO_DEFAULT, Name: Reset to Default, URL: http://10.5.5.9/command/photo/protune/reset
* ID: GPCAMERA_SET_DATE_AND_TIME_ID, Name: Set Date and Time, URL: http://10.5.5.9/command/setup/date_time
* ID: GPCAMERA_DELETE_LAST_FILE_ID, Name: Delete Last File, URL: http://10.5.5.9/command/storage/delete/last
* ID: GPCAMERA_DELETE_ALL_FILES_ID, Name: Delete All Files from SD Card, URL: http://10.5.5.9/command/storage/delete/all
* ID: GPCAMERA_DELETE_FILE_ID, Name: Delete File, URL: http://10.5.5.9/command/storage/delete
* ID: GPCAMERA_LOCATE_ID, Name: Locate Camera, URL: http://10.5.5.9/command/system/locate
* ID: GPCAMERA_NETWORK_NAME_ID, Name: Name, URL: http://10.5.5.9/command/wireless/ap/SSID
* ID: GPCAMERA_AP_CONTROL, Name: Control Wi-Fi AP, URL: http://10.5.5.9/command/wireless/ap/control
* ID: GPCAMERA_INFO_VERSION_ID, Name: Version, URL: http://10.5.5.9camera_version
* ID: GPCAMERA_NETWORK_VERSION_ID"d1öñéMeˆŽ Xisplay_name":"Version, URL: http://10.5.5.9bacpac_version
* ID: GPCAMERA_BATTERY_LEVEL_ID, Name: Battery Level, URL: http://10.5.5.9camera_battery
* ID: GPCAMERA_SDCARD_CAPACITY_ID, Name: SD Card Capacity, URL: http://10.5.5.9sd_card
* ID: GPCAMERA_TAG_MOMENT, Name: Tag Moment, URL: http://10.5.5.9/command/storage/tag_moment
* ID: GPCAMERA_RC_PAIR, Name: Pair with Known RC, URL: http://10.5.5.9/command/rc/pair
* ID: GPCAMERA_SSID_SCAN, Name: Start Wi-Fi SSID Scan, URL: http://10.5.5.9/command/wireless/SSID/scan
* ID: GPCAMERA_SSID_LIST, Name: Wi-Fi SSID Scan Results, URL: http://10.5.5.9/command/wireless/SSID/list
* ID: GPCAMERA_SSID_SELECT, Name: Connect to Wi-Fi SSID, URL: http://10.5.5.9/command/wireless/SSID/select
* ID: GPCAMERA_SSID_DELETE, Name: Delete Wi-Fi SSID from Known List, URL: http://10.5.5.9/command/wireless/SSID/delete"

---

###Also firmware studies

* description: Start real-time A/V stream using LTP, URL: http://10.5.5.9/gp/gpExec?p1=gpStreamA9&c1=restart
* description: Stop real-time A/V stream using LTP, URL: http://10.5.5.9/gp/gpExec?p1=gpStreamA9&c1=stop
* description: Supports listing of media on SD card, URL: http://10.5.5.9/gp/gpMediaList
* description: Supports extraction of metadata from a particular media file, URL: http://10.5.5.9/gp/gpMediaMetadata
* description: Supports OAuth2 cross-client authorization, URL: http://10.5.5.9/gp/gpPlatformAuth
* description: Supports client-assisted Over-the-Air firmware updating, URL: http://10.5.5.9/gp/gpUpdate

#GoPro HERO4 Black Wifi Hacking, ep 2

By Maelstrom Napalm, @odwdinc and Konrad Iturbe

###Status URL:

http://10.5.5.9/gp/gpControl/status

####Protune EV compensation:
Value | URL
-----|-------
+2   |  http://10.5.5.9/gp/gpControl/setting/26/0
+1.5 |  http://10.5.5.9/gp/gpControl/setting/26/1
+1   |  http://10.5.5.9/gp/gpControl/setting/26/2
+0.5 |  http://10.5.5.9/gp/gpControl/setting/26/3
0    |  http://10.5.5.9/gp/gpControl/setting/26/4
-0.5 |  http://10.5.5.9/gp/gpControl/setting/26/5
-1   |  http://10.5.5.9/gp/gpControl/setting/26/6
-1.5 |  http://10.5.5.9/gp/gpControl/setting/26/7
-2   |  http://10.5.5.9/gp/gpControl/setting/26/8 

####Modes:
* Video: http://10.5.5.9/gp/gpControl/command/xmode?p=0
* Photo: http://10.5.5.9/gp/gpControl/command/xmode?p=1
* Burst: http://10.5.5.9/gp/gpControl/command/xmode?p=2
* Timelapse: http://10.5.5.9/gp/gpControl/command/xmode?p=3

###Power:

* Power Off: http://10.5.5.9/gp/gpControl/command/system/sleep

####Modes:
* Photo: http://10.5.5.9/gp/gpControl/command/xmode?p=1
* Burst: http://10.5.5.9/gp/gpControl/command/xmode?p=2
* Continuous:  http://10.5.5.9/gp/gpControl/command/xmode?p=12
* 
* Night: Video: http://10.5.5.9/gp/gpControl/command/xmode?p=13
* Night Laps: http://10.5.5.9/gp/gpControl/command/xmode?p=14
* Timelapse: http://10.5.5.9/gp/gpControl/command/xmode?p=3
* 
* PlayBack: http://10.5.5.9/gp/gpControl/command/xmode?p=5
* 
* Setup: http://10.5.5.9/gp/gpControl/command/xmode?p=7
* 
* Video: http://10.5.5.9/gp/gpControl/command/xmode?p=0
* VideoTimeLaps: http://10.5.5.9/gp/gpControl/command/xmode?p=9
* Video+Photo:  http://10.5.5.9/gp/gpControl/command/xmode?p=10
* Looping: http://10.5.5.9/gp/gpControl/command/xmode?p=11


####Modes2:
* Video: http://10.5.5.9/gp/gpControl/command/mode?p=0
* Photo: http://10.5.5.9/gp/gpControl/command/mode?p=1
* Night: http://10.5.5.9/gp/gpControl/command/mode?p=2
* PlayBack: http://10.5.5.9/gp/gpControl/command/mode?p=4
* Setup: http://10.5.5.9/gp/gpControl/command/mode?p=5

###Power:
* Power Off: http://10.5.5.9/gp/gpControl/command/system/sleep


###Frame Rate:
* 120fps:    http://10.5.5.9/gp/gpControl/setting/3/0
* 90fps:    http://10.5.5.9/gp/gpControl/setting/3/3
* 60fps:    http://10.5.5.9/gp/gpControl/setting/3/5
* 48fps:    http://10.5.5.9/gp/gpControl/setting/3/7
* 30fps:    http://10.5.5.9/gp/gpControl/setting/3/8
* 24fps:    http://10.5.5.9/gp/gpControl/setting/3/10

###Field Of View:
* Wide: http://10.5.5.9/gp/gpControl/setting/4/0
* Medium: http://10.5.5.9/gp/gpControl/setting/4/1
* Narrow: http://10.5.5.9/gp/gpControl/setting/4/2

###Low Light:
* ON: http://10.5.5.9/gp/gpControl/setting/8/1
* OFF: http://10.5.5.9/gp/gpControl/setting/8/0


###Recording:
* Start Video http://10.5.5.9/gp/gpControl/command/shutter?p=1
* Stop Video http://10.5.5.9/gp/gpControl/command/shutter?p=0

Tag moment:

http://10.5.5.9/gp/gpControl/command/storage/tag_moment

To be continued...
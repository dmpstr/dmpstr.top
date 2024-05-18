---
title: "How to make a building TWRP tree"
description: "This guide shows you how to make a TWRP tree that can build"
published: "18 May 2024"
tags: ["recovery", "twrp", "android"]
---

This guide should (hopefully) help you on getting your trees building.

## <a name="top"></a> Table of Contents

- [Prerequisites](#Prerequisites)
- [Preparing your environment](#Environment)
- [Getting a base tree](#Tree1)
- [Fixing it to make it build](#TreePreparation)
- [Building](#Building)
- [Flashing and Testing](#Testing)

---

# <a name="Prerequisites"></a>Prerequisites
## What you will need
- Ubuntu 20.04 LTS+ (or any distro, you are on your own)
- A beefy machine (16gb ram, 4 cores minimum)
- An android device with its ROM files[^1]
- Time
- Brainpower

[^1]: You will need to dump the device trees so you can generate a TWRP tree.

# <a name="Environment"></a>Preparing your Environment
## Preparing git and repo

### Git
On your shell, type this command:
```bash
$ sudo apt-get install git -y
```

### Repo
On your shell, type these commands:
```bash
$ mkdir -p ~/.bin
$ PATH="${HOME}/.bin:${PATH}"
$ curl https://storage.googleapis.com/git-repo-downloads/repo > ~/.bin/repo
$ chmod a+rx ~/.bin/repo
```

## Preparing build dependencies
On your shell, paste this command:
```bash
$ sudo apt-get update && sudo apt-get full-upgrade -y && sudo apt-get install bc bison build-essential ccache curl flex g++-multilib gcc-multilib git git-lfs gnupg gperf imagemagick lib32readline-dev lib32z1-dev libelf-dev liblz4-tool libsdl1.2-dev libssl-dev libxml2 libxml2-utils lzop pngcrush rsync schedtool squashfs-tools xsltproc zip zlib1g-dev --install-recommends
```

## Preparing TWRP manifest
On your shell, paste these commands:
```bash
$ mkdir twrp && cd twrp
$ repo init --depth=1 -u https://github.com/minimal-manifest-twrp/platform_manifest_twrp_aosp.git -b twrp-12.1
$ repo sync
```

# <a name="Tree1"></a>Getting a base tree
Remember the ROM .zip you have? We're gonna dump it!

## How to dump using OkBuddyGSI's bot
1. Upload your ROM onto any filehost.
2. Join the OkBuddyGSI group [here.](https://t.me/OkBuddyGSI)
3. On the chat, type `/dump` and then paste the file URL after.
It should look like this:
```
/dump https://cdnorg.d.miui.com/V12.5.12.0.RCOEUXM/ginkgo_eea_global_images_V12.5.12.0.RCOEUXM_20221127.0000.00_11.0_eea_fdd5e37d21.tgz
```
Of course, the URL will be different from this example.

After dumping, grab the dumps URL and clone it. You should have your device's dump in your current directory.

## Uploading the tree to git
After cd'ing into the dump, follow these steps:
1. cd into `twrp-device-tree/vendor/codename`
vendor will be the OEM, in this case, `moondrop`
codename will be the device's codename, in this case, `MD_PH_001`

2. Initalize a git project inside the twrp tree
```
git init
git add *
git commit -m "Import tree"
git branch -M twrp
git remote add origin https://git.service/user/repo.git
git push -u origin twrp
```

`git.service` will be what git server you use, `user` is your username in that server, and `repo` being the repo name

# <a name="TreePreparation"></a>Fixing it to make it build
## Common Problems

### `add_lunch_combo` is deprecated
`vendorsetup.sh`
```diff
- add_lunch_combo twrp_MD_PH_001-userdebug
- add_lunch_combo twrp_MD_PH_001-user
- add_lunch_combo twrp_MD_PH_001-env
```

AndroidProducts.mk
```diff
+ COMMON_LUNCH_CHOICES :=  \
+     twrp_MD_PH_001-userdebug \
+     twrp_MD_PH_001-user \
+     twrp_MD_PH_001-eng
```

### `PRODUCT_STATIC_BOOT_CONTROL_HAL` is obsolete

device.mk
```diff
diff --git a/device.mk b/device.mk
index b61e3dc..f7ef666 100644
--- a/device.mk
+++ b/device.mk
@@ -16,16 +16,13 @@ AB_OTA_POSTINSTALL_CONFIG += \
 # Boot control HAL
 PRODUCT_PACKAGES += \
     android.hardware.boot@1.0-impl \
+    android.hardware.boot@1.0-impl.recovery \
+    bootctrl.mt6877 \
+    bootctrl.mt6877.recovery \
     android.hardware.boot@1.0-service
 
 PRODUCT_PACKAGES += \
-    bootctrl.mt6877
-
-PRODUCT_STATIC_BOOT_CONTROL_HAL := \
-    bootctrl.mt6877 \
-    libgptutils \
-    libz \
-    libcutils
+    bootctrl
 
 PRODUCT_PACKAGES += \
     otapreopt_script \
```

# <a name="Building"></a>Building
On the same twrp folder we made, paste these commands:
```bash
$ export ALLOW_MISSING_DEPENDENCIES=true
$ . build/envsetup.sh
$ lunch twrp_<device>-eng
```
`<device>` (without the brackets) should be your device's codename.

If lunch is successful, continue with building by typing
```bash
mka <target>
```
Target will differ on different devices.

If `BOARD_USES_RECOVERY_AS_BOOT` is present in your `BoardConfig.mk` then `bootimage` is your target.

Else, its either `recoveryimage` or `vendorbootimage`.

# <a name="Testing"></a>Flashing and Testing
## Fastboot
Once you're in fastboot mode, open up a shell and then:
```bash
# For bootimage
$ fastboot flash boot boot.img

# For recoveryimage
$ fastboot flash recovery recovery.img

# For vendorbootimage
$ fastboot flash vendor_boot vendor_boot.img
```

After flashing, manually restart to recovery or Android will override recovery(!!!)

## Odin/Heimdall
After getting the `recovery.img`, open up 7zip and archive as a tar.
In Odin, flash as AP. After flashing, manually restart to recovery or Android will override the recovery(!!!)




You should now have TWRP held on by hopes and dreams!

---

# Footnotes

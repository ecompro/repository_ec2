'use strict';

(function () {
    var app = {
        data: {}
    };

    var bootstrap = function () {
        $(function () {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'flat',
                initial: 'components/home/view.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            var element = document.getElementById('appDrawer');
            if (typeof (element) != 'undefined' && element !== null) {
                if (window.navigator.msPointerEnabled) {
                    $('#navigation-container').on('MSPointerDown', 'a', function (event) {
                        app.keepActiveState($(this));
                    });
                } else {
                    $('#navigation-container').on('touchstart', 'a', function (event) {
                        app.keepActiveState($(this));
                    });
                }
            }

            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li a.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function () {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());

// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

(function () {

    //    ble.scan([], 5, function (device) {
    //        console.log(JSON.stringify(device));
    //    }, failure);


    My.Scan = function () {
        exports.defineAutoTests = function () {

            describe('BLE object', function () {
                it("ble should exist", function () {
                    expect(ble).toBeDefined();
                });

                it("should contain a startScan function", function () {
                    expect(typeof ble.startScan).toBeDefined();
                    expect(typeof ble.startScan).toBe("function");
                });
            });

        };

        exports.defineManualTests = function (contentEl, createActionButton) {

            createActionButton('Is Bluetooth Enabled?', function () {

                ble.isEnabled(
                    function () {
                        console.log("Bluetooth is enabled");
                    },
                    function () {
                        console.log("Bluetooth is *not* enabled");
                    }
                );
            });


            if (cordova.platformId !== 'ios') {

                // not supported on iOS
                createActionButton('Show Bluetooth Settings', function () {
                    ble.showBluetoothSettings();
                });

                // not supported on iOS
                createActionButton('Enable Bluetooth', function () {

                    ble.enable(
                        function () {
                            console.log("Bluetooth is enabled");
                        },
                        function () {
                            console.log("The user did *not* enable Bluetooth");
                        }
                    );
                });

            }

            createActionButton('Scan', function () {

                var scanSeconds = 5;
                console.log("Scanning for BLE peripherals for " + scanSeconds + " seconds.");
                ble.startScan([], function (device) {
                    console.log(JSON.stringify(device));
                }, function (reason) {
                    console.log("BLE Scan failed " + reason);
                });

                setTimeout(ble.stopScan,
                    scanSeconds * 1000,
                    function () {
                        console.log("Scan complete");
                    },
                    function () {
                        console.log("stopScan failed");
                    }
                );

            });

        };
    }
}());

// END_CUSTOM_CODE_kendoUiMobileApp
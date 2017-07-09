"use strict";
var ValidatorService = (function () {
    function ValidatorService() {
    }
    ValidatorService.email = function (control) {
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = regEx.test(control.value);
        return valid ? null : { email: true };
    };
    ValidatorService.shouldBeUnique = function (control) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (control.value == "aaa@aaa.aaa")
                    resolve({ shouldBeUnique: true });
                else
                    resolve(null);
            }, 1000);
        });
    };
    ValidatorService.cannotContainSpace = function (control) {
        if (control.value.indexOf(' ') >= 0)
            return { cannotContainSpace: true };
        return null;
    };
    return ValidatorService;
}());
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=ValidatorService.js.map
var Page = require('astrolabe').Page;
var _ = require('lodash');

/**
 * @namespace
 * @description Functionality for interacting with modals. It is up to you to launch a modal, but once
 * it's open, these functions will become useful.
 */
var rxModalAction = {

    rootElement: {
        get: function () {
            return $('.modal');
        }
    },

    btnSubmit: {
        get: function () {
            return this.rootElement.$('.submit');
        }
    },

    btnCancel: {
        get: function () {
            return this.rootElement.$('.cancel');
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the modal is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isPresent();
        }
    },

    /**
     * @instance
     * @type {String}
     * @description The modal's title.
     */
    title: {
        get: function () {
            return this.rootElement.$('.modal-title').getText();
        }
    },

    /**
     * @instance
     * @description The modal's subtitle.
     * @type {String}
     */
    subtitle: {
        get: function () {
            return this.rootElement.$('.modal-subtitle').getText();
        }
    },

    /**
     * @description Closes the modal by clicking the little "x" in the top right corner.
     * @instance
     * @function
     */
    close: {
        value: function () {
            this.rootElement.$('.modal-close').click();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the modal can be submitted in its current state.
     * @returns {Boolean}
     */
    canSubmit: {
        value: function () {
            return this.btnSubmit.getAttribute('disabled').then(function (isDisabled) {
                return isDisabled === null;
            });
        }
    },

    /**
     * @description Clicks the "submit" button. This isn't exactly what you think it is in a multi-step modal!
     * @function
     * @instance
     */
    submit: {
        value: function () {
            this.btnSubmit.click();
        }
    },

    /**
     * @description Cancels out of the current modal by clicking the "cancel" button.
     * @function
     * @instance
     */
    cancel: {
        value: function () {
            exports.rxMisc.slowClick(this.btnCancel);
        }
    }

};

exports.rxModalAction = {

    /**
     * @description By default, every modal will have a title, subtitle, a submit button, a cancel button, and more.
     * However, you will likely have some custom form elements in a modal, and you'll need to define those
     * as a page object ahead of time. Pass in an object that represents your modal's custom elements
     * and it'll be included with the rest of the modal page object here. {@link rxFeedback} uses rxModal under
     * the hood to provide a few custom form elements on top of this page object, if you need to reference an example.
     * @function
     * @memberof rxModalAction
     * @see rxFeedback
     * @param {Object} [customFunctionality={}] - Page object to extend on top of {@link rxModalAction}.
     * @returns {rxModalAction}
     * @example
     * var customFunctionalty = {
     *     txtNewPassword: {
     *         get: function () {
     *             // `this.rootElement` is never defined here.
     *             // This is perfectly normal. `this.rootElement` will be available
     *             // when it is applied to the default modal, which has a rootElement.
     *             return this.rootElement.element(by.model('fields.password'));
     *         }
     *     },
     *
     *     txtErrorMessage: {
     *         get: function () {
     *             return this.rootElement.$('.error-message');
     *         }
     *     },
     *
     *     newPassword: {
     *         get: function () {
     *             return this.txtNewPassword.getAttribute('value');
     *         },
     *         set: function (password) {
     *             this.txtNewPassword.clear();
     *             this.txtNewPassword.sendKeys(password);
     *         }
     *     }
     * };
     *
     * // this modal not only has a close button, title, etc...
     * // but also a couple of form elements for checking an old password and a new password.
     * changePasswordModal = modal.initialize(customFunctionalty);
     */
    initialize: function (customFunctionality) {
        if (!_.isObject(customFunctionality)) {
            customFunctionality = {};
        }
        return Page.create(_.merge(customFunctionality, rxModalAction));
    }

};

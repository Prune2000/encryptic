/**
 * @module behavior/ModalForm
 */
import {Behavior} from 'backbone.marionette';
import _ from 'underscore';

/**
 * Modal form behavior.
 *
 * Example usage in:
 *   components/fileDialog/View.js
 *   components/linkDialog/views/View.js
 *   components/notebooks/form/notebook/View.js
 *   components/notebooks/form/tag/View.js
 *
 *
 * @class
 * @extends Marionette.Behavior
 * @license MPL-2.0
 */
export default class ModalForm extends Behavior {

    get uiFocus() {
        return this.view.uiFocus || 'name';
    }

    triggers() {
        return {
            'submit form'      : 'save',
            'click .ok'        : 'save',
            'click .cancelBtn' : 'cancel',
        };
    }

    modelEvents() {
        return {
            invalid: 'showErrors',
        };
    }

    constructor(...args) {
        super(...args);

        this.events = {
            [`keyup @ui.${this.uiFocus}`]: 'closeOnEsc',
        };
    }

    /**
     * Focus on an ui element.
     */
    onShownModal() {
        this.view.ui[this.uiFocus].focus();
    }

    /**
     * Trigger "cancel" event if user hits Escape.
     */
    closeOnEsc(e) {
        if (e.which === 27) {
            this.view.trigger('cancel');
        }
    }

    /**
     * Indicate that validation errors occured by highlighting
     * form elements with red color.
     *
     * @param {Object} data
     * @param {Object} data.errors
     */
    showErrors(data) {
        _.each(data.errors, err => {
            this.view.ui[err].parent().addClass('has-error');
        });
    }

}

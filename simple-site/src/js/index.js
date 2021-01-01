import moment from 'moment';
import jQuery from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';

console.log("Hello from JavaScript!");
console.log(moment().startOf('day').fromNow());

var name = "Bob", time = "today";
console.log(`Hello ${name}, how are you ${time}?`);

jQuery(function() {
    jQuery('body').css('color', 'blue');
});

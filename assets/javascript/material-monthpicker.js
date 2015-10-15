/* Generated by Babel */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MaterialMonthpicker = (function () {
  function MaterialMonthpicker(element, settings) {
    var _this = this;

    _classCallCheck(this, MaterialMonthpicker);

    var defaults = {
      orientation: 'landscape', // landscape, portait
      primaryColor: 'rgba(0, 150, 136, 1)', //css color value
      theme: 'light', // light, dark
      date: new Date(),
      pickerFormat: "mmm",
      outputFormat: "{mm}/{yyyy}",
      lang: 'en', // en, de, it, ..
      buttons: true // boolean
    };

    this.settings = Object.assign(defaults, settings);
    this.date = this.settings.date;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", 'https://rawgit.com/FreddyFY/material-datepicker/master/src/translations/' + this.settings.lang + '.json', true);
    var i18nn;
    xmlhttp.addEventListener("readystatechange", function () {
      if (xmlhttp.readyState == 4) {
        _this.i18n = JSON.parse(xmlhttp.responseText);
        loaded();
      }
    });
    xmlhttp.send();

    var loaded = function loaded() {
      if (typeof element == 'string') {
        _this.element = document.querySelector('' + element);
      } else {
        _this.element = element;
      }
      _this.define();
    };
  }

  _createClass(MaterialMonthpicker, [{
    key: 'define',
    value: function define() {
      var _this2 = this;

      this.createElement();

      this.element.addEventListener('click', function () {
        _this2.open();
      });
    }
  }, {
    key: 'createElement',
    value: function createElement() {
      var _this3 = this;

      this.position = this.element.getBoundingClientRect();

      this.picker = document.createElement('div');
      this.picker.setAttribute('class', 'mp-monthpicker mp-picker');
      this.picker.setAttribute('data-theme', this.settings.theme);
      this.picker.setAttribute('data-orientation', this.settings.orientation);
      this.picker.style.top = this.position.top + this.position.height + 10 + 'px';
      this.picker.style.left = this.position.left + 'px';

      var containerInfo = document.createElement('div');
      containerInfo.setAttribute('class', 'mp-picker-info');
      this.picker.appendChild(containerInfo);

      var containerPicker = document.createElement('div');
      containerPicker.setAttribute('class', 'mp-picker-picker');
      this.picker.appendChild(containerPicker);

      //Info
      var containerInfoYear = document.createElement('span');
      containerInfoYear.setAttribute('class', 'mp-info-year mp-info-first');
      containerInfo.appendChild(containerInfoYear);

      var containerInfoMonth = document.createElement('span');
      containerInfoMonth.setAttribute('class', 'mp-info-month mp-info-second');
      containerInfo.appendChild(containerInfoMonth);

      //picker
      var containerPickerYear = document.createElement('div');
      containerPickerYear.setAttribute('class', 'mp-picker-year');
      containerPicker.appendChild(containerPickerYear);

      var containerPickerYearBefore = document.createElement('a');
      containerPickerYearBefore.setAttribute('class', 'mp-picker-year-before mp-picker-year-button');
      containerPickerYear.appendChild(containerPickerYearBefore);
      containerPickerYearBefore.addEventListener('click', function () {
        _this3.yearChange(-1);
      });

      var containerPickerYearThis = document.createElement('span');
      containerPickerYearThis.setAttribute('class', 'mp-picker-year-this mp-animate');
      containerPickerYear.appendChild(containerPickerYearThis);

      var containerPickerYearNext = document.createElement('a');
      containerPickerYearNext.setAttribute('class', 'mp-picker-year-next mp-picker-year-button');
      containerPickerYear.appendChild(containerPickerYearNext);
      containerPickerYearNext.addEventListener('click', function () {
        _this3.yearChange(+1);
      });

      var containerPickerChoose = document.createElement('div');
      containerPickerChoose.setAttribute('class', 'mp-picker-choose mp-animate');
      containerPicker.appendChild(containerPickerChoose);

      var _loop = function (i) {
        var containerPickerChooseMonth = document.createElement('a');
        containerPickerChooseMonth.setAttribute('class', 'mp-picker-choose-month-' + i);
        containerPickerChooseMonth.innerHTML = _this3.i18n[_this3.settings.pickerFormat][i];
        containerPickerChoose.appendChild(containerPickerChooseMonth);

        containerPickerChooseMonth.addEventListener('click', function () {
          var month = i;
          var nextDate = _this3.date;
          nextDate.setMonth(month);
          _this3.newDate(nextDate, 'month');
        });
      };

      for (var i = 0; i < 12; i++) {
        _loop(i);
      }

      //styles
      var newStyle = '\n      .mp-picker.mp-monthpicker:not([data-theme="dark"]) .mp-picker-info {\n        background-color: ' + this.settings.primaryColor + ';\n      }\n\n      .mp-picker.mp-monthpicker [class*="mp-picker-choose-month"].active,\n      .mp-picker.mp-monthpicker[data-theme="dark"] [class*="mp-picker-choose-month"].active {\n        background-color: ' + this.settings.primaryColor + ';\n      }\n\n      .mp-picker.mp-monthpicker [class*="mp-picker-choose-month"].today:not(.active),\n      .mp-picker.mp-monthpicker[data-theme="dark"] [class*="mp-picker-choose-month"].today:not(.active) {\n        color: ' + this.settings.primaryColor + ';\n      }\n    ';

      var containerStyle = document.createElement('style');
      containerStyle.type = 'text/css';
      containerStyle.appendChild(document.createTextNode(newStyle));
      document.querySelector('head').appendChild(containerStyle);
      //    console.log(document.querySelector('head'));
    }
  }, {
    key: 'yearChange',
    value: function yearChange(direction) {
      var _this4 = this;

      var directions = { '-1': 'left', '1': 'right' };
      var directionsNot = { '-1': 'right', '1': 'left' };
      this.date.setYear(this.date.getYear() + 1900 + direction);

      this.picker.querySelectorAll('.mp-animate')[0].classList.add('mp-animate-' + directions[direction]);
      this.picker.querySelectorAll('.mp-animate')[1].classList.add('mp-animate-' + directions[direction]);

      setTimeout(function () {
        _this4.picker.querySelectorAll('.mp-animate')[0].classList.remove('mp-animate-' + directions[direction]);
        _this4.picker.querySelectorAll('.mp-animate')[0].classList.add('mp-animate-' + directionsNot[direction]);
        _this4.picker.querySelectorAll('.mp-animate')[1].classList.remove('mp-animate-' + directions[direction]);
        _this4.picker.querySelectorAll('.mp-animate')[1].classList.add('mp-animate-' + directionsNot[direction]);

        setTimeout(function () {
          _this4.picker.querySelectorAll('.mp-animate')[0].classList.remove('mp-animate-' + directionsNot[direction]);
          _this4.picker.querySelectorAll('.mp-animate')[1].classList.remove('mp-animate-' + directionsNot[direction]);

          _this4.newDate(_this4.date);
        }, 200);
      }, 200);
    }
  }, {
    key: 'open',
    value: function open() {
      document.body.appendChild(this.picker);
      var top = this.position.top + this.position.height + 5;
      var left = this.position.left;
      var body = document.body.getBoundingClientRect();
      var picker = this.picker.getBoundingClientRect();

      if (left + picker.width + 50 > body.width) {
        left = left - picker.width - 5;
      }

      if (top + picker.height + 20 > body.height) {
        top = top - picker.height - this.position.height - 5;
      }

      this.picker.style.top = top;
      this.picker.style.left = left;

      this.newDate(null);
    }
  }, {
    key: 'close',
    value: function close() {
      this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
    }
  }, {
    key: 'newDate',
    value: function newDate(date, value) {
      var dates = date || this.settings.date;

      this.picker.querySelector('.mp-info-year').innerHTML = dates.getYear() + 1900;
      this.picker.querySelector('.mp-info-month').innerHTML = this.i18n.mmm[dates.getMonth()];
      this.picker.querySelector('.mp-picker-year-this').innerHTML = dates.getYear() + 1900;

      if (this.picker.querySelector('[class*="mp-picker-choose-month"].active') != null) {
        this.picker.querySelector('[class*="mp-picker-choose-month"].active').classList.remove('active');
      }

      this.picker.querySelector('.mp-picker-choose-month-' + dates.getMonth() * 1).classList.add('active');

      if (new Date().getYear() == dates.getYear()) {
        this.picker.querySelector('.mp-picker-choose-month-' + new Date().getMonth() * 1).classList.add('today');
      } else if (this.picker.querySelector('.mp-picker-choose-month-' + new Date().getMonth() * 1 + '.today') != null) {
        this.picker.querySelector('.mp-picker-choose-month-' + new Date().getMonth() * 1 + '.today').classList.remove('today');
      }

      this.date = dates;

      //write into input field
      if (this.element.tagName == 'INPUT' && this.element.getAttribute('type') == 'text') {
        var monthNumber = dates.getMonth() + 1;
        var yearNumber = dates.getYear() + 1900;
        var dateNumber = dates.getDate();
        var dayNumber = dates.getDay();
        var output = this.settings.outputFormat;

        output = output.replace(/\{dddd\}/g, this.i18n.dddd[dayNumber]);
        output = output.replace(/\{ddd\}/g, this.i18n.ddd[dayNumber]);
        output = output.replace(/\{dd\}/g, ("0" + dateNumber).slice(-2));
        output = output.replace(/\{d\}/g, dateNumber);

        output = output.replace(/\{mmmm\}/g, this.i18n.mmmm[monthNumber]);
        output = output.replace(/\{mmm\}/g, this.i18n.mmm[monthNumber]);
        output = output.replace(/\{mm\}/g, ("0" + monthNumber).slice(-2));
        output = output.replace(/\{m\}/g, monthNumber);

        output = output.replace(/\{yyyy\}/g, ("0" + yearNumber).slice(-4));
        output = output.replace(/\{yy\}/g, ("0" + yearNumber).slice(-2));
        this.element.value = output;
      }

      if (value == 'month') {
        this.close();
      }
    }
  }]);

  return MaterialMonthpicker;
})();